import { Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { Header, Screen } from "@/components/kit";
import { NOTIFICATIONS, type AppNotification } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — TXL Med PLLC" }] }),
  component: NotificationsRoute,
});

function NotificationsRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/notifications") return <Outlet />;
  return <NotificationsScreen />;
}

function NotificationsScreen() {
  return (
    <Screen padded={false} className="pb-8">
      <Header title="Notifications" fallbackTo="/home" />
      <div className="px-4">
        {NOTIFICATIONS.map((item) => (
          <NotificationRow key={item.id} item={item} />
        ))}
      </div>
    </Screen>
  );
}

function NotificationRow({ item }: { item: AppNotification }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate({ to: "/notifications/$id", params: { id: item.id } })}
      className="mb-3 w-full rounded-xl border border-border bg-card p-4 text-left"
    >
      <div className="flex gap-3">
        <span
          className={cn(
            "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl",
            item.read ? "bg-muted text-muted-foreground" : "bg-primary/12 text-primary",
          )}
        >
          <Bell size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className={cn("font-semibold", !item.read && "text-foreground")}>{item.title}</p>
            <span className="shrink-0 text-[11px] text-muted-foreground">{item.time}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
          {!item.read && <span className="mt-2 inline-block size-2 rounded-full bg-primary" />}
        </div>
      </div>
    </button>
  );
}
