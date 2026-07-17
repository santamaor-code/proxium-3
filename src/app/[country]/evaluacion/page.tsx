import { Metadata } from "next";
import { getCountry } from "@/config/countries";
import { getAssessmentContent } from "@/content/assessment";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";

export function generateMetadata({
  params,
}: {
  params: { country: string };
}): Metadata {
  const country = getCountry(params.country);
  return {
    title: `Evaluación | ${country?.clinic.name ?? ""}`,
  };
}

export default function EvaluacionPage({
  params,
}: {
  params: { country: string };
}) {
  const content = getAssessmentContent(params.country)!;

  return <AssessmentWizard content={content} countryCode={params.country} />;
}
