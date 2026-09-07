import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BookFrame } from "@/components/BookFrame";
import { RequireAuth } from "@/components/RequireAuth";
import { Banner, Button, Card } from "@/components/kit";
import { formatDateLong, formatMoney, formatTime, serviceById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/book/review")({
  head: () => ({ meta: [{ title: "Review booking — TXL Med PLLC" }] }),
  component: () => (
    <RequireAuth>
      <ReviewScreen />
    </RequireAuth>
  ),
});

function ReviewScreen() {
  const navigate = useNavigate();
  const { draft, bookAppointment } = useApp();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const service = serviceById(draft.serviceId);

  async function confirm() {
    if (!service || !draft.date || !draft.time || !draft.address) {
      setError("Some booking details are missing. Go back and complete each step.");
      return;
    }
    setBusy(true);
    setError("");
    await new Promise((r) => setTimeout(r, 600));
    const created = bookAppointment(draft);
    setBusy(false);
    navigate({ to: "/book/confirmation", search: { id: created.id } });
  }

  return (
    <BookFrame step={3}>
      {error && (
        <div className="mb-3">
          <Banner>{error}</Banner>
        </div>
      )}
      <Card>
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Service</p>
        <p className="mt-1 text-lg font-semibold">{service?.name ?? "Not selected"}</p>
        {service && (
          <p className="mt-1 text-sm text-muted-foreground">
            {formatMoney(service.price)} · {service.duration}
          </p>
        )}
        <hr className="my-3 border-border" />
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">When</p>
        <p className="mt-1 text-sm font-medium">
          {draft.date ? formatDateLong(draft.date) : "—"} {draft.time ? `· ${formatTime(draft.time)}` : ""}
        </p>
        <hr className="my-3 border-border" />
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Mobile visit location</p>
        <p className="mt-1 text-sm font-medium">
          {draft.address}
          {draft.city ? `, ${draft.city}` : ""}
          {draft.state ? `, ${draft.state}` : ""} {draft.zip}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {draft.name} · {draft.phone}
        </p>
        {draft.notes && <p className="mt-2 text-sm text-muted-foreground">Notes: {draft.notes}</p>}
        {service && (
          <p className="mt-4 text-base font-semibold">
            Estimated total {formatMoney(service.price)}
          </p>
        )}
      </Card>
      <p className="mt-3 text-xs text-muted-foreground">
        Confirming sends a visit request. TXL Med will reach out if we need to adjust the time or meetup spot.
      </p>
      <div className="mt-5 flex gap-2">
        <Button variant="outline" full onClick={() => navigate({ to: "/book/details" })}>
          Back
        </Button>
        <Button full disabled={busy} onClick={confirm}>
          {busy ? "Confirming…" : "Confirm Booking"}
        </Button>
      </div>
    </BookFrame>
  );
}
