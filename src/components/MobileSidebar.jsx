import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="rounded-md border border-white/40 bg-white/10 p-2 text-white transition hover:bg-white/20"
          aria-label="Open department menu"
        >
          <Menu size={20} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />

        <Dialog.Content className="fixed left-0 top-0 z-50 h-full w-84 max-w-[90vw] overflow-y-auto border-r border-[var(--color-border)] bg-white p-4 shadow-xl">
          <Dialog.Title className="text-sm font-semibold text-[var(--color-heading)]">
            Department Navigation
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-xs text-[var(--color-text-soft)]">
            Browse section-wise links for the department website.
          </Dialog.Description>

          <Dialog.Close asChild>
            <button
              className="absolute right-3 top-3 rounded-md p-1 text-[var(--color-text-soft)] hover:bg-[var(--color-surface-soft)]"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </Dialog.Close>

          <div className="mt-4">
            <Sidebar mobile onNavigate={() => setOpen(false)} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
