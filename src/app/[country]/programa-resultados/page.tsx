import { Metadata } from "next";
import { getCountry } from "@/config/countries";
import { getTestimonialProgramContent } from "@/content/testimonialProgram";
import { Container } from "@/components/ui/Container";
import { TestimonialProgramForm } from "@/components/testimonial-program/TestimonialProgramForm";

export function generateMetadata({
  params,
}: {
  params: { country: string };
}): Metadata {
  const country = getCountry(params.country);
  return {
    title: `Comparte tu resultado | ${country?.clinic.name ?? ""}`,
  };
}

export default function TestimonialProgramPage({
  params,
}: {
  params: { country: string };
}) {
  const content = getTestimonialProgramContent(params.country)!;

  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-wide text-sage-600">
          {content.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium text-charcoal md:text-4xl">
          {content.title}
        </h1>
        <p className="mt-4 max-w-lg text-sm text-charcoal-soft md:text-base">
          {content.subtitle}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {content.howItWorks.map((step) => (
            <div
              key={step.title}
              className="rounded-card border border-charcoal/10 bg-stone-100 p-5"
            >
              <p className="font-medium text-charcoal">{step.title}</p>
              <p className="mt-1.5 text-sm text-charcoal-soft">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-card border border-charcoal/10 bg-stone-50 p-6">
          <p className="text-sm font-medium text-charcoal">Requisitos</p>
          <ul className="mt-3 flex flex-col gap-2">
            {content.requirements.map((req) => (
              <li key={req} className="flex items-start gap-2 text-sm text-charcoal-soft">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sage-500" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-xs text-charcoal-soft/70">
          {content.disclosureNote}
        </p>

        <div className="mt-10 max-w-md">
          <TestimonialProgramForm content={content} />
        </div>

        <p className="mt-6 text-xs text-charcoal-soft/70">
          {content.disclaimer}
        </p>
      </Container>
    </section>
  );
}
