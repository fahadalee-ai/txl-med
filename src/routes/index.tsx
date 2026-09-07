import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TextLogo } from "@/components/TextLogo";
import { IMAGES } from "@/lib/images";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TXL Med PLLC" },
      {
        name: "description",
        content: "Mobile DOT physicals across Texas — TXL Med PLLC.",
      },
    ],
  }),
  component: SplashScreen,
});

function SplashScreen() {
  const navigate = useNavigate();
  const { ready } = useApp();
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [showExam, setShowExam] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const enter = window.setTimeout(() => setPhase("hold"), 500);
    const swap = window.setTimeout(() => setShowExam(true), 900);
    let routed = false;

    function route() {
      if (routed) return;
      routed = true;
      setPhase("out");
      window.setTimeout(() => {
        navigate({ to: "/onboarding" });
      }, 200);
    }

    const minHold = window.setTimeout(route, 1600);
    const cap = window.setTimeout(route, 3000);

    return () => {
      window.clearTimeout(enter);
      window.clearTimeout(swap);
      window.clearTimeout(minHold);
      window.clearTimeout(cap);
    };
  }, [navigate, ready]);

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-ink">
      <img
        src={IMAGES.splashHighway}
        alt=""
        className="absolute inset-0 size-full object-cover motion-safe:animate-[splash-kenburns_4s_ease-out_forwards]"
      />
      <img
        src={IMAGES.splashExam}
        alt=""
        className={cn(
          "absolute inset-0 size-full object-cover object-[center_20%] transition-opacity duration-700",
          showExam ? "opacity-100 motion-safe:animate-[splash-kenburns_4s_ease-out_forwards]" : "opacity-0",
        )}
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink/35 via-ink/25 to-ink/92" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink to-transparent" />

      <div
        className={cn(
          "relative z-10 flex min-h-dvh flex-col items-center justify-end px-8 pb-[max(3.5rem,env(safe-area-inset-bottom))]",
          phase === "in" && "motion-safe:animate-[splash-in_500ms_ease-out_forwards]",
          phase === "hold" && "motion-safe:animate-[splash-pulse_1400ms_ease-in-out_infinite]",
          phase === "out" && "motion-safe:animate-[splash-out_200ms_ease-in_forwards]",
        )}
      >
        <TextLogo variant="white" size="lg" />
        <span className="mt-4 h-px w-20 origin-center bg-white/80 motion-safe:animate-[splash-underline_600ms_ease-out_200ms_both]" />
        <p className="mt-4 text-center text-[12px] leading-4 font-medium tracking-[0.22em] text-white/85 uppercase">
          Mobile DOT Physicals
        </p>
        <p className="mt-2 max-w-[16rem] text-center text-[13px] leading-5 text-white/70">
          Certified exams on your route — across Texas
        </p>
      </div>
    </div>
  );
}
