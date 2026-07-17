export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-medium uppercase tracking-wide text-sage-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-xl font-display text-2xl font-medium text-charcoal md:text-3xl">
        {title}
      </h2>
    </div>
  );
}
