import { Outlet, createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Bell, ChevronRight, Clock, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { TextLogo } from "@/components/TextLogo";
import { TexasWatermark } from "@/components/TexasWatermark";
import { Button, Card, Chip, SectionTitle } from "@/components/kit";
import { IMAGES } from "@/lib/images";
import {
  BUSINESS,
  CHAT_THREADS,
  HOW_IT_WORKS,
  NOTIFICATIONS,
  SERVICES,
  TRUST_POINTS,
  greeting,
} from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — TXL Med PLLC" }] }),
  component: HomeRoute,
});

function HomeRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/home") return <Outlet />;
  return <HomeScreen />;
}

function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useApp();

  return (
    <div className="min-h-dvh bg-background pb-8">
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.homeHero}
          alt=""
          className="h-[340px] w-full object-cover motion-safe:animate-[splash-kenburns_10s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/45 via-ink/20 to-background" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background to-transparent" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between px-4 pt-[max(0.85rem,env(safe-area-inset-top))]">
          <div>
            <TextLogo variant="white" size="sm" className="text-left" />
            <p className="mt-1 text-xs font-medium text-white/80">
              {user ? `${greeting()}, ${user.name.split(" ")[0]}` : "Texas · Mobile DOT"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <HeaderIcon
              to="/chat"
              label="Messages"
              count={CHAT_THREADS.reduce((n, t) => n + t.unread, 0)}
            >
              <MessageCircle size={18} />
            </HeaderIcon>
            <HeaderIcon
              to="/notifications"
              label="Notifications"
              count={NOTIFICATIONS.filter((n) => !n.read).length}
            >
              <Bell size={18} />
            </HeaderIcon>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 px-4">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-white/75 uppercase">
            TXL Med PLLC
          </p>
          <h1 className="mt-1 font-display text-[26px] leading-8 font-semibold text-white">
            Mobile DOT Physicals, Wherever You Are
          </h1>
          <p className="mt-2 max-w-[20rem] text-sm leading-5 text-white/80">
            FMCSA-certified exams at your yard, home, or meetup — no clinic wait.
          </p>
          <Button className="mt-4" onClick={() => navigate({ to: "/book" })}>
            Book Appointment
          </Button>
        </div>
      </section>

      <div className="px-4">
        <SectionTitle>Our services</SectionTitle>
        <p className="mb-3 text-sm text-muted-foreground">
          Tap a service for the full FMCSA exam details, what to bring, and how certification works.
        </p>
        <div className="space-y-3">
          {SERVICES.map((service) => (
            <Link key={service.id} to="/home/service/$id" params={{ id: service.id }} className="block">
              <article className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative h-36">
                  <img src={service.image} alt="" className="size-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent" />
                  {service.featured && (
                    <Chip tone="primary" className="absolute top-3 left-3">
                      Most booked
                    </Chip>
                  )}
                  <p className="absolute bottom-3 left-3 text-xs font-semibold text-white">
                    {service.duration}
                  </p>
                </div>
                <div className="flex items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[18px] leading-6 font-semibold">{service.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{service.short}</p>
                  </div>
                  <ChevronRight className="shrink-0 text-primary" size={20} />
                </div>
              </article>
            </Link>
          ))}
        </div>

        <SectionTitle>How it works</SectionTitle>
        <div className="space-y-2">
          {HOW_IT_WORKS.map((item) => (
            <Card key={item.title} className="flex gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {item.step}
              </div>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.body}</p>
              </div>
            </Card>
          ))}
        </div>

        <SectionTitle>Why TXL Med</SectionTitle>
        <div className="space-y-2">
          {TRUST_POINTS.map((item) => (
            <Card key={item.title} className="flex gap-3">
              <ShieldCheck className="mt-0.5 shrink-0 text-primary" size={20} />
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.body}</p>
              </div>
            </Card>
          ))}
        </div>

        <SectionTitle>Service area</SectionTitle>
        <Card className="relative overflow-hidden">
          <TexasWatermark className="absolute -right-6 -bottom-8 size-40 opacity-[0.07]" />
          <div className="relative">
            <p className="flex items-start gap-2 text-sm text-foreground">
              <MapPin size={16} className="mt-0.5 text-primary" />
              {BUSINESS.serviceAreaNote}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{BUSINESS.serviceArea}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
              >
                <Phone size={16} />
                {BUSINESS.phone}
              </a>
              <span className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} />
                {BUSINESS.hours}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function HeaderIcon({
  to,
  label,
  count,
  children,
}: {
  to: "/chat" | "/notifications";
  label: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="relative flex size-11 items-center justify-center rounded-xl border border-white/30 bg-ink/30 text-white backdrop-blur-sm"
    >
      {children}
      {count > 0 && (
        <span
          className={cn(
            "absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground",
          )}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
