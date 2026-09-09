import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Banner, Button, Header, Screen } from "@/components/kit";
import { chatThreadById, initials, messagesForThread, type ChatMessage } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat/$id")({
  head: () => ({ meta: [{ title: "Chat — TXL Med PLLC" }] }),
  component: ChatDetailScreen,
});

function ChatDetailScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const thread = chatThreadById(id);
  const [messages, setMessages] = useState<ChatMessage[]>(() => messagesForThread(id));
  const [draft, setDraft] = useState("");

  if (!thread) {
    return (
      <Screen padded={false}>
        <Header title="Messages" fallbackTo="/chat" />
        <div className="px-4">
          <Banner>We couldn't find that conversation.</Banner>
          <Button className="mt-4" onClick={() => navigate({ to: "/chat" })}>
            Back to messages
          </Button>
        </div>
      </Screen>
    );
  }

  function send(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        threadId: id,
        from: "me",
        text,
        time: "Now",
      },
    ]);
    setDraft("");
  }

  return (
    <Screen padded={false} className="flex min-h-dvh flex-col">
      <Header title={thread.name} subtitle={thread.role} fallbackTo="/chat" />
      <div className="flex-1 space-y-3 px-4 pb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-2", msg.from === "me" ? "justify-end" : "justify-start")}>
            {msg.from === "them" && (
              <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
                {initials(thread.name)}
              </span>
            )}
            <div
              className={cn(
                "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-5",
                msg.from === "me"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-secondary text-foreground",
              )}
            >
              <p>{msg.text}</p>
              <p className={cn("mt-1 text-[10px]", msg.from === "me" ? "text-white/70" : "text-muted-foreground")}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={send}
        className="sticky bottom-0 flex gap-2 border-t border-border bg-background px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message"
          className="min-h-11 flex-1 rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-foreground/40"
        />
        <Button type="submit" className="px-3" disabled={!draft.trim()} aria-label="Send">
          <Send size={16} />
        </Button>
      </form>
    </Screen>
  );
}
