import splashHighway from "@/img/splash-dot-highway.png";
import splashExam from "@/img/splash-onsite-exam.png";
import onboardHighway from "@/img/onboard-highway.png";
import onboardExam from "@/img/onboard-exam.png";
import onboardBook from "@/img/onboard-book.png";
import authHighway from "@/img/auth-highway.png";
import authTerminal from "@/img/auth-terminal.png";

/** Hi-res imagery for TXL Med screens. */
export const IMAGES = {
  splashHighway,
  splashExam,
  onboardingHighway: onboardHighway,
  onboardingExam: onboardExam,
  onboardingSchedule: onboardBook,
  authRoad: authHighway,
  authTerminal,
  homeHero: splashHighway,
  serviceDot: onboardExam,
  serviceRenewal: splashExam,
  serviceFleet: authTerminal,
} as const;
