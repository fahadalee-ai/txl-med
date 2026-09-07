import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarPlus, ClipboardList, House, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/home", label: "Home", icon: House, match: (p: string) => p === "/home" },
  { to: "/book", label: "Book", icon: CalendarPlus, match: (p: string) => p.startsWith("/book") },
  {
    to: "/appointments",
    label: "Appointments",
    icon: ClipboardList,
    match: (p: string) => p.startsWith("/appointments"),
  },
  {
    to: "/profile",
    label: "Profile",
    icon: UserRound,
    match: (p: string) => p.startsWith("/profile"),
  },
] as const;

export function isTabRoute(pathname: string) {
  if (pathname.startsWith("/book/confirmation")) return false;
  return TABS.some((tab) => tab.match(pathname));
}

export function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Main"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-border bg-surface/95 backdrop-blur-md"
    >
      <div className="grid grid-cols-4 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-0.5 px-1 text-[11px] font-medium",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon size={22} strokeWidth={active ? 2.25 : 1.75} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
