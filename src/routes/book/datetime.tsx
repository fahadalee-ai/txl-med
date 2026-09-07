import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { BookFrame } from "@/components/BookFrame";
import { RequireAuth } from "@/components/RequireAuth";
import { Button } from "@/components/kit";
import { Calendar } from "@/components/ui/calendar";
import { TIME_SLOTS, formatTime, todayIso, unavailableSlotsForDate } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/datetime")({
  head: () => ({ meta: [{ title: "Date & time — TXL Med PLLC" }] }),
  component: () => (
    <RequireAuth>
      <DateTimeScreen />
    </RequireAuth>
  ),
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

function DateTimeScreen() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useApp();
  const selected = draft.date ? parseIso(draft.date) : undefined;
  const blocked = useMemo(
    () => (draft.date ? unavailableSlotsForDate(draft.date) : []),
    [draft.date],
  );

  return (
    <BookFrame step={1}>
      <p className="mb-3 text-sm text-muted-foreground">
        Pick a day and an arrival window. We'll confirm the exact time with you.
      </p>
      <div className="rounded-2xl border border-border bg-card p-2">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(day) => {
            if (!day) return;
            updateDraft({ date: toIso(day), time: "" });
          }}
          disabled={{ before: parseIso(todayIso()) }}
          className="mx-auto w-full [--cell-size:2.4rem]"
        />
      </div>
      <h3 className="mt-5 mb-2 text-sm font-semibold">Available times</h3>
      {!draft.date ? (
        <p className="text-sm text-muted-foreground">Select a date to see open slots.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((slot) => {
            const taken = blocked.includes(slot);
            const active = draft.time === slot;
            return (
              <button
                key={slot}
                type="button"
                disabled={taken}
                onClick={() => updateDraft({ time: slot })}
                className={cn(
                  "min-h-11 rounded-xl border px-2 text-sm font-medium",
                  taken && "cursor-not-allowed opacity-40",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground",
                )}
              >
                {formatTime(slot)}
              </button>
            );
          })}
        </div>
      )}
      <div className="mt-6 flex gap-2">
        <Button variant="outline" full onClick={() => navigate({ to: "/book" })}>
          Back
        </Button>
        <Button
          full
          disabled={!draft.date || !draft.time}
          onClick={() => navigate({ to: "/book/details" })}
        >
          Continue
        </Button>
      </div>
    </BookFrame>
  );
}
