import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Banner, Button, Card, Chip, ConfirmDialog, Header, Screen, statusTone } from "@/components/kit";
import { Calendar as DayCalendar } from "@/components/ui/calendar";
import {
  TIME_SLOTS,
  formatDateLong,
  formatMoney,
  formatTime,
  serviceById,
  statusLabel,
  todayIso,
  unavailableSlotsForDate,
} from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/appointments/$id")({
  head: () => ({ meta: [{ title: "Appointment — TXL Med PLLC" }] }),
  component: AppointmentDetailScreen,
});

function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toIso(date: Date) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

function AppointmentDetailScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { appointments, cancelAppointment, rescheduleAppointment } = useApp();
  const appointment = appointments.find((a) => a.id === id);
  const service = appointment ? serviceById(appointment.serviceId) : undefined;
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [date, setDate] = useState(appointment?.date ?? "");
  const [time, setTime] = useState(appointment?.time ?? "");
  const blocked = useMemo(() => (date ? unavailableSlotsForDate(date) : []), [date]);

  if (!appointment) {
    return (
      <Screen padded={false}>
        <Header title="Appointment" fallbackTo="/appointments" />
        <div className="px-4">
          <Banner>We couldn't find that appointment.</Banner>
          <Button className="mt-4" onClick={() => navigate({ to: "/appointments" })}>
            Back to list
          </Button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen padded={false} className="pb-8">
      <Header title="Appointment" fallbackTo="/appointments" />
      <div className="px-4">
        <div className="mb-3">
          <Chip tone={statusTone(statusLabel(appointment.status))}>{statusLabel(appointment.status)}</Chip>
        </div>
        <Card>
          <h2 className="text-xl font-semibold">{service?.name}</h2>
          {service && (
            <p className="mt-1 text-sm text-muted-foreground">
              {formatMoney(service.price)} · {service.duration}
            </p>
          )}
          <p className="mt-3 text-sm font-medium">
            {formatDateLong(appointment.date)} · {formatTime(appointment.time)}
          </p>
          <p className="mt-2 text-sm">
            {appointment.address}, {appointment.city}, {appointment.state} {appointment.zip}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {appointment.name} · {appointment.phone}
          </p>
          {appointment.notes && <p className="mt-2 text-sm text-muted-foreground">{appointment.notes}</p>}
        </Card>

        {appointment.status === "upcoming" && (
          <div className="mt-5 space-y-3">
            <Button full variant="outline" onClick={() => setReschedule((v) => !v)}>
              {reschedule ? "Hide reschedule" : "Reschedule"}
            </Button>
            {reschedule && (
              <Card>
                <DayCalendar
                  mode="single"
                  selected={date ? parseIso(date) : undefined}
                  onSelect={(day) => {
                    if (!day) return;
                    setDate(toIso(day));
                    setTime("");
                  }}
                  disabled={{ before: parseIso(todayIso()) }}
                  className="mx-auto w-full [--cell-size:2.3rem]"
                />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const taken = blocked.includes(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={taken}
                        onClick={() => setTime(slot)}
                        className={cn(
                          "min-h-11 rounded-xl border text-sm font-medium",
                          taken && "opacity-40",
                          time === slot
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background",
                        )}
                      >
                        {formatTime(slot)}
                      </button>
                    );
                  })}
                </div>
                <Button
                  full
                  className="mt-4"
                  disabled={!date || !time}
                  onClick={() => {
                    rescheduleAppointment(appointment.id, date, time);
                    setReschedule(false);
                  }}
                >
                  Save new time
                </Button>
              </Card>
            )}
            <Button full variant="danger" onClick={() => setConfirmCancel(true)}>
              Cancel appointment
            </Button>
          </div>
        )}
      </div>
      <ConfirmDialog
        open={confirmCancel}
        title="Cancel this visit?"
        body="The examiner will be notified. You can book again anytime from the Book tab."
        confirmLabel="Cancel visit"
        danger
        onClose={() => setConfirmCancel(false)}
        onConfirm={() => {
          cancelAppointment(appointment.id);
          setConfirmCancel(false);
        }}
      />
    </Screen>
  );
}
