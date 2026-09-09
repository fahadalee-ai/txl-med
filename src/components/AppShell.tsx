import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { isTabRoute, TabBar } from "./TabBar";
import { ToastHost } from "./kit";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const showTabs = isTabRoute(pathname);
  const { toasts, dismissToast } = useApp();
  const isPreview = pathname === "/preview.html";

  if (isPreview) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-background shadow-[0_0_0_1px_rgba(27,42,68,0.08)]">
      <main className={cn("relative flex-1", showTabs && "pb-[calc(4.5rem+env(safe-area-inset-bottom))]")}>
        {children}
      </main>
      {showTabs && <TabBar />}
      <ToastHost toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
