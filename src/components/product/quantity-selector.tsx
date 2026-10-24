// Rendered only inside client components (cart drawer, purchase panel).
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  size?: "sm" | "md";
  className?: string;
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  label,
  size = "md",
  className,
}: Props) {
  const btn = cn(
    "grid place-items-center text-ink transition-colors hover:bg-ink/5 disabled:pointer-events-none disabled:opacity-30",
    size === "sm" ? "size-8" : "size-11"
  );
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center rounded-full border border-ink/20",
        className
      )}
    >
      <button
        type="button"
        className={cn(btn, "rounded-l-full")}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="size-3.5" strokeWidth={1.5} />
      </button>
      <output
        aria-live="polite"
        className={cn(
          "min-w-8 text-center tabular-nums",
          size === "sm" ? "text-sm" : "text-base"
        )}
      >
        {value}
      </output>
      <button
        type="button"
        className={cn(btn, "rounded-r-full")}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="size-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
