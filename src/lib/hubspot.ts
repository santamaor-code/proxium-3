const HUBSPOT_API_BASE = "https://api.hubapi.com";

interface LeadPhoto {
  zoneId: string;
  file: File;
}

interface LeadData {
  fullName: string;
  phone: string;
  idNumber: string;
  answersHtml: string;
  photos: LeadPhoto[];
}

function hubspotAuthHeader() {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "HUBSPOT_ACCESS_TOKEN is not set - cannot sync to HubSpot."
    );
  }
  return { Authorization: `Bearer ${token}` };
}

async function uploadPhotoToHubSpot(photo: LeadPhoto): Promise<string> {
  const form = new FormData();
  form.set("file", photo.file, `${photo.zoneId}.jpg`);
  form.set(
    "options",
    JSON.stringify({ access: "PRIVATE", overwrite: false })
  );
  form.set("folderPath", "/bioh-evaluaciones");

  const res = await fetch(`${HUBSPOT_API_BASE}/files/v3/files`, {
    method: "POST",
    headers: hubspotAuthHeader(),
    body: form,
  });

  if (!res.ok) {
    throw new Error(`HubSpot file upload failed: ${await res.text()}`);
  }
  const data = await res.json();
  return data.url as string;
}
function hubspotHeaders() {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "HUBSPOT_ACCESS_TOKEN is not set - skipping HubSpot sync."
    );
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstname: parts[0] ?? fullName,
    lastname: parts.slice(1).join(" ") || "-",
  };
}

async function findContactByPhone(phone: string): Promise<string | null> {
  const res = await fetch(
    `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/search`,
    {
      method: "POST",
      headers: hubspotHeaders(),
      body: JSON.stringify({
        filterGroups: [
          { filters: [{ propertyName: "phone", operator: "EQ", value: phone }] },
        ],
        limit: 1,
      }),
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.results?.[0]?.id ?? null;
}

async function createOrUpdateContact(lead: LeadData): Promise<string> {
  const existingId = await findContactByPhone(lead.phone);
  const { firstname, lastname } = splitName(lead.fullName);
  const properties = { firstname, lastname, phone: lead.phone };

  if (existingId) {
    await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${existingId}`, {
      method: "PATCH",
      headers: hubspotHeaders(),
      body: JSON.stringify({ properties }),
    });
    return existingId;
  }

  const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: hubspotHeaders(),
    body: JSON.stringify({ properties }),
  });
  if (!res.ok) {
    throw new Error(`HubSpot contact creation failed: ${await res.text()}`);
  }
  const data = await res.json();
  return data.id;
}

async function attachNote(contactId: string, lead: LeadData) {
  const photoLinks: string[] = [];
  for (const photo of lead.photos) {
    try {
      const url = await uploadPhotoToHubSpot(photo);
      photoLinks.push(`<a href="${url}">${photo.zoneId}</a>`);
    } catch (err) {
      // A single failed photo upload shouldn't block the whole
      // submission - the lead and its other data still matter.
      console.error(`Photo upload failed for ${photo.zoneId}:`, err);
      photoLinks.push(`${photo.zoneId} (error al subir)`);
    }
  }

  const noteBody = `
    <p><strong>Nueva evaluación completada</strong></p>
    <p>Cédula/Pasaporte: ${lead.idNumber}</p>
    ${lead.answersHtml}
    <p>Fotos: ${photoLinks.length ? photoLinks.join(" · ") : "ninguna"}</p>
  `;

  const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/notes`, {
    method: "POST",
    headers: hubspotHeaders(),
    body: JSON.stringify({
      properties: {
        hs_note_body: noteBody,
        hs_timestamp: Date.now(),
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 202, // note-to-contact
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`HubSpot note creation failed: ${await res.text()}`);
  }
}

// Deal creation is optional - only runs if BioH's actual pipeline/stage
// IDs are configured. Guessing these would create deals in the wrong
// pipeline silently, which is worse than skipping deal creation.
async function createDealIfConfigured(contactId: string, lead: LeadData) {
  const pipelineId = process.env.HUBSPOT_PIPELINE_ID;
  const stageId = process.env.HUBSPOT_PIPELINE_STAGE_ID;
  if (!pipelineId || !stageId) return;

  const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/deals`, {
    method: "POST",
    headers: hubspotHeaders(),
    body: JSON.stringify({
      properties: {
        dealname: `Evaluación - ${lead.fullName}`,
        pipeline: pipelineId,
        dealstage: stageId,
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 3, // deal-to-contact
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`HubSpot deal creation failed: ${await res.text()}`);
  }
}

export async function syncLeadToHubSpot(lead: LeadData) {
  const contactId = await createOrUpdateContact(lead);
  await attachNote(contactId, lead);
  await createDealIfConfigured(contactId, lead);
}
