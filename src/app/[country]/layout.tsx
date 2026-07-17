import { notFound } from "next/navigation";
import { getActiveCountryCodes, getCountry } from "@/config/countries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return getActiveCountryCodes().map((code) => ({ country: code }));
}

export default function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { country: string };
}) {
  const country = getCountry(params.country);

  // Unknown or inactive country codes fall through to the 404 page
  // rather than rendering a broken/empty market.
  if (!country || !country.active) {
    notFound();
  }

  return (
    <>
      <Header country={country} />
      <main>{children}</main>
      <Footer country={country} />
    </>
  );
}
