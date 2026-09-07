import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useApp } from "@/lib/store";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useApp();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!user) {
      navigate({ to: "/login", search: { next: pathname } });
    }
  }, [user, navigate, pathname]);

  if (!user) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6 text-sm text-muted-foreground">
        Redirecting to log in…
      </div>
    );
  }
  return children;
}
