import { createFileRoute } from "@tanstack/react-router";
import { Header, Screen } from "@/components/kit";
import { BUSINESS } from "@/lib/mock-data";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — TXL Med PLLC" }] }),
  component: PrivacyScreen,
});

function PrivacyScreen() {
  return (
    <Screen padded={false}>
      <Header title="Privacy Policy" fallbackTo="/login" />
      <article className="space-y-3 px-4 pb-8 text-[15px] leading-[22px] text-muted-foreground">
        <p>
          {BUSINESS.name} uses the information you enter — name, contact details, and visit address — only to
          schedule and perform mobile DOT physicals and to contact you about your appointment.
        </p>
        <p>
          This app is not an EMR. We do not collect or store examination findings, lab values, or Medical
          Examiner’s Certificate images in the customer app.
        </p>
        <p>
          Account credentials are stored on this device for demo/session purposes. In production, they would be
          handled by a secured scheduling backend.
        </p>
        <p>
          Questions: {BUSINESS.email}
        </p>
      </article>
    </Screen>
  );
}
