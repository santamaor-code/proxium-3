export interface TestimonialProgramContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  howItWorks: { title: string; body: string }[];
  requirements: string[];
  consentLabel: string;
  form: {
    fields: { name: string; label: string; placeholder: string; type: "text" | "tel" | "email" }[];
    messageLabel: string;
    messagePlaceholder: string;
    cta: string;
  };
  disclosureNote: string;
  disclaimer: string;
}

export interface AssessmentQuestion {
  id: string;
  section: "general" | "medicalSafety";
  badge?: string;
  question: string;
  helper?: string;
  options: { value: string; label: string }[];
}

export interface PhotoZone {
  id: string;
  label: string;
}

export interface AssessmentContent {
  tabs: {
    general: string;
    medicalSafety: string;
    photos: string;
    results: string;
  };
  identityStep: {
    eyebrow: string;
    title: string;
    subtitle: string;
    fields: {
      name: string;
      label: string;
      placeholder: string;
      type: "text" | "tel";
    }[];
    cta: string;
    disclaimer: string;
  };
  questions: AssessmentQuestion[];
  photoStep: {
    title: string;
    instructions: string;
    privacyNote: string;
    zones: PhotoZone[];
    minRequired: number;
    helperNote: string;
    cta: string;
  };
  nextLabel: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  causes: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { icon: string; title: string; body: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  results: {
    eyebrow: string;
    title: string;
    stats: { value: string; label: string; source: string }[];
    reportImage: {
      src: string;
      alt: string;
      caption: string;
    };
    disclaimer: string;
  };
  trust: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };
  finalCta: {
    title: string;
    body: string;
    cta: string;
  };
}
