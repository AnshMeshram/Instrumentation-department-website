import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronDown, PhoneCall } from "lucide-react";
import clsx from "clsx";
import * as Icons from "lucide-react";
import { NAV_GROUPS } from "../config/navigation";

export default function MobileSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState(null);

  const toggleGroup = (groupId) => {
    setOpenGroup(prev => prev === groupId ? null : groupId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={(val) => { if (!val) onClose(); }}>
          <Dialog.Portal>
            {/* Backdrop Overlay */}
            <Dialog.Overlay asChild>
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black"
              />
            </Dialog.Overlay>

            {/* Sliding Content */}
            <Dialog.Content asChild>
              <Motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", bounce: 0.05, duration: 0.35 }}
                className="fixed top-0 right-0 bottom-0 z-50 flex h-full w-[280px] max-w-[80vw] flex-col bg-white border-l border-[var(--color-border)] shadow-2xl overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <img
                      src="/college-logo/college_logo.jpg"
                      alt="COEP Logo"
                      className="h-8 w-8 object-contain"
                    />
                    <span className="text-xs font-bold text-[var(--color-primary)] font-[var(--font-serif)]">
                      COEP Tech
                    </span>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      onClick={onClose}
                      className="rounded-lg p-2 text-[var(--color-text-soft)] hover:bg-slate-200 transition-colors"
                      aria-label="Close menu"
                    >
                      <X size={20} />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {NAV_GROUPS.map((group) => {
                    const isExpanded = openGroup === group.id;
                    const isGroupActive = group.items.some(
                      (item) => location.pathname === item.path.split("#")[0]
                    );

                    return (
                      <div key={group.id} className="border-b border-[var(--color-border)]/50 pb-2">
                        <button
                          onClick={() => toggleGroup(group.id)}
                          className={clsx(
                            "flex w-full items-center justify-between py-2 text-sm font-semibold transition text-left cursor-pointer",
                            isGroupActive
                              ? "text-[var(--color-primary)]"
                              : "text-[var(--color-text)]"
                          )}
                        >
                          <span>{group.title}</span>
                          <Motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-[var(--color-text-soft)]"
                          >
                            <ChevronDown size={16} />
                          </Motion.span>
                        </button>

                        {/* Accordion Menu Links */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <Motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden pl-2 pt-1"
                            >
                              <div className="space-y-1 border-l-2 border-[var(--color-border)] pl-3 py-1">
                                {group.items.map((item) => {
                                  const IconComponent = Icons[item.icon] || Icons.HelpCircle;
                                  const isItemActive = location.pathname === item.path.split("#")[0];

                                  return (
                                    <Link
                                      key={item.label}
                                      to={item.path}
                                      onClick={onClose}
                                      className={clsx(
                                        "flex items-center gap-2.5 rounded-lg py-2 px-2 text-xs transition-colors",
                                        isItemActive
                                          ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-bold"
                                          : "text-[var(--color-text-soft)] hover:text-[var(--color-primary)] hover:bg-slate-50"
                                      )}
                                    >
                                      <IconComponent size={14} className="shrink-0" />
                                      <span className="flex-1">{item.label}</span>
                                      {item.external && <Icons.ExternalLink size={10} />}
                                    </Link>
                                  );
                                })}
                              </div>
                            </Motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Contact Footer */}
                <div className="border-t border-[var(--color-border)] p-4 bg-slate-50">
                  <Link
                    to="/contact"
                    onClick={onClose}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] py-3 text-xs font-bold text-white shadow-sm hover:bg-[var(--color-primary-strong)] transition-colors"
                  >
                    <PhoneCall size={14} />
                    Contact Us
                  </Link>
                </div>
              </Motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
}
