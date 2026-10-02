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
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    products: {
      name: string;
      audience: string;
      price: string;
      priceNote: string;
      description: string;
    }[];
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

// Legal pages (Términos, Aviso de Privacidad, Aviso Médico).
// Set draftNotice on a LegalPageContent to show a "pending review" banner
// at the top of that page; leave it unset once the content is final.
export interface LegalSection {
  heading: string;
  // Each entry in body is either a paragraph (string) or a bulleted list.
  body: (string | { list: string[] })[];
}

export interface LegalPageContent {
  title: string;
  lastUpdated: string;
  // Optional: when set, the page shows a draft/pending-review banner with
  // this text. Leave unset once the content is considered final.
  draftNotice?: string;
  intro?: string;
  sections: LegalSection[];
}

export interface LegalContent {
  terms: LegalPageContent;
  privacy: LegalPageContent;
  medicalDisclaimer: LegalPageContent;
}
