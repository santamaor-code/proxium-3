import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountry } from "@/config/countries";
import { getLegalContent } from "@/content/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export function generateMetadata({
  params,
}: {
  params: { country: string };
}): Metadata {
  const country = getCountry(params.country);
  return {
    title: `Aviso Médico | ${country?.clinic.name ?? ""}`,
  };
}

export default function AvisoMedicoPage({
  params,
}: {
  params: { country: string };
}) {
  const country = getCountry(params.country);
  const legal = getLegalContent(params.country);
  if (!country || !legal) {
    notFound();
  }

  return <LegalPageLayout content={legal.medicalDisclaimer} />;
}
