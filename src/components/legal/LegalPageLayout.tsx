import { Container } from "@/components/ui/Container";
import { LegalPageContent } from "@/content/types";

export function LegalPageLayout({ content }: { content: LegalPageContent }) {
  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-2xl">
        {content.draftNotice && (
          <div className="rounded-card border border-terracotta/30 bg-terracotta/5 p-4 text-sm text-charcoal">
            <p className="font-medium text-terracotta-dark">
              Documento en borrador
            </p>
            <p className="mt-1 text-charcoal-soft">{content.draftNotice}</p>
          </div>
        )}

        <h1 className="mt-8 font-display text-3xl font-medium text-charcoal md:text-4xl">
          {content.title}
        </h1>
        <p className="mt-2 text-xs text-charcoal-soft/70">
          Última actualización: {content.lastUpdated}
        </p>

        {content.intro && (
          <p className="mt-6 text-sm leading-relaxed text-charcoal-soft md:text-base">
            {content.intro}
          </p>
        )}

        <div className="mt-10 flex flex-col gap-8">
          {content.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-lg font-medium text-charcoal">
                {section.heading}
              </h2>
              <div className="mt-2 flex flex-col gap-3">
                {section.body.map((item, i) =>
                  typeof item === "string" ? (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-charcoal-soft md:text-base"
                    >
                      {item}
                    </p>
                  ) : (
                    <ul key={i} className="flex flex-col gap-2">
                      {item.list.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm leading-relaxed text-charcoal-soft md:text-base"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
