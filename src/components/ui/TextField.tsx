interface TextFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: "text" | "tel" | "email";
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function TextField({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  required = true,
}: TextFieldProps) {
  return (
    <label htmlFor={name} className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-charcoal">{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-card border border-charcoal/15 bg-stone-50 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal-soft/50 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200"
      />
    </label>
  );
}
