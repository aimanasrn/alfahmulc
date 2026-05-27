import { cn } from "../../utils/cn";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}
