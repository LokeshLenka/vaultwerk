import { useCallback, useEffect, useState } from "react";
import { getSetting, setSetting } from "@/lib/services/settings-service";

const PERMISSION_KEY = "popups_permission_granted";

export function usePopupPermission() {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    getSetting<boolean>(PERMISSION_KEY).then((val) => {
      if (!cancelled) {
        setPermissionGranted(val === true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const grantPermission = useCallback(async () => {
    await setSetting(PERMISSION_KEY, true);
    setPermissionGranted(true);
  }, []);

  const revokePermission = useCallback(async () => {
    await setSetting(PERMISSION_KEY, false);
    setPermissionGranted(false);
  }, []);

  return { permissionGranted, grantPermission, revokePermission };
}
