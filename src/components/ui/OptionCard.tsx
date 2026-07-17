interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ label, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full rounded-card border px-5 py-4 text-left text-sm transition-colors ${
        selected
          ? "border-sage-400 bg-sage-50 font-medium text-sage-700"
          : "border-charcoal/15 bg-stone-50 text-charcoal hover:border-charcoal/30"
      }`}
    >
      {label}
    </button>
  );
}
