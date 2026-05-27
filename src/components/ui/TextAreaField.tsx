import { cn } from "../../utils/cn";

type TextAreaFieldProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  rows?: number;
};

export function TextAreaField({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  rows = 5,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      <textarea
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        className={cn(
          "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition outline-none",
          "resize-none placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100",
          error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200",
        )}
        id={id}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
      {error ? (
        <span className="mt-2 block text-sm text-red-600" id={`${id}-error`}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
