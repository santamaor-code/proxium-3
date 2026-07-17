import { TestimonialProgramContent } from "../types";

export const testimonialProgramContentCR: TestimonialProgramContent = {
  eyebrow: "Programa de testimonios BioH",
  title: "Comparte tu resultado, recibe un descuento",
  subtitle:
    "Si tu tratamiento con BioH te dio buenos resultados, nos encantaría compartir tu historia — y agradecerte con un descuento en tu próxima compra.",
  howItWorks: [
    {
      title: "1. Completa este formulario",
      body: "Después de tu evaluación de seguimiento con BioH.",
    },
    {
      title: "2. Te contactamos",
      body: "Un asesor de BioH confirma los detalles contigo.",
    },
    {
      title: "3. Compartes tu resultado",
      body: "Fotos de antes/después y tu testimonio, con tu autorización.",
    },
    {
      title: "4. Recibes tu descuento",
      body: "Se aplica una vez publicado tu testimonio.",
    },
  ],
  requirements: [
    "Debes ser paciente activo de BioH con al menos una evaluación de seguimiento.",
    "Tus resultados y/o fotos podrán publicarse en el sitio web y redes sociales de BioH.",
    "El descuento se aplica sobre tu próxima compra de tratamiento, sujeto a confirmación de BioH.",
  ],
  consentLabel:
    "Autorizo a BioH a publicar mis resultados y/o fotos en su sitio web y redes sociales.",
  form: {
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
        name: "email",
        label: "Correo electrónico",
        placeholder: "tucorreo@ejemplo.com",
        type: "email",
      },
    ],
    messageLabel: "Cuéntanos brevemente tu experiencia (opcional)",
    messagePlaceholder: "¿Qué resultados has notado con tu tratamiento?",
    cta: "Enviar solicitud",
  },
  disclosureNote:
    "Los testimonios publicados a través de este programa se identifican como incentivados, en línea con buenas prácticas de transparencia publicitaria.",
  disclaimer:
    "Los resultados individuales pueden variar. La aprobación del descuento queda sujeta a revisión de BioH.",
};
