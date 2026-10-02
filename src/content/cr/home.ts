import { HomeContent } from "../types";

export const homeContentCR: HomeContent = {
  hero: {
    eyebrow: "BioH · Costa Rica",
    title: "Recupera tu cabello, con respaldo médico.",
    subtitle:
      "Evaluación clínica en minutos, supervisada por médicos especialistas de BioH.",
    cta: "Comenzar evaluación",
  },
  causes: {
    eyebrow: "Entendiendo la caída del cabello",
    title: "La caída de cabello casi nunca tiene una sola causa",
    intro:
      "Antes de recomendar un tratamiento, es importante entender qué la está provocando. En muchos casos, la causa no es solo genética.",
    items: [
      {
        icon: "ti-dna-2",
        title: "Predisposición genética",
        body: "La alopecia androgenética es la causa más común, y su avance depende de la sensibilidad de tus folículos a ciertas hormonas.",
      },
      {
        icon: "ti-activity-heartbeat",
        title: "Desequilibrios hormonales",
        body: "La tiroides, el estrés crónico y otros cambios hormonales pueden acelerar la caída, incluso sin antecedentes familiares marcados.",
      },
      {
        icon: "ti-apple",
        title: "Factores nutricionales",
        body: "Deficiencias de hierro, vitamina D u otros nutrientes clave también pueden influir en la salud de tu cabello.",
      },
    ],
  },
  process: {
    eyebrow: "Cómo funciona",
    title: "Un proceso clínico, no una compra impulsiva",
    steps: [
      {
        title: "Evaluación en línea",
        body: "Responde un cuestionario clínico breve sobre tu historial y patrón de caída.",
      },
      {
        title: "Revisión médica",
        body: "Un médico de BioH revisa tu caso y determina si eres candidato para tratamiento.",
      },
      {
        title: "Plan personalizado",
        body: "Si eres candidato, agendas tu consulta para definir el tratamiento adecuado para ti.",
      },
    ],
  },
  results: {
    eyebrow: "Resultados clínicos",
    title: "Medido, no solo prometido",
    stats: [
      {
        value: "+23%",
        label: "aumento promedio en densidad capilar a los 90 días",
        source: "Estudio piloto del fabricante, medido con TrichoScale (FotoFinder)",
      },
      {
        value: "86%",
        label: "de los pacientes reportó resultados positivos",
        source: "Ensayo clínico del fabricante (n=300)",
      },
    ],
    reportImage: {
      src: "/images/sample-trichoscale-report.jpg",
      alt: "Reporte TrichoScale real comparando densidad capilar en día 0 y día 90",
      caption:
        "Ejemplo real de un reporte TrichoScale del estudio piloto del fabricante, día 0 frente a día 90.",
    },
    disclaimer:
      "Resultados de estudios clínicos del fabricante del tratamiento. BioH es el proveedor médico autorizado de este tratamiento en Costa Rica. Los resultados individuales pueden variar.",
  },
  pricing: {
    eyebrow: "Precios",
    title: "Un tratamiento, un precio claro",
    subtitle:
      "Sin suscripciones ni letra pequeña. El precio final se confirma con tu médico según tu evaluación.",
    products: [
      {
        name: "Proxium",
        audience: "Para hombres",
        price: "₡35,000",
        priceNote: "precio único",
        description:
          "Tratamiento formulado para la caída de cabello masculina, bajo supervisión médica de BioH.",
      },
      {
        name: "Proxil",
        audience: "Para mujeres",
        price: "₡35,000",
        priceNote: "precio único",
        description:
          "Tratamiento formulado para la caída de cabello femenina, bajo supervisión médica de BioH.",
      },
    ],
    disclaimer:
      "Precio sujeto a confirmación médica según tu evaluación. No incluye consulta si se requiere de forma presencial.",
  },
  trust: {
    eyebrow: "Por qué BioH",
    title: "Medicina funcional, no una fórmula genérica",
    body: "BioH es una clínica establecida en San José con médicos especializados en medicina funcional y hormonal. La caída de cabello se evalúa como parte de tu salud general, no de forma aislada.",
    points: [
      "Médicos con consulta presencial en San José",
      "Evaluación de causas hormonales, no solo genéticas",
      "Seguimiento clínico, no solo una receta única",
    ],
  },
  finalCta: {
    title: "El próximo mes va a pasar de todas formas",
    body: "Entre antes entiendas qué está causando tu caída de cabello, antes puedes actuar.",
    cta: "Comenzar evaluación",
  },
};
