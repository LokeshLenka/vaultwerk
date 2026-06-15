import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { SpinnerGapIcon } from "@phosphor-icons/react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <SpinnerGapIcon
      role="status"
      aria-label="Loading"
      className={cn("size-5 animate-spin", className)}
      {...props}
    />
  );
}

export function GlobalLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="border bg-background p-2 shadow-sm"
          >
            <Spinner className="text-muted-foreground" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
