import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "border-slate-200 bg-slate-50 text-slate-700",
        granted: "border-emerald-200 bg-emerald-50 text-emerald-700",
        published: "border-sky-200 bg-sky-50 text-sky-700",
        applied: "border-amber-200 bg-amber-50 text-amber-700",
        type: "border-[#cfe0f4] bg-[#edf4fd] text-[#1a3f70]",
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
