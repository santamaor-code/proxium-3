import { TestimonialProgramContent } from "../types";

export const testimonialProgramContentCR: TestimonialProgramContent = {
  eyebrow: "Programa opcional de testimonios BioH",
  title: "Comparte tu resultado, recibe un descuento",
  subtitle:
    "Si ya eres paciente y quieres compartir voluntariamente tu experiencia, puedes autorizar el uso de tu testimonio y/o fotografías a cambio del beneficio indicado por BioH.",
  howItWorks: [
    { title: "1. Envías tu solicitud", body: "El programa es independiente de tu evaluación y tratamiento médico." },
    { title: "2. BioH te contacta", body: "Se confirma contigo qué material deseas compartir y cómo podrá utilizarse." },
    { title: "3. Autorizas el contenido", body: "Solo se utilizarán el testimonio, resultados y/o fotografías que autorices expresamente." },
    { title: "4. Recibes el beneficio", body: "El descuento o beneficio se aplica según las condiciones confirmadas por BioH." },
  ],
  requirements: [
    "La participación es totalmente voluntaria y no afecta tu evaluación, tratamiento ni atención médica.",
    "Puedes decidir qué fotografías, testimonio o resultados autorizas a publicar.",
    "La autorización de marketing es independiente del consentimiento utilizado para tu evaluación médica.",
    "Cuando corresponda, el contenido publicado podrá identificarse como testimonio incentivado.",
  ],
  consentLabel:
    "Autorizo voluntariamente a BioH a contactarme sobre este programa y, una vez acordado el material específico, a utilizar el testimonio, resultados y/o fotografías que yo apruebe para fines promocionales. Entiendo que esta autorización es independiente de mi atención médica.",
  form: {
    fields: [
      { name: "fullName", label: "Nombre completo", placeholder: "Nombre y apellidos", type: "text" },
      { name: "phone", label: "Teléfono celular / WhatsApp", placeholder: "8888 8888", type: "tel" },
    ],
    messageLabel: "Cuéntanos brevemente tu experiencia (opcional)",
    messagePlaceholder: "¿Qué resultados has notado con tu tratamiento?",
    cta: "Enviar solicitud",
  },
  disclosureNote:
    "Si un testimonio publicado está asociado a un descuento u otro beneficio, podrá indicarse como contenido incentivado.",
  disclaimer:
    "Los resultados individuales pueden variar. Participar o no participar en este programa no afecta tu atención médica.",
};
