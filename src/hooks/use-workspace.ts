import { useCallback, useEffect, useRef, useState } from "react";
import { getSetting, setSetting } from "@/lib/services/settings-service";
import { track } from "@/lib/telemetry";
import { toast } from "sonner";

export interface ToolItem {
  name: string;
  url: string;
}

export type FlowState = "idle" | "onboarding" | "success" | "blocked";

export interface WorkspaceResult {
  opened: ToolItem[];
  blocked: ToolItem[];
  total: number;
}

const PERMISSION_KEY = "workspacePermissionAcknowledged";
const MAX_TABS = 20;

function openAll(tools: ToolItem[]): WorkspaceResult {
  const opened: ToolItem[] = [];
  const blocked: ToolItem[] = [];

  const toOpen = tools.slice(0, MAX_TABS);

  for (const tool of toOpen) {
    try {
      const win = window.open(tool.url, "_blank");
      if (!win) {
        blocked.push(tool);
      } else {
        opened.push(tool);
      }
    } catch {
      blocked.push(tool);
    }
  }

  return { opened, blocked, total: toOpen.length };
}

export function useWorkspace() {
  const [state, setState] = useState<FlowState>("idle");
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [result, setResult] = useState<WorkspaceResult | null>(null);
  const toolsRef = useRef<ToolItem[]>([]);
  const openingRef = useRef(false);
  const permissionRef = useRef<boolean | null>(null);

  useEffect(() => {
    getSetting<boolean>(PERMISSION_KEY).then((val) => {
      permissionRef.current = val === true;
    });
  }, []);

  const goIdle = useCallback(() => {
    openingRef.current = false;
    setState("idle");
  }, []);

  const showSuccessToast = useCallback((count: number) => {
    toast.success("Workspace ready", {
      description: `Opened ${count} tool${count !== 1 ? "s" : ""}.`,
      duration: 3000,
    });
  }, []);

  const launch = useCallback((toolsToOpen: ToolItem[]) => {
    if (toolsToOpen.length === 0 || openingRef.current) return;
    openingRef.current = true;

    const totalRequested = toolsToOpen.length;
    const batch = toolsToOpen.slice(0, MAX_TABS);
    const remaining = totalRequested - batch.length;

    toolsRef.current = toolsToOpen;
    setTools(batch);
    setResult(null);

    const acknowledged = permissionRef.current === true;

    if (remaining > 0) {
      toast.warning("Tab limit reached", {
        description: `Opening first ${batch.length} of ${totalRequested} tools.`,
        duration: 4000,
      });
    }

    if (acknowledged) {
      const r = openAll(batch);

      if (r.blocked.length === 0) {
        track("workspace_popup_success");
        track("workspace_open_completed", { total: r.total });
        setResult(r);
        showSuccessToast(r.total);
        setState("success");
        setTimeout(() => goIdle(), 3000);
      } else {
        track("workspace_popup_blocked", { count: r.blocked.length });
        track("workspace_open_partial", {
          opened: r.opened.length,
          blocked: r.blocked.length,
        });
        setResult(r);
        openingRef.current = false;
        setState("blocked");
      }
    } else {
      openingRef.current = false;
      track("workspace_modal_shown");
      setState("onboarding");
    }
  }, [goIdle, showSuccessToast]);

  const handleContinue = useCallback(() => {
    const toolsToOpen = toolsRef.current;
    if (toolsToOpen.length === 0 || openingRef.current) return;
    openingRef.current = true;

    const totalRequested = toolsToOpen.length;
    const batch = toolsToOpen.slice(0, MAX_TABS);
    const remaining = totalRequested - batch.length;

    track("workspace_continue");
    setSetting(PERMISSION_KEY, true).catch(() => {});
    permissionRef.current = true;

    if (remaining > 0) {
      toast.warning("Tab limit reached", {
        description: `Opening first ${batch.length} of ${totalRequested} tools.`,
        duration: 4000,
      });
    }

    const r = openAll(batch);

    if (r.blocked.length === 0) {
      track("workspace_popup_success");
      track("workspace_open_completed", { total: r.total });
      setResult(r);
      showSuccessToast(r.total);
      setState("success");
      setTimeout(() => goIdle(), 3000);
    } else {
      track("workspace_popup_blocked", { count: r.blocked.length });
      track("workspace_open_partial", {
        opened: r.opened.length,
        blocked: r.blocked.length,
      });
      setResult(r);
      openingRef.current = false;
      setState("blocked");
    }
  }, [goIdle, showSuccessToast]);

  const retry = useCallback(() => {
    const toolsToOpen = toolsRef.current;
    if (toolsToOpen.length === 0 || openingRef.current) return;
    openingRef.current = true;

    const totalRequested = toolsToOpen.length;
    const batch = toolsToOpen.slice(0, MAX_TABS);
    const remaining = totalRequested - batch.length;

    track("workspace_retry");

    if (remaining > 0) {
      toast.warning("Tab limit reached", {
        description: `Opening first ${batch.length} of ${totalRequested} tools.`,
        duration: 4000,
      });
    }

    const r = openAll(batch);

    if (r.blocked.length === 0) {
      track("workspace_popup_success");
      track("workspace_open_completed", { total: r.total });
      setResult(r);
      showSuccessToast(r.total);
      setState("success");
      setTimeout(() => goIdle(), 3000);
    } else {
      track("workspace_popup_blocked", { count: r.blocked.length });
      track("workspace_open_partial", {
        opened: r.opened.length,
        blocked: r.blocked.length,
      });
      setResult(r);
      openingRef.current = false;
      setState("blocked");
    }
  }, [goIdle, showSuccessToast]);

  const openIndividually = useCallback(() => {
    for (const tool of toolsRef.current) {
      try {
        window.open(tool.url, "_blank");
      } catch {}
    }
    track("workspace_cancelled", { reason: "open_individually" });
    goIdle();
  }, [goIdle]);

  const cancel = useCallback(() => {
    track("workspace_cancelled", { reason: "user_cancelled" });
    goIdle();
  }, [goIdle]);

  return {
    state,
    tools,
    result,
    launch,
    continue: handleContinue,
    retry,
    openIndividually,
    cancel,
  };
}
