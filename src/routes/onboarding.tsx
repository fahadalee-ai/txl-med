import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { TextLogo } from "@/components/TextLogo";
import { Button } from "@/components/kit";
import { ONBOARDING } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Welcome — TXL Med PLLC" }] }),
  component: OnboardingScreen,
});

function OnboardingScreen() {
  const navigate = useNavigate();
  const { markOnboarded } = useApp();
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const last = index === ONBOARDING.length - 1;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  function finish() {
    markOnboarded();
    navigate({ to: "/login" });
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-ink">
      <Carousel setApi={setApi} className="h-dvh" opts={{ align: "start", loop: false }}>
        <CarouselContent className="ml-0 h-dvh">
          {ONBOARDING.map((slide) => (
            <CarouselItem key={slide.title} className="h-dvh pl-0">
              <div className="relative h-dvh w-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="absolute inset-0 size-full object-cover motion-safe:animate-[splash-kenburns_8s_ease-out_forwards]"
                />
                <div className="absolute inset-0 bg-linear-to-b from-ink/40 via-ink/25 to-ink/92" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-[max(9.5rem,calc(env(safe-area-inset-bottom)+8.5rem))]">
                  <h1 className="font-display text-[28px] leading-[34px] font-semibold text-white">
                    {slide.title}
                  </h1>
                  <span className="mt-4 h-px w-16 bg-primary" />
                  <p className="mt-4 max-w-[20rem] text-[15px] leading-[22px] text-white/80">{slide.body}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <TextLogo variant="white" size="sm" className="text-left" />
        {!last && (
          <button
            type="button"
            onClick={finish}
            className="pointer-events-auto min-h-11 px-3 text-sm font-semibold text-white/95"
          >
            Skip
          </button>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="mb-4 flex justify-center gap-2">
          {ONBOARDING.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-primary" : "w-2 bg-white/35",
              )}
            />
          ))}
        </div>
        {last ? (
          <Button full onClick={finish}>
            Get Started
          </Button>
        ) : (
          <Button full onClick={() => api?.scrollNext()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
