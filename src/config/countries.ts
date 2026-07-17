// Every market the platform can run in lives here as data, not code.
// Adding a new country (e.g. Mexico) means adding an entry to this file
// and its content strings - never touching route or component logic.

export type CountryCode = "cr";

export interface CountryConfig {
  code: CountryCode;
  active: boolean;
  name: string;
  locale: string;
  currency: "CRC";
  clinic: {
    name: string;
    legalName: string;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
}

export const countries: Record<CountryCode, CountryConfig> = {
  cr: {
    code: "cr",
    active: true,
    name: "Costa Rica",
    locale: "es-CR",
    currency: "CRC",
    clinic: {
      name: "BioH",
      legalName: "BioH Costa Rica",
      address: "Barrio Francisco Peralta, San José, Costa Rica",
      // Placeholder contact details — replace with confirmed values before launch.
      phone: "+506 0000 0000",
      whatsapp: "+506 0000 0000",
      email: "contacto@bioh.cr",
    },
    seo: {
      defaultTitle: "BioH | Tratamiento para la caída del cabello en Costa Rica",
      defaultDescription:
        "Evaluación clínica de caída del cabello con respaldo médico. Descubre si eres candidato para tratamiento en BioH Costa Rica.",
    },
  },
};

export const defaultCountry: CountryCode = "cr";

export function getCountry(code: string): CountryConfig | undefined {
  return countries[code as CountryCode];
}

export function getActiveCountryCodes(): CountryCode[] {
  return (Object.keys(countries) as CountryCode[]).filter(
    (code) => countries[code].active
  );
}
