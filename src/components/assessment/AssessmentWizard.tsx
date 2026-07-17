"use client";

import { useState } from "react";
import { AssessmentContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { TextField } from "@/components/ui/TextField";
import { OptionCard } from "@/components/ui/OptionCard";
import { Button } from "@/components/ui/Button";

import { PhotoZoneCard } from "@/components/assessment/PhotoZoneCard";
import { compressImage } from "@/lib/compressImage";

export interface IdentityFormData {
  fullName: string;
  phone: string;
  idNumber: string;
}

const emptyIdentity: IdentityFormData = {
  fullName: "",
  phone: "",
  idNumber: "",
};

type Stage = "identity" | "questions" | "photos" | "done";

function SectionTabs({
  content,
  activeSection,
}: {
  content: AssessmentContent;
  activeSection: "general" | "medicalSafety" | "photos" | "results";
}) {
  const items: { key: typeof activeSection; label: string }[] = [
    { key: "general", label: content.tabs.general },
    { key: "medicalSafety", label: content.tabs.medicalSafety },
    { key: "photos", label: content.tabs.photos },
    { key: "results", label: content.tabs.results },
  ];

  return (
    <div className="mb-8 flex gap-4 border-b border-charcoal/10 pb-3 text-xs">
      {items.map((item) => (
        <span
          key={item.key}
          className={
            item.key === activeSection
              ? "font-medium text-sage-700"
              : "text-charcoal-soft/60"
          }
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function AssessmentWizard({
  content,
  countryCode,
}: {
  content: AssessmentContent;
  countryCode: string;
}) {
  const [stage, setStage] = useState<Stage>("identity");
  const [identity, setIdentity] = useState<IdentityFormData>(emptyIdentity);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<Record<string, File>>({});
  const [photoPreviews, setPhotoPreviews] = useState<Record<string, string>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { identityStep, questions, photoStep } = content;
  const currentQuestion = questions[questionIndex];

  function handleIdentitySubmit(e: React.FormEvent) {
    e.preventDefault();
    setStage("questions");
  }

  function handleSelectOption(value: string) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  }

  function handleNext() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      setStage("photos");
    }
  }

  async function handlePhotoSelect(zoneId: string, file: File) {
    const compressed = await compressImage(file);
    setPhotos((prev) => ({ ...prev, [zoneId]: compressed }));
    setPhotoPreviews((prev) => ({
      ...prev,
      [zoneId]: URL.createObjectURL(compressed),
    }));
  }

  function handlePhotoRemove(zoneId: string) {
    setPhotos((prev) => {
      const next = { ...prev };
      delete next[zoneId];
      return next;
    });
    setPhotoPreviews((prev) => {
      const next = { ...prev };
      delete next[zoneId];
      return next;
    });
  }

  async function handlePhotosSubmit() {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.set("country", countryCode);
      formData.set("fullName", identity.fullName);
      formData.set("phone", identity.phone);
      formData.set("idNumber", identity.idNumber);
      formData.set("answers", JSON.stringify(answers));
      Object.entries(photos).forEach(([zoneId, file]) => {
        formData.set(`photo_${zoneId}`, file);
      });

      const res = await fetch("/api/assessment", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("submission_failed");
      }

      setStage("done");
      // TODO(milestone-5b): once BioH's real destination is confirmed,
      // consider also showing a scheduling link here instead of ending
      // on a static confirmation message.
    } catch {
      setSubmitError(
        "No se pudo enviar tu evaluación. Por favor intenta de nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (stage === "identity") {
    return (
      <section className="py-16 md:py-24">
        <Container className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-wide text-sage-600">
            {identityStep.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-2xl font-medium text-charcoal md:text-3xl">
            {identityStep.title}
          </h1>
          <p className="mt-3 text-sm text-charcoal-soft">
            {identityStep.subtitle}
          </p>

          <form
            onSubmit={handleIdentitySubmit}
            className="mt-8 flex flex-col gap-5"
          >
            {identityStep.fields.map((field) => (
              <TextField
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                value={identity[field.name as keyof IdentityFormData]}
                onChange={(value) =>
                  setIdentity((prev) => ({ ...prev, [field.name]: value }))
                }
              />
            ))}

            <Button variant="primary" className="mt-2 w-full">
              {identityStep.cta}
            </Button>

            <p className="text-xs text-charcoal-soft/70">
              {identityStep.disclaimer}
            </p>
          </form>
        </Container>
      </section>
    );
  }

  if (stage === "photos") {
    const capturedCount = Object.keys(photos).length;
    const canContinue = capturedCount >= photoStep.minRequired;

    return (
      <section className="py-16 md:py-24">
        <Container className="max-w-md">
          <SectionTabs content={content} activeSection="photos" />

          <h1 className="font-display text-2xl font-medium text-charcoal md:text-3xl">
            {photoStep.title}
          </h1>
          <p className="mt-3 text-sm text-charcoal-soft">
            {photoStep.instructions}
          </p>
          <p className="mt-2 text-xs text-sage-700">{photoStep.privacyNote}</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {photoStep.zones.map((zone) => (
              <PhotoZoneCard
                key={zone.id}
                label={zone.label}
                previewUrl={photoPreviews[zone.id] ?? null}
                onSelect={(file) => handlePhotoSelect(zone.id, file)}
                onRemove={() => handlePhotoRemove(zone.id)}
              />
            ))}
          </div>

          <p className="mt-4 text-xs text-charcoal-soft">
            {photoStep.helperNote}
          </p>

          {submitError && (
            <p className="mt-4 text-sm text-red-600">{submitError}</p>
          )}

          <Button
            variant="primary"
            className="mt-8 w-full"
            onClick={handlePhotosSubmit}
            disabled={!canContinue || submitting}
          >
            {submitting ? "Enviando..." : photoStep.cta}
          </Button>
        </Container>
      </section>
    );
  }

  if (stage === "done") {
    return (
      <section className="py-24 text-center">
        <Container className="max-w-md">
          <h1 className="font-display text-2xl font-medium text-charcoal">
            Evaluación enviada
          </h1>
          <p className="mt-3 text-sm text-charcoal-soft">
            Un médico de BioH revisará tu caso. Te contactaremos por
            teléfono o correo para coordinar los siguientes pasos.
          </p>
        </Container>
      </section>
    );
  }

  // stage === "questions"
  const sectionQuestions = questions.filter(
    (q) => q.section === currentQuestion.section
  );
  const sectionIndex =
    sectionQuestions.findIndex((q) => q.id === currentQuestion.id) + 1;
  const selectedValue = answers[currentQuestion.id];

  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-md">
        <SectionTabs content={content} activeSection={currentQuestion.section} />

        <p className="text-xs text-charcoal-soft/60">
          {sectionIndex} / {sectionQuestions.length}
        </p>
        <div className="mt-2 h-1 w-full rounded-full bg-stone-200">
          <div
            className="h-1 rounded-full bg-sage-400 transition-all"
            style={{
              width: `${(sectionIndex / sectionQuestions.length) * 100}%`,
            }}
          />
        </div>

        {currentQuestion.badge && (
          <span className="mt-6 inline-block rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-sage-700">
            {currentQuestion.badge}
          </span>
        )}

        <h2 className="mt-4 font-display text-xl font-medium text-charcoal md:text-2xl">
          {currentQuestion.question}
        </h2>

        {currentQuestion.helper && (
          <p className="mt-3 text-sm text-charcoal-soft">
            {currentQuestion.helper}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {currentQuestion.options.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={selectedValue === option.value}
              onClick={() => handleSelectOption(option.value)}
            />
          ))}
        </div>

        <Button
          variant="primary"
          className="mt-8 w-full"
          onClick={handleNext}
          disabled={!selectedValue}
        >
          {content.nextLabel}
        </Button>
      </Container>
    </section>
  );
}
