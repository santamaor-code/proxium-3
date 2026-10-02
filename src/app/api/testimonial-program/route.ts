import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Reuses the same notification inbox as assessments for now - can be
// split into its own destination later if BioH wants a different team
// handling this program.
const NOTIFICATION_EMAIL =
  process.env.ASSESSMENT_NOTIFICATION_EMAIL || "placeholder@bioh.cr";
const FROM_ADDRESS =
  process.env.ASSESSMENT_FROM_EMAIL || "evaluaciones@bioh.cr";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, message, consent } = body;

    if (!consent) {
      return NextResponse.json(
        { error: "Se requiere autorización para publicar resultados." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFICATION_EMAIL,
      subject: `Programa de testimonios · ${fullName}`,
      html: `
        <h2>Nueva solicitud - Programa de testimonios con descuento</h2>
        <p><strong>Nombre:</strong> ${fullName}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong> ${message || "(sin mensaje)"}</p>
        <p><strong>Autorizó publicación:</strong> Sí</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending testimonial program submission:", error);
    return NextResponse.json(
      { error: "No se pudo enviar tu solicitud. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
