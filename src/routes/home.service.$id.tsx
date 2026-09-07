import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, FileText, IdCard, Info } from "lucide-react";
import { Button, Card, Screen } from "@/components/kit";
import { BUSINESS } from "@/lib/mock-data";
import { serviceDetailById } from "@/lib/service-details";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/home/service/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${serviceDetailById(params.id)?.name ?? "Service"} — TXL Med PLLC` }],
  }),
  component: ServiceDetailScreen,
});

function ServiceDetailScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { updateDraft } = useApp();
  const service = serviceDetailById(id);

  if (!service) {
    return (
      <Screen padded={false}>
        <p className="px-4 pt-16 text-sm text-muted-foreground">We couldn't find that service.</p>
        <Button className="mx-4 mt-4" onClick={() => navigate({ to: "/home" })}>
          Back to Home
        </Button>
      </Screen>
    );
  }

  return (
    <Screen padded={false} className="pb-28">
      <div className="relative h-64 overflow-hidden">
        <img src={service.image} alt="" className="size-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-ink/15 to-background" />
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate({ to: "/home" })}
          className="absolute top-[max(0.75rem,env(safe-area-inset-top))] left-4 flex size-11 items-center justify-center rounded-xl border border-white/30 bg-ink/35 text-white backdrop-blur-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-white/75 uppercase">
            TXL Med PLLC
          </p>
          <h1 className="mt-1 font-display text-[26px] leading-8 font-semibold text-white">{service.name}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
            <Clock size={14} />
            {service.duration} on site
          </p>
        </div>
      </div>

      <div className="space-y-6 px-4 pt-2">
        <p className="text-[15px] leading-[22px] text-foreground">{service.overview}</p>

        <Card className="flex gap-3 bg-secondary">
          <FileText size={18} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-foreground">{service.regulation}</p>
        </Card>

        <section>
          <h2 className="text-lg font-semibold">Who this exam is for</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.who}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">What the exam includes</h2>
          <ul className="mt-3 space-y-3">
            {service.includes.map((item) => (
              <li key={item.title} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <IdCard size={18} className="text-primary" />
            What to bring
          </h2>
          <ul className="mt-3 space-y-2">
            {service.whatToBring.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold">After the visit</h2>
          <ul className="mt-3 space-y-2">
            {service.afterVisit.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                <Check size={16} className="mt-0.5 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Info size={18} className="text-primary" />
            Good to know
          </h2>
          <ul className="mt-3 space-y-2">
            {service.notes.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Questions before you book? Call {BUSINESS.phone} or email {BUSINESS.email}.
          </p>
        </section>
      </div>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 border-t border-border bg-background/95 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
        <Button
          full
          onClick={() => {
            updateDraft({ serviceId: service.id });
            navigate({ to: "/book" });
          }}
        >
          Book this exam
        </Button>
      </div>
    </Screen>
  );
}
