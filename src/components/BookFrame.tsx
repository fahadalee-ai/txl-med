import type { ReactNode } from "react";
import { BOOKING_STEPS } from "@/lib/mock-data";
import { Header, Screen, StepperHeader } from "@/components/kit";

export function BookFrame({
  step,
  children,
  title = "Book Appointment",
}: {
  step: number;
  children: ReactNode;
  title?: string;
}) {
  return (
    <Screen padded={false} className="pb-6">
      <Header title={title} fallbackTo="/home" />
      <div className="px-4">
        <StepperHeader steps={BOOKING_STEPS} current={step} />
        {children}
      </div>
    </Screen>
  );
}
