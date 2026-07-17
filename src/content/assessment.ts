import { CountryCode } from "@/config/countries";
import { AssessmentContent } from "./types";
import { assessmentContentCR } from "./cr/assessment";

export const assessmentContent: Record<CountryCode, AssessmentContent> = {
  cr: assessmentContentCR,
};

export function getAssessmentContent(
  code: string
): AssessmentContent | undefined {
  return assessmentContent[code as CountryCode];
}
