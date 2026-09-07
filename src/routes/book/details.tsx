import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { BookFrame } from "@/components/BookFrame";
import { RequireAuth } from "@/components/RequireAuth";
import { Button, TextInputField, Textarea, Field } from "@/components/kit";
import { formatPhone, phoneError, required } from "@/lib/validation";
import { useFormValidation } from "@/lib/useFormValidation";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/book/details")({
  head: () => ({ meta: [{ title: "Your details — TXL Med PLLC" }] }),
  component: () => (
    <RequireAuth>
      <DetailsScreen />
    </RequireAuth>
  ),
});

function DetailsScreen() {
  const navigate = useNavigate();
  const { user, draft, updateDraft } = useApp();

  const form = useFormValidation(
    {
      name: draft.name || user?.name || "",
      phone: draft.phone || user?.phone || "",
      address: draft.address,
      city: draft.city,
      state: draft.state || "TX",
      zip: draft.zip,
      notes: draft.notes,
    },
    (v) => ({
      name: required(v.name, "Name"),
      phone: phoneError(v.phone),
      address: required(v.address, "Street address"),
      city: required(v.city, "City"),
      state: required(v.state, "State"),
      zip: v.zip.trim().length < 5 ? "Enter a valid ZIP" : undefined,
    }),
  );

  function next(e: FormEvent) {
    e.preventDefault();
    if (!form.submit()) return;
    updateDraft({
      name: form.values.name,
      phone: form.values.phone,
      address: form.values.address,
      city: form.values.city,
      state: form.values.state,
      zip: form.values.zip,
      notes: form.values.notes,
    });
    navigate({ to: "/book/review" });
  }

  return (
    <BookFrame step={2}>
      <p className="mb-3 text-sm text-muted-foreground">
        Tell us where the examiner should meet you. Address is required for a mobile visit.
      </p>
      <form onSubmit={next}>
        <TextInputField
          label="Name"
          value={form.values.name}
          onChange={(e) => form.set("name", e.target.value)}
          onBlur={() => form.touch("name")}
          error={form.errors.name}
        />
        <TextInputField
          label="Phone"
          type="tel"
          value={form.values.phone}
          onChange={(e) => form.set("phone", formatPhone(e.target.value))}
          onBlur={() => form.touch("phone")}
          error={form.errors.phone}
        />
        <TextInputField
          label="On-site address"
          autoComplete="street-address"
          placeholder="Yard, terminal, or meetup street"
          value={form.values.address}
          onChange={(e) => form.set("address", e.target.value)}
          onBlur={() => form.touch("address")}
          error={form.errors.address}
        />
        <div className="grid grid-cols-2 gap-3">
          <TextInputField
            label="City"
            value={form.values.city}
            onChange={(e) => form.set("city", e.target.value)}
            onBlur={() => form.touch("city")}
            error={form.errors.city}
          />
          <TextInputField
            label="State"
            value={form.values.state}
            onChange={(e) => form.set("state", e.target.value.toUpperCase().slice(0, 2))}
            onBlur={() => form.touch("state")}
            error={form.errors.state}
          />
        </div>
        <TextInputField
          label="ZIP"
          inputMode="numeric"
          value={form.values.zip}
          onChange={(e) => form.set("zip", e.target.value.replace(/\D/g, "").slice(0, 10))}
          onBlur={() => form.touch("zip")}
          error={form.errors.zip}
        />
        <Field label="Notes" hint="Gate codes, parking, or which entrance to use.">
          <Textarea
            value={form.values.notes}
            onChange={(e) => form.set("notes", e.target.value)}
            placeholder="Optional"
          />
        </Field>
        <div className="mt-2 flex gap-2">
          <Button type="button" variant="outline" full onClick={() => navigate({ to: "/book/datetime" })}>
            Back
          </Button>
          <Button type="submit" full>
            Continue
          </Button>
        </div>
      </form>
    </BookFrame>
  );
}
