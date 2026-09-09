import { Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { Header, Screen } from "@/components/kit";
import { CHAT_THREADS, initials, type ChatThread } from "@/lib/mock-data";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Messages — TXL Med PLLC" }] }),
  component: ChatRoute,
});

function ChatRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/chat") return <Outlet />;
  return <ChatScreen />;
}

function ChatScreen() {
  return (
    <Screen padded={false} className="pb-8">
      <Header title="Messages" fallbackTo="/home" />
      <div className="px-4">
        <p className="mb-4 text-sm text-muted-foreground">
          Talk with scheduling, your examiner, or support about a mobile DOT visit.
        </p>
        {CHAT_THREADS.map((thread) => (
          <ThreadRow key={thread.id} thread={thread} />
        ))}
      </div>
    </Screen>
  );
}

function ThreadRow({ thread }: { thread: ChatThread }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate({ to: "/chat/$id", params: { id: thread.id } })}
      className="mb-3 w-full rounded-xl border border-border bg-card p-4 text-left"
    >
      <div className="flex gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
          {initials(thread.name)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold">{thread.name}</p>
              <p className="text-[11px] text-muted-foreground">{thread.role}</p>
            </div>
            <span className="shrink-0 text-[11px] text-muted-foreground">{thread.time}</span>
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">{thread.preview}</p>
        </div>
        {thread.unread > 0 && (
          <span className="flex size-5 shrink-0 items-center justify-center self-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {thread.unread}
          </span>
        )}
      </div>
    </button>
  );
}
