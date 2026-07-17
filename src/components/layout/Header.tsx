import Link from "next/link";
import { CountryConfig } from "@/config/countries";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Header({ country }: { country: CountryConfig }) {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-stone-50/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href={`/${country.code}`}
          className="font-display text-xl text-charcoal"
          aria-label={`${country.clinic.name} - inicio`}
        >
          {country.clinic.name}
        </Link>

        <Button href={`/${country.code}/evaluacion`} variant="primary">
          Comenzar evaluación
        </Button>
      </Container>
    </header>
  );
}
