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
    cedulaJuridica: string;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
  };
  // The company that operates this website and handles/transmits
  // submissions - legally distinct from the clinic above, which performs
  // the actual medical evaluation. Named explicitly in the legal pages.
  operator: {
    legalName: string;
    cedulaJuridica: string;
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
      legalName: "Salud en Equilibrio (BioH)",
      cedulaJuridica: "3-101-694978",
      address: "Barrio Francisco Peralta, San José, Costa Rica",
      // Email pending - phone/WhatsApp confirmed real as of Jul 2026.
      phone: "+506 2280 5058",
      whatsapp: "+506 8828 8091",
      email: "contacto@bioh.cr",
    },
    operator: {
      legalName: "Sociedad de Responsabilidad Limitada",
      cedulaJuridica: "3-102-954118",
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
