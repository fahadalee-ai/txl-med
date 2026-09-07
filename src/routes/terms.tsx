import { createFileRoute } from "@tanstack/react-router";
import { Header, Screen } from "@/components/kit";
import { BUSINESS } from "@/lib/mock-data";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — TXL Med PLLC" }] }),
  component: TermsScreen,
});

function TermsScreen() {
  return (
    <Screen padded={false}>
      <Header title="Terms of Service" fallbackTo="/login" />
      <article className="space-y-3 px-4 pb-8 text-[15px] leading-[22px] text-muted-foreground">
        <p>
          {BUSINESS.name} provides mobile DOT physical scheduling as a convenience. Booking in this app is a
          request for an on-site exam — it is not medical advice and does not create an electronic medical
          record.
        </p>
        <p>
          You are responsible for providing an accurate exam location, being available at the selected time, and
          bringing identification required for a DOT physical.
        </p>
        <p>
          Exam outcomes, certificates, and clinical determinations are handled by the examining provider at the
          visit. This app does not store exam results.
        </p>
        <p>
          Contact us at {BUSINESS.email} or {BUSINESS.phone} with questions about these terms.
        </p>
      </article>
    </Screen>
  );
}
