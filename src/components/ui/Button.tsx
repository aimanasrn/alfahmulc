import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "button button--primary",
  secondary: "button button--secondary",
  ghost: "button button--ghost",
};

export function buttonVariants(variant: ButtonVariant = "primary", className?: string) {
  return cn(variantClasses[variant], className);
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
