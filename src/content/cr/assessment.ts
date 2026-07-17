import { AssessmentContent } from "../types";

export const assessmentContentCR: AssessmentContent = {
  tabs: {
    general: "Cuestionario",
    medicalSafety: "Antecedentes médicos",
    photos: "Fotos",
    results: "Resultados",
  },
  identityStep: {
    eyebrow: "Evaluación BioH · Paso 1",
    title: "Antes de comenzar",
    subtitle:
      "Necesitamos algunos datos para que un médico de BioH pueda revisar tu caso.",
    fields: [
      {
        name: "fullName",
        label: "Nombre completo",
        placeholder: "Nombre y apellidos",
        type: "text",
      },
      {
        name: "phone",
        label: "Teléfono celular",
        placeholder: "8888 8888",
        type: "tel",
      },
      {
        name: "idNumber",
        label: "Cédula o pasaporte",
        placeholder: "1-2345-6789",
        type: "text",
      },
    ],
    cta: "Continuar",
    disclaimer:
      "Tus datos se usan únicamente para tu evaluación médica y se manejan de forma confidencial.",
  },
  nextLabel: "Continuar",
  photoStep: {
    title: "Fotos de las áreas del cuero cabelludo",
    instructions:
      "Toca cada área para tomar la foto. Usa luz natural, separa el cabello a lo largo de la línea media, y sostén la cámara a 12–15 cm del cuero cabelludo.",
    privacyNote:
      "Tus fotos son privadas y están encriptadas — solo las ve tu médico.",
    zones: [
      { id: "hairline", label: "Línea del cabello" },
      { id: "crown", label: "Coronilla" },
      { id: "right_temple", label: "Sien derecha" },
      { id: "left_temple", label: "Sien izquierda" },
    ],
    minRequired: 2,
    helperNote:
      "Fotografía al menos 2 áreas. La coronilla y la línea del cabello ofrecen la información más útil.",
    cta: "Continuar",
  },
  questions: [
    // --- Cuestionario general ---
    {
      id: "duration",
      section: "general",
      question:
        "¿Cuánto tiempo llevas notando la caída o adelgazamiento de tu cabello?",
      options: [
        { value: "under_6m", label: "Menos de 6 meses" },
        { value: "6_24m", label: "6–24 meses" },
        { value: "2_5y", label: "2–5 años" },
        { value: "over_5y", label: "Más de 5 años" },
      ],
    },
    {
      id: "location",
      section: "general",
      question: "¿Dónde es más notable el adelgazamiento?",
      options: [
        { value: "crown", label: "Coronilla" },
        { value: "hairline", label: "Línea de nacimiento / entradas" },
        { value: "diffuse", label: "General (difuso)" },
        { value: "sides", label: "Costados" },
      ],
    },
    {
      id: "family_history",
      section: "general",
      question: "¿Hay antecedentes familiares de caída de cabello?",
      options: [
        { value: "father", label: "Lado paterno" },
        { value: "mother", label: "Lado materno" },
        { value: "both", label: "Ambos lados" },
        { value: "none", label: "Sin antecedentes familiares" },
      ],
    },
    {
      id: "current_medication",
      section: "general",
      question:
        "¿Estás tomando algún medicamento para la caída de cabello actualmente?",
      options: [
        { value: "none", label: "Ningún medicamento" },
        { value: "finasteride_dutasteride", label: "Finasterida / Dutasterida" },
        { value: "minoxidil", label: "Minoxidil" },
        { value: "other", label: "Otro medicamento recetado" },
      ],
    },
    {
      id: "stress_level",
      section: "general",
      question: "¿Cómo calificarías tu nivel de estrés en el último año?",
      options: [
        { value: "low", label: "Bajo — controlado" },
        { value: "moderate", label: "Moderado" },
        { value: "high", label: "Alto" },
        { value: "very_high", label: "Muy alto / crónico" },
      ],
    },
    // --- Antecedentes médicos (verificación de seguridad) ---
    {
      id: "age_18",
      section: "medicalSafety",
      badge: "Verificación de seguridad médica",
      question: "¿Tienes 18 años o más?",
      helper:
        "Respuestas honestas garantizan la seguridad del tratamiento — un médico las revisa antes de cualquier prescripción.",
      options: [
        { value: "yes", label: "Sí" },
        { value: "no", label: "No" },
      ],
    },
    {
      id: "pregnancy",
      section: "medicalSafety",
      badge: "Verificación de seguridad médica",
      question: "¿Estás embarazada, en lactancia, o planeando un embarazo?",
      helper:
        "Respuestas honestas garantizan la seguridad del tratamiento — un médico las revisa antes de cualquier prescripción.",
      options: [
        { value: "no", label: "No / no aplica" },
        { value: "pregnant", label: "Sí — embarazada" },
        { value: "breastfeeding", label: "Sí — en lactancia" },
        { value: "planning", label: "Sí — planeando un embarazo" },
      ],
    },
    {
      id: "known_allergy",
      section: "medicalSafety",
      badge: "Verificación de seguridad médica",
      question:
        "¿Tienes alguna alergia conocida al minoxidil, finasterida o dutasterida?",
      helper:
        "Respuestas honestas garantizan la seguridad del tratamiento — un médico las revisa antes de cualquier prescripción.",
      options: [
        { value: "none", label: "Ninguna alergia conocida" },
        { value: "yes", label: "Sí" },
      ],
    },
    {
      id: "diagnosed_conditions",
      section: "medicalSafety",
      badge: "Verificación de seguridad médica",
      question:
        "¿Has sido diagnosticado con enfermedad hepática, cáncer de próstata, o depresión clínica/severa?",
      helper:
        "Respuestas honestas garantizan la seguridad del tratamiento — un médico las revisa antes de cualquier prescripción.",
      options: [
        { value: "none", label: "Ninguna de estas" },
        { value: "yes", label: "Sí, una o más" },
      ],
    },
    {
      id: "bp_heart_medication",
      section: "medicalSafety",
      badge: "Verificación de seguridad médica",
      question:
        "¿Tomas medicamento para la presión arterial baja o alguna condición cardíaca?",
      helper:
        "Respuestas honestas garantizan la seguridad del tratamiento — un médico las revisa antes de cualquier prescripción.",
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Sí" },
      ],
    },
  ],
};
