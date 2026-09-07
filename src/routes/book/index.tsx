import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { BookFrame } from "@/components/BookFrame";
import { RequireAuth } from "@/components/RequireAuth";
import { Button, Card } from "@/components/kit";
import { SERVICES, formatMoney } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/")({
  head: () => ({ meta: [{ title: "Select service — TXL Med PLLC" }] }),
  component: () => (
    <RequireAuth>
      <SelectServiceScreen />
    </RequireAuth>
  ),
});

function SelectServiceScreen() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useApp();

  return (
    <BookFrame step={0}>
      <p className="mb-3 text-sm text-muted-foreground">
        Choose the exam you need. An FMCSA-certified examiner comes to your location.
      </p>
      <div className="space-y-3">
        {SERVICES.map((service) => {
          const selected = draft.serviceId === service.id;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => updateDraft({ serviceId: service.id })}
              className="w-full text-left"
            >
              <Card
                className={cn(
                  selected && "border-primary bg-secondary",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[18px] leading-6 font-semibold">{service.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                    <p className="mt-2 text-sm font-semibold text-primary">
                      {formatMoney(service.price)} · {service.duration}
                    </p>
                  </div>
                  {selected && <Check className="shrink-0 text-primary" size={20} />}
                </div>
              </Card>
            </button>
          );
        })}
      </div>
      <Button
        full
        className="mt-6"
        disabled={!draft.serviceId}
        onClick={() => navigate({ to: "/book/datetime" })}
      >
        Continue
      </Button>
    </BookFrame>
  );
}
