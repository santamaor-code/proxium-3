import { CountryCode } from "@/config/countries";
import { TestimonialProgramContent } from "./types";
import { testimonialProgramContentCR } from "./cr/testimonialProgram";

export const testimonialProgramContent: Record<
  CountryCode,
  TestimonialProgramContent
> = {
  cr: testimonialProgramContentCR,
};

export function getTestimonialProgramContent(
  code: string
): TestimonialProgramContent | undefined {
  return testimonialProgramContent[code as CountryCode];
}
