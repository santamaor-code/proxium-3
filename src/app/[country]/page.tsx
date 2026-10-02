import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCountry } from "@/config/countries";
import { getHomeContent } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function generateMetadata({
  params,
}: {
  params: { country: string };
}): Metadata {
  const country = getCountry(params.country);
  return {
    title: country?.seo.defaultTitle,
    description: country?.seo.defaultDescription,
  };
}

export default function CountryHomePage({
  params,
}: {
  params: { country: string };
}) {
  const country = getCountry(params.country);
  const content = getHomeContent(params.country);

  // Belt-and-suspenders: the layout already guards against invalid
  // country codes, but this page shouldn't trust that alone - any
  // stray request (like a missing favicon falling through to this
  // dynamic route) should get a clean 404, not a crash.
  if (!country || !content) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wide text-sage-600">
            {content.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-charcoal md:text-5xl">
            {content.hero.title}
          </h1>
          <p className="mt-5 max-w-lg text-base text-charcoal-soft">
            {content.hero.subtitle}
          </p>
          <div className="mt-8">
            <Button href={`/${country.code}/evaluacion`}>
              {content.hero.cta}
            </Button>
          </div>
        </Container>
      </section>

      {/* Understanding the causes - functional-medicine framing, not genetics-only */}
      <section className="bg-stone-100 py-20">
        <Container>
          <SectionHeading
            eyebrow={content.causes.eyebrow}
            title={content.causes.title}
          />
          <p className="mt-4 max-w-2xl text-sm text-charcoal-soft md:text-base">
            {content.causes.intro}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.causes.items.map((item) => (
              <div
                key={item.title}
                className="rounded-card border border-charcoal/10 bg-stone-50 p-6"
              >
                <i
                  className={`ti ${item.icon} text-2xl text-sage-500`}
                  aria-hidden="true"
                />
                <p className="mt-4 font-medium text-charcoal">{item.title}</p>
                <p className="mt-2 text-sm text-charcoal-soft">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow={content.process.eyebrow}
            title={content.process.title}
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {content.process.steps.map((step, i) => (
              <div key={step.title}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-100 text-sm font-medium text-sage-700">
                  {i + 1}
                </div>
                <p className="mt-4 font-medium text-charcoal">{step.title}</p>
                <p className="mt-2 text-sm text-charcoal-soft">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Clinical results - real TrichoScale data plus manufacturer trial data, each sourced separately */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow={content.results.eyebrow}
            title={content.results.title}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {content.results.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-card border border-charcoal/10 bg-stone-100 p-8"
              >
                <p className="font-display text-5xl font-medium text-sage-600">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm text-charcoal-soft">{stat.label}</p>
                <p className="mt-2 text-xs text-charcoal-soft/70">
                  {stat.source}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-card border border-charcoal/10">
            <Image
              src={content.results.reportImage.src}
              alt={content.results.reportImage.alt}
              width={1200}
              height={520}
              className="w-full object-cover"
            />
          </div>
          <p className="mt-3 text-xs text-charcoal-soft">
            {content.results.reportImage.caption}
          </p>

          <p className="mt-6 text-xs text-charcoal-soft/70">
            {content.results.disclaimer}
          </p>
        </Container>
      </section>

      {/* Pricing - Proxium (men) / Proxil (women), one-time price each */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow={content.pricing.eyebrow}
            title={content.pricing.title}
          />
          <p className="mt-4 max-w-xl text-sm text-charcoal-soft md:text-base">
            {content.pricing.subtitle}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {content.pricing.products.map((product) => (
              <div
                key={product.name}
                className="rounded-card border border-charcoal/10 bg-stone-100 p-8"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-sage-600">
                  {product.audience}
                </p>
                <h3 className="mt-2 font-display text-2xl font-medium text-charcoal">
                  {product.name}
                </h3>
                <p className="mt-4 text-sm text-charcoal-soft">
                  {product.description}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-medium text-charcoal">
                    {product.price}
                  </span>
                  <span className="text-xs text-charcoal-soft">
                    {product.priceNote}
                  </span>
                </div>
                <Button
                  href={`/${country.code}/evaluacion`}
                  className="mt-6 w-full"
                >
                  Comenzar evaluación
                </Button>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-charcoal-soft/70">
            {content.pricing.disclaimer}
          </p>
        </Container>
      </section>

      {/* Trust / credibility */}
      <section className="bg-stone-100 py-20">
        <Container className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <SectionHeading
              eyebrow={content.trust.eyebrow}
              title={content.trust.title}
            />
            <p className="mt-4 max-w-md text-sm text-charcoal-soft md:text-base">
              {content.trust.body}
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {content.trust.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-charcoal">
                <i
                  className="ti ti-check mt-0.5 text-sage-600"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <Container>
          <h2 className="mx-auto max-w-lg font-display text-2xl font-medium text-charcoal md:text-3xl">
            {content.finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-charcoal-soft">
            {content.finalCta.body}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href={`/${country.code}/evaluacion`}>
              {content.finalCta.cta}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
