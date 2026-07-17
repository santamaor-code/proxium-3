import { NextRequest, NextResponse } from "next/server";
import { getAssessmentContent } from "@/content/assessment";
import { getCountry } from "@/config/countries";
import { syncLeadToHubSpot } from "@/lib/hubspot";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const countryCode = String(formData.get("country") ?? "cr");
    const fullName = String(formData.get("fullName") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const idNumber = String(formData.get("idNumber") ?? "");
    const answersRaw = String(formData.get("answers") ?? "{}");
    const answers: Record<string, string> = JSON.parse(answersRaw);

    const country = getCountry(countryCode);
    const content = getAssessmentContent(countryCode);

    if (!country || !content) {
      return NextResponse.json({ error: "País no válido" }, { status: 400 });
    }

    // Translate raw answer values back into their Spanish labels for a
    // readable HubSpot note, rather than logging raw option keys.
    const answersHtml = content.questions
      .map((q) => {
        const selectedValue = answers[q.id];
        const selectedLabel =
          q.options.find(
            (o: { value: string; label: string }) => o.value === selectedValue
          )?.label ?? "(sin respuesta)";
        return `<tr><td style="padding:6px 12px 6px 0;color:#5F5E5A;">${q.question}</td><td style="padding:6px 0;font-weight:500;">${selectedLabel}</td></tr>`;
      })
      .join("");

    // Collect photo files, keyed by zone id.
    const photos: { zoneId: string; file: File }[] = [];
    for (const zone of content.photoStep.zones) {
      const file = formData.get(`photo_${zone.id}`) as File | null;
      if (file) {
        photos.push({ zoneId: zone.id, file });
      }
    }

    // HubSpot is the only destination for leads - if this fails, the
    // patient needs to know and retry, rather than getting a false
    // "success" while their data goes nowhere.
    await syncLeadToHubSpot({
      fullName,
      phone,
      idNumber,
      answersHtml,
      photos,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error syncing assessment to HubSpot:", error);
    return NextResponse.json(
      { error: "No se pudo enviar la evaluación. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
