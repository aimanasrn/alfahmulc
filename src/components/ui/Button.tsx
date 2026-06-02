import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 text-white shadow-glow hover:from-brand-600 hover:via-brand-700 hover:to-brand-800",
  secondary:
    "border border-accent-100 bg-white text-slate-900 hover:border-accent-200 hover:bg-accent-50",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

export function buttonVariants(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
    variantClasses[variant],
    className,
  );
}

export function Button({
  children,
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants(variant, className)} type={type} {...props}>
      {children}
    </button>
  );
}
