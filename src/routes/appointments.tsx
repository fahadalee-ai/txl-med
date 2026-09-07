import { Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { Chip, Empty, LinkButton, Screen, SectionTitle, statusTone } from "@/components/kit";
import {
  formatDateLong,
  formatTime,
  serviceById,
  statusLabel,
  type Appointment,
} from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/appointments")({
  head: () => ({ meta: [{ title: "My Appointments — TXL Med PLLC" }] }),
  component: AppointmentsRoute,
});

function AppointmentsRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/appointments") return <Outlet />;
  return <AppointmentsScreen />;
}

function AppointmentsScreen() {
  const { user, appointments } = useApp();
  const mine = user ? appointments.filter((a) => a.userId === user.id) : [];
  const upcoming = mine.filter((a) => a.status === "upcoming");
  const past = mine.filter((a) => a.status !== "upcoming");

  return (
    <Screen padded={false} className="pb-6">
      <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <h1 className="font-display text-[28px] leading-[34px] font-semibold">My Appointments</h1>
        <p className="mt-1 text-sm text-muted-foreground">Upcoming and past mobile DOT visits.</p>
      </div>
      {!user ? (
        <div className="px-4 pt-6">
          <Empty
            title="Log in to see visits"
            body="Create an account or log in to request and track mobile DOT physicals."
            action={<LinkButton to="/login">Log In</LinkButton>}
          />
        </div>
      ) : !mine.length ? (
        <div className="px-4 pt-6">
          <Empty
            title="No appointments yet"
            body="Book a mobile DOT physical and it will show up here."
            action={<LinkButton to="/book">Book Appointment</LinkButton>}
          />
        </div>
      ) : (
        <div className="px-4">
          <SectionTitle>Upcoming</SectionTitle>
          {upcoming.length ? upcoming.map((a) => <AppointmentCard key={a.id} appointment={a} />) : (
            <p className="text-sm text-muted-foreground">No upcoming visits.</p>
          )}
          <SectionTitle>Past</SectionTitle>
          {past.length ? past.map((a) => <AppointmentCard key={a.id} appointment={a} />) : (
            <p className="text-sm text-muted-foreground">No past visits yet.</p>
          )}
        </div>
      )}
    </Screen>
  );
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const navigate = useNavigate();
  const service = serviceById(appointment.serviceId);
  return (
    <button
      type="button"
      onClick={() => navigate({ to: "/appointments/$id", params: { id: appointment.id } })}
      className="mb-3 w-full rounded-xl border border-border bg-card p-4 text-left"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold">{service?.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDateLong(appointment.date)} · {formatTime(appointment.time)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {appointment.city}, {appointment.state}
          </p>
        </div>
        <Chip tone={statusTone(statusLabel(appointment.status))}>{statusLabel(appointment.status)}</Chip>
      </div>
    </button>
  );
}
