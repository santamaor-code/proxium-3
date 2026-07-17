import { CountryCode } from "@/config/countries";
import { HomeContent } from "./types";
import { homeContentCR } from "./cr/home";

export const homeContent: Record<CountryCode, HomeContent> = {
  cr: homeContentCR,
};

export function getHomeContent(code: string): HomeContent | undefined {
  return homeContent[code as CountryCode];
}
