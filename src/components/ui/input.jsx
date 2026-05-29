import { cn } from "../../lib/utils";

export function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/70 px-4 text-sm text-[var(--color-text)] transition placeholder:text-[var(--color-text-soft)]/60 focus-visible:outline-none focus-visible:border-[var(--color-accent)] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/15",
        className,
      )}
      {...props}
    />
  );
}
