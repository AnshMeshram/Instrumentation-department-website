import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] backdrop-blur-sm",
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-text-soft)]",
        granted: "border-emerald-200/70 bg-emerald-50/85 text-emerald-700",
        published: "border-sky-200/70 bg-sky-50/85 text-sky-700",
        applied: "border-amber-200/70 bg-amber-50/85 text-amber-700",
        type: "border-[#d8c28e]/70 bg-[#fff9ed]/90 text-[#8a6415]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({ className, variant, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
