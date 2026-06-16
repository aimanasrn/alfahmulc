type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleId?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  titleId,
}: SectionTitleProps) {
  return (
    <div className={align === "left" ? "section-title section-title--left" : "section-title"}>
      {eyebrow ? <p className="section-title__eyebrow">{eyebrow}</p> : null}
      <h2 id={titleId}>{title}</h2>
      {description ? <p className="section-title__description">{description}</p> : null}
    </div>
  );
}
