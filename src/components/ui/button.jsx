import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_16px_32px_-16px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 hover:bg-[var(--color-primary-strong)] hover:shadow-[0_22px_40px_-16px_rgba(0,0,0,0.5)]",
        outline:
          "border border-[var(--color-border)] bg-white text-[var(--color-primary)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-soft)]",
        soft: "border border-[var(--color-border)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] hover:bg-[#e4effa]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-11 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
