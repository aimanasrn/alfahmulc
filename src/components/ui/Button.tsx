import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-white shadow-glow hover:bg-brand-700",
  secondary:
    "border border-slate-200 bg-white text-slate-900 hover:border-brand-200 hover:bg-brand-50",
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
