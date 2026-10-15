/**
 * HTTP client for the VaultWerk API.
 *
 * Auth model: the Authorization header carries either a Clerk session
 * token (cloud auth, supplied per-request by the token provider) or a
 * short-lived legacy JWT kept only in memory (never persisted to web
 * storage). Legacy sessions renew via a rotating httpOnly refresh
 * cookie; on renewal failure the session is dead and the caller is
 * redirected to /login.
 */

const BASE = import.meta.env.VITE_API_URL ?? "";

let accessToken: string | null = null;
let refreshInFlight: Promise<string> | null = null;

/** Per-request token source (Clerk's `getToken`). Cleared on sign-out. */
let tokenProvider: (() => Promise<string | null>) | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function setTokenProvider(provider: (() => Promise<string | null>) | null) {
  tokenProvider = provider;
}

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function refreshAccessToken(): Promise<string> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      const res = await fetch(`${BASE}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw new ApiError(res.status, "Session expired");
      }
      const data = (await res.json()) as { accessToken: string };
      setAccessToken(data.accessToken);
      return data.accessToken;
    })().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

interface FetchOptions {
  method?: string;
  body?: unknown;
  /** Retry once after a silent refresh on 401. Defaults to true. */
  retry?: boolean;
}

export async function apiFetch<T>(
  path: string,
  { method = "GET", body, retry = true }: FetchOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  // Clerk tokens are fetched per request (they rotate); the legacy JWT
  // is a stable in-memory value. Provider failures fail open to
  // anonymous — the API 401s and callers handle it.
  let token = accessToken;
  if (!token && tokenProvider) {
    try {
      token = await tokenProvider();
    } catch {
      token = null;
    }
  }
  const legacy = token !== null && token === accessToken && accessToken !== null;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    credentials: "include",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && retry && legacy) {
    try {
      await refreshAccessToken();
      return apiFetch<T>(path, {
        method,
        body,
        retry: false,
      });
    } catch {
      setAccessToken(null);
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
      throw new ApiError(401, "Session expired — please sign in again");
    }
  }

  if (res.status === 204) return undefined as T;

  let payload: { error?: string; details?: unknown } | undefined;
  try {
    payload = (await res.json()) as typeof payload;
  } catch {
    throw new ApiError(res.status, `Request failed (${res.status})`);
  }

  if (!res.ok) {
    throw new ApiError(res.status, payload?.error ?? "Request failed", payload?.details);
  }
  return payload as T;
}

/** Raw fetch for endpoints that manage their own auth (login/refresh). */
export async function rawFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    ...init,
  });
  const payload = (await res.json().catch(() => undefined)) as
    | { error?: string; details?: unknown }
    | undefined;
  if (!res.ok) {
    throw new ApiError(
      res.status,
      payload?.error ?? "Request failed",
      payload?.details,
    );
  }
  return payload as T;
}
