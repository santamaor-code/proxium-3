import { CountryCode } from "@/config/countries";
import { LegalContent } from "./types";
import { legalContentCR } from "./cr/legal";

export const legalContent: Record<CountryCode, LegalContent> = {
  cr: legalContentCR,
};

export function getLegalContent(code: string): LegalContent | undefined {
  return legalContent[code as CountryCode];
}
