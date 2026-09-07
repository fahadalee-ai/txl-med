import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button, Card, Screen } from "@/components/kit";
import { TextLogo } from "@/components/TextLogo";
import {
  formatDateLong,
  formatMoney,
  formatTime,
  serviceById,
} from "@/lib/mock-data";
import { useApp } from "@/lib/store";

type Search = { id?: string };

export const Route = createFileRoute("/book/confirmation")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
  }),
  head: () => ({ meta: [{ title: "Booking confirmed — TXL Med PLLC" }] }),
  component: ConfirmationScreen,
});

function ConfirmationScreen() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const { appointments } = useApp();
  const appointment = appointments.find((a) => a.id === id) ?? appointments[0];
  const service = appointment ? serviceById(appointment.serviceId) : undefined;

  function addToCalendar() {
    if (!appointment || !service) return;
    const start = `${appointment.date.replace(/-/g, "")}T${appointment.time.replace(":", "")}00`;
    const [h, m] = appointment.time.split(":").map(Number);
    const endH = String(h + 1).padStart(2, "0");
    const end = `${appointment.date.replace(/-/g, "")}T${endH}${String(m).padStart(2, "0")}00`;
    const loc = `${appointment.address}, ${appointment.city}, ${appointment.state} ${appointment.zip}`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:TXL Med — ${service.name}`,
      `LOCATION:${loc}`,
      "DESCRIPTION:Mobile DOT physical with TXL Med PLLC",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "txl-med-appointment.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Screen padded={false} className="flex min-h-dvh flex-col px-5 pt-[max(2rem,env(safe-area-inset-top))] pb-8">
      <TextLogo size="sm" />
      <div className="mx-auto mt-8 flex size-20 items-center justify-center rounded-full bg-success text-white motion-safe:animate-[check-pop_500ms_ease-out]">
        <Check size={36} strokeWidth={2.5} />
      </div>
      <h1 className="mt-5 text-center font-display text-[28px] leading-[34px] font-semibold">
        You're on the calendar
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Your mobile DOT visit request is in. We'll confirm with you before we roll.
      </p>
      {appointment && (
        <Card className="mt-6">
          <p className="text-lg font-semibold">{service?.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDateLong(appointment.date)} · {formatTime(appointment.time)}
          </p>
          <p className="mt-2 text-sm">
            {appointment.address}, {appointment.city}, {appointment.state} {appointment.zip}
          </p>
          {service && <p className="mt-3 text-sm font-semibold">{formatMoney(service.price)}</p>}
        </Card>
      )}
      <div className="mt-auto space-y-3 pt-8">
        <Button full variant="outline" onClick={addToCalendar}>
          Add to Calendar
        </Button>
        <Button full onClick={() => navigate({ to: "/appointments" })}>
          View My Appointments
        </Button>
        <Button full variant="ghost" onClick={() => navigate({ to: "/home" })}>
          Back to Home
        </Button>
      </div>
    </Screen>
  );
}
