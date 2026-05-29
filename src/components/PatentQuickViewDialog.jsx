import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Badge } from "./ui/badge";

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const statusStyles = {
  Applied: "applied",
  Published: "published",
  Granted: "granted",
};

export default function PatentQuickViewDialog({
  patent,
  trigger,
  open,
  onOpenChange,
}) {
  const badgeStyle = statusStyles[patent.status] || "default";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,42rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-0 shadow-2xl outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95">
          <div className="relative bg-[var(--color-surface-soft)] p-6 md:p-8">
            <Dialog.Close
              className="absolute right-5 top-5 rounded-full bg-white p-2 text-slate-500 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              aria-label="Close patent quick view"
            >
              <X size={20} aria-hidden="true" />
            </Dialog.Close>

            <div className="flex flex-wrap gap-2 pr-12">
              <Badge variant={badgeStyle}>{patent.status}</Badge>
              <Badge className="bg-white">{patent.type}</Badge>
            </div>

            <Dialog.Title className="mt-4 pr-8 font-[var(--font-serif)] text-2xl font-black leading-tight text-[var(--color-heading)] md:text-3xl">
              {patent.title}
            </Dialog.Title>
          </div>

          <div className="max-h-[68vh] overflow-y-auto p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-soft)]">
                  Inventors
                </h4>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--color-text)]">
                  {patent.facultyStudents.join(", ")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[var(--color-surface-soft)] p-4">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-soft)]">
                    Application
                  </h4>
                  <p className="mt-1 break-words text-sm font-black text-[var(--color-heading)]">
                    {patent.applicationNumber || "Pending"}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-soft)]">
                    Filed
                  </h4>
                  <p className="mt-1 text-sm font-black text-[var(--color-heading)]">
                    {formatDate(patent.applicationDate)}
                  </p>
                </div>
                {patent.grantedDate ? (
                  <div className="col-span-2 mt-2 border-t border-[var(--color-border)] pt-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                      Granted On
                    </h4>
                    <p className="mt-1 text-sm font-black text-[var(--color-heading)]">
                      {formatDate(patent.grantedDate)}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
