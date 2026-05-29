import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(function TabsList(
  { className, ...props },
  ref,
) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-auto w-full flex-wrap gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/70 p-2 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
});

const TabsTrigger = React.forwardRef(function TabsTrigger(
  { className, ...props },
  ref,
) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-[var(--color-text-soft)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/20 data-[state=active]:bg-white data-[state=active]:text-[var(--color-primary)] data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
});

const TabsContent = React.forwardRef(function TabsContent(
  { className, ...props },
  ref,
) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/20",
        className,
      )}
      {...props}
    />
  );
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
