import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-[26px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-5", className)} {...props} />;
}
