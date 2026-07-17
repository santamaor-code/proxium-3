import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  // Reserved for the single most important action on a screen -
  // e.g. "Comenzar evaluación", "Agendar consulta". Do not use for
  // secondary or decorative actions; that dilutes its urgency.
  primary:
    "bg-terracotta text-stone-50 hover:bg-terracotta-dark active:scale-[0.98]",
  secondary:
    "bg-transparent text-charcoal border border-charcoal/20 hover:bg-stone-100 active:scale-[0.98]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-card px-6 py-3 text-sm font-medium font-body transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none";

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _v, className: _c, ...buttonProps } =
    props as ButtonAsButton;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
