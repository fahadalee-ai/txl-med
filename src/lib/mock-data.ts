import { IMAGES } from "./images";

export type AppointmentStatus = "upcoming" | "completed" | "cancelled";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  cdlNumber?: string;
  employer?: string;
  role?: string;
};

export type Service = {
  id: string;
  name: string;
  short: string;
  description: string;
  duration: string;
  price: number;
  icon: "stethoscope" | "refresh" | "truck";
  image: string;
  featured?: boolean;
};

export type Appointment = {
  id: string;
  userId: string;
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
};

export type BookingDraft = {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
};

export const BUSINESS = {
  name: "TXL Med PLLC",
  tagline: "Mobile DOT Physicals, Wherever You Are",
  phone: "(512) 400-8950",
  phoneHref: "tel:+15124008950",
  email: "scheduling@txlmed.com",
  emailHref: "mailto:scheduling@txlmed.com",
  hours: "Monday–Saturday, 7:00 AM – 7:00 PM",
  serviceArea: "Texas — Austin, San Antonio, Houston, DFW, and connecting corridors",
  serviceAreaNote:
    "FMCSA-certified examiners travel to your yard, terminal, home, or a safe roadside meetup across Texas.",
} as const;

export const SERVICES: Service[] = [
  {
    id: "dot-physical",
    name: "DOT Physical",
    short: "FMCSA medical exam at your location",
    description:
      "A complete Department of Transportation physical from an FMCSA-certified examiner. We come to you, complete the exam, and help you stay road-ready with your Medical Examiner’s Certificate.",
    duration: "30–45 min",
    price: 125,
    icon: "stethoscope",
    image: IMAGES.serviceDot,
    featured: true,
  },
  {
    id: "dot-renewal",
    name: "DOT Recertification",
    short: "Renew your Medical Examiner’s Certificate",
    description:
      "For CDL and CPL drivers whose medical card is expiring. Same mobile DOT physical, focused on getting your certificate renewed without a clinic wait.",
    duration: "30–40 min",
    price: 115,
    icon: "refresh",
    image: IMAGES.serviceRenewal,
  },
  {
    id: "fleet-dot",
    name: "Fleet / On-Site Group Exams",
    short: "Bring the exam to your drivers",
    description:
      "Schedule mobile DOT physicals for multiple drivers at your terminal or shop. One visit, several certificates — less downtime for the fleet.",
    duration: "Per driver, ~30 min",
    price: 99,
    icon: "truck",
    image: IMAGES.serviceFleet,
  },
];

export const ONBOARDING = [
  {
    title: "Your DOT Physical, On Your Route",
    body: "TXL Med brings certified DOT physical exams directly to you — no clinic visit, no lost driving time.",
    image: IMAGES.onboardingHighway,
    alt: "Commercial truck on an open Texas highway",
  },
  {
    title: "Certified. Convenient. Compliant.",
    body: "Our FMCSA-certified examiners come to your location and get you road-ready, fast.",
    image: IMAGES.onboardingExam,
    alt: "Medical examiner with a stethoscope during an on-site exam",
  },
  {
    title: "Book in Minutes",
    body: "Pick a time, share your location, and we'll handle the rest — your Medical Examiner's Certificate, without the wait.",
    image: IMAGES.onboardingSchedule,
    alt: "Driver checking a phone schedule",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Book",
    body: "Choose a DOT exam, pick a time that fits your route, and tell us where to meet you.",
  },
  {
    step: "2",
    title: "We Come to You",
    body: "An FMCSA-certified examiner arrives at your yard, home, or meetup spot.",
  },
  {
    step: "3",
    title: "Get Certified",
    body: "Complete your physical and stay compliant — without losing a day at a clinic.",
  },
] as const;

export const TRUST_POINTS = [
  {
    title: "Certified examiners",
    body: "FMCSA-certified medical examiners who understand commercial-driver requirements.",
  },
  {
    title: "Mobile convenience",
    body: "No waiting room. We travel to you so you keep moving freight — and income.",
  },
  {
    title: "Texas coverage",
    body: "Austin, San Antonio, Houston, DFW, and the corridors that connect them.",
  },
] as const;

export const TIME_SLOTS = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "18:00",
] as const;

export const BOOKING_STEPS = ["Service", "Date & time", "Location", "Review"] as const;

export const emptyDraft = (): BookingDraft => ({
  serviceId: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "TX",
  zip: "",
  notes: "",
});

export const seedUsers: User[] = [
  {
    id: "u1",
    name: "Jordan Reyes",
    email: "jordan@txlmed.com",
    phone: "(512) 555-0148",
    password: "Driver1",
    cdlNumber: "TX-C-482913",
    employer: "Lone Star Freight",
    role: "CDL driver",
  },
];

function isoDaysFromToday(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export const seedAppointments: Appointment[] = [
  {
    id: "apt1",
    userId: "u1",
    serviceId: "dot-physical",
    date: isoDaysFromToday(5),
    time: "09:00",
    name: "Jordan Reyes",
    phone: "(512) 555-0148",
    address: "1840 E Cesar Chavez St",
    city: "Austin",
    state: "TX",
    zip: "78702",
    notes: "Yard gate code 4412. Park by the office.",
    status: "upcoming",
    createdAt: isoDaysFromToday(-2),
  },
  {
    id: "apt2",
    userId: "u1",
    serviceId: "dot-renewal",
    date: isoDaysFromToday(-40),
    time: "14:00",
    name: "Jordan Reyes",
    phone: "(512) 555-0148",
    address: "410 Terminal Rd",
    city: "San Antonio",
    state: "TX",
    zip: "78219",
    notes: "",
    status: "completed",
    createdAt: isoDaysFromToday(-45),
  },
];

export function serviceById(id: string) {
  return SERVICES.find((s) => s.id === id);
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatDateLong(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function todayIso() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
}

export function formatMoney(n: number) {
  return `$${n.toFixed(0)}`;
}

export function statusLabel(status: AppointmentStatus) {
  if (status === "upcoming") return "Upcoming";
  if (status === "completed") return "Completed";
  return "Cancelled";
}

export function unavailableSlotsForDate(iso: string) {
  const day = Number(iso.split("-")[2] ?? 0);
  if (day % 5 === 0) return ["09:00", "09:30", "13:00"];
  if (day % 3 === 0) return ["07:00", "11:00", "16:00"];
  if (day % 2 === 0) return ["10:30", "15:00"];
  return ["08:00"];
}
