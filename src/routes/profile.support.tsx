import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { Card, Header, Screen } from "@/components/kit";
import { BUSINESS } from "@/lib/mock-data";

export const Route = createFileRoute("/profile/support")({
  head: () => ({ meta: [{ title: "Support — TXL Med PLLC" }] }),
  component: SupportScreen,
});

function SupportScreen() {
  return (
    <Screen padded={false} className="pb-8">
      <Header title="Contact / Support" fallbackTo="/profile" />
      <div className="px-4">
        <p className="text-[15px] leading-[22px] text-muted-foreground">
          Questions about booking a mobile DOT physical, fleet visits, or your upcoming appointment? Reach TXL
          Med PLLC directly.
        </p>
        <Card className="mt-4">
          <a href={BUSINESS.phoneHref} className="flex min-h-11 items-center gap-3">
            <Phone size={18} className="text-primary" />
            <span>
              <span className="block text-sm font-semibold">{BUSINESS.phone}</span>
              <span className="text-xs text-muted-foreground">{BUSINESS.hours}</span>
            </span>
          </a>
          <a href={BUSINESS.emailHref} className="mt-3 flex min-h-11 items-center gap-3">
            <Mail size={18} className="text-primary" />
            <span>
              <span className="block text-sm font-semibold">{BUSINESS.email}</span>
              <span className="text-xs text-muted-foreground">Scheduling and support</span>
            </span>
          </a>
        </Card>
        <p className="mt-4 text-sm text-muted-foreground">{BUSINESS.serviceAreaNote}</p>
      </div>
    </Screen>
  );
}
