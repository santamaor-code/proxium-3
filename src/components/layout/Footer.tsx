import Link from "next/link";
import { CountryConfig } from "@/config/countries";
import { Container } from "@/components/ui/Container";

export function Footer({ country }: { country: CountryConfig }) {
  return (
    <footer className="mt-24 border-t border-charcoal/10 bg-stone-100">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-charcoal">
            {country.clinic.name}
          </p>
          <p className="mt-2 text-sm text-charcoal-soft">
            {country.clinic.address}
          </p>
        </div>

        <div className="text-sm text-charcoal-soft">
          <p>{country.clinic.phone}</p>
          <a
            href={`https://wa.me/${country.clinic.whatsapp.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block hover:text-charcoal"
          >
            WhatsApp: {country.clinic.whatsapp}
          </a>
          <p className="mt-1">{country.clinic.email}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-charcoal-soft">
          <Link
            href={`/${country.code}/programa-resultados`}
            className="hover:text-charcoal"
          >
            Comparte tu resultado
          </Link>
          <Link href={`/${country.code}/terminos`} className="hover:text-charcoal">
            Términos y condiciones
          </Link>
          <Link href={`/${country.code}/privacidad`} className="hover:text-charcoal">
            Aviso de privacidad
          </Link>
          <Link
            href={`/${country.code}/aviso-medico`}
            className="hover:text-charcoal"
          >
            Aviso médico
          </Link>
        </div>
      </Container>

      <div className="border-t border-charcoal/10 py-6 text-center text-xs text-charcoal-soft">
        © {new Date().getFullYear()} {country.operator.legalName}, cédula
        jurídica {country.operator.cedulaJuridica}. Evaluación y tratamiento
        a cargo de {country.clinic.legalName}, cédula jurídica{" "}
        {country.clinic.cedulaJuridica}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
