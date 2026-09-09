import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Banner, Button, Card, Chip, Header, Screen } from "@/components/kit";
import { notificationById } from "@/lib/mock-data";

export const Route = createFileRoute("/notifications/$id")({
  head: () => ({ meta: [{ title: "Notification — TXL Med PLLC" }] }),
  component: NotificationDetailScreen,
});

function NotificationDetailScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const item = notificationById(id);

  if (!item) {
    return (
      <Screen padded={false}>
        <Header title="Notification" fallbackTo="/notifications" />
        <div className="px-4">
          <Banner>We couldn't find that notification.</Banner>
          <Button className="mt-4" onClick={() => navigate({ to: "/notifications" })}>
            Back to notifications
          </Button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen padded={false} className="pb-8">
      <Header title="Notification" fallbackTo="/notifications" />
      <div className="px-4">
        <Chip tone={item.read ? "muted" : "primary"}>{item.kind}</Chip>
        <h2 className="mt-3 font-display text-[22px] leading-7 font-semibold">{item.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
        <Card className="mt-4">
          <p className="text-[15px] leading-[22px] text-foreground">{item.detail}</p>
        </Card>
        {item.cta && (
          <Button
            full
            className="mt-5"
            onClick={() =>
              navigate({
                to: item.cta!.to as "/home",
                params: item.cta!.params as never,
              })
            }
          >
            {item.cta.label}
          </Button>
        )}
      </div>
    </Screen>
  );
}
