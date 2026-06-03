import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import MobileSidebar from "./MobileSidebar";
import {
  NAV_GROUPS,
  NAV_ITEM_BY_PATH,
  getActiveGroup,
} from "../config/navigation";

const BREADCRUMB_PREFIX = [
  "Home",
  "Academics",
  "Schools",
  "School of Engineering and Technology",
  "Department of Instrumentation and Control Engineering",
];

const DESKTOP_GROUP_LABELS = {
  "about-department": "About us",
  academics: "Academics",
  "students-career": "Career",
  "administration-governance": "Committees",
  "notices-updates": "Notices",
};

export default function NavBar() {
  const location = useLocation();
  const activeItem = NAV_ITEM_BY_PATH[location.pathname];
  const activeGroup = getActiveGroup(location.pathname);
  const [openGroupId, setOpenGroupId] = useState(null);
  const closeTimerRef = useRef(null);

  const breadcrumbTrail = activeItem
    ? [...BREADCRUMB_PREFIX, activeItem.label]
    : BREADCRUMB_PREFIX;

  const openDropdown = (groupId) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenGroupId(groupId);
  };

  const closeDropdownWithDelay = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenGroupId(null);
      closeTimerRef.current = null;
    }, 120);
  };

  const cancelCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const closeDropdownNow = () => {
    cancelCloseTimer();
    setOpenGroupId(null);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white shadow-[0_8px_24px_rgba(13,40,69,0.08)]">
      <div className="border-b border-white/10 bg-[var(--color-primary)] text-white">
        <div className="page-shell flex items-center justify-between gap-4 py-3">
          <Link
            to="/about"
            className="flex min-w-0 items-center gap-3 rounded-lg pr-2 transition hover:bg-white/8"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white p-0.5 shadow-sm">
              <img
                src="/college-logo/college_logo.jpg"
                alt="COEP Technological University logo"
                className="h-full w-full rounded-sm object-contain"
                loading="eager"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-base leading-tight font-bold font-[var(--font-serif)] sm:text-[1.35rem]">
                COEP Technological University
              </p>
              <p className="truncate text-xs text-white/80 sm:text-[0.95rem]">
                Department of Instrumentation and Control Engineering
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div
            className="hidden lg:flex items-center gap-6 relative"
            onMouseEnter={cancelCloseTimer}
            onMouseLeave={closeDropdownWithDelay}
            onFocusCapture={cancelCloseTimer}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                closeDropdownNow();
              }
            }}
          >
            <div className="flex items-center gap-6" role="navigation" aria-label="Primary navigation">
              {NAV_GROUPS.map((group) => {
                const isGroupActive = activeGroup?.id === group.id;
                const isOpen = openGroupId === group.id;

                return (
                  <div key={group.id} className="relative">
                    <button
                      type="button"
                      onMouseEnter={() => openDropdown(group.id)}
                      onFocus={() => openDropdown(group.id)}
                      onClick={() =>
                        setOpenGroupId((prev) =>
                          prev === group.id ? null : group.id,
                        )
                      }
                      className={clsx(
                        "group relative inline-flex items-center gap-1.5 pb-1 text-sm font-semibold text-white/80 transition-colors duration-150 cursor-pointer",
                        "focus:outline-none focus-visible:text-white",
                        isOpen || isGroupActive
                          ? "text-white"
                          : "hover:text-[var(--color-accent)]",
                      )}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                    >
                      <span>
                        {DESKTOP_GROUP_LABELS[group.id] ?? group.title}
                      </span>
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className={clsx(
                          "mt-0.5 transition-transform duration-200 text-white/60",
                          isOpen && "rotate-180",
                        )}
                      />
                      <span
                        className={clsx(
                          "pointer-events-none absolute inset-x-0 -bottom-[12px] h-0.5 bg-[var(--color-accent)] transition-opacity duration-150",
                          isOpen || isGroupActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100",
                        )}
                      />
                    </button>

                    <div
                      className={clsx(
                        "absolute top-full z-50 w-72 pt-3 transition-all duration-180",
                        group.id === "about-department" || group.id === "academics"
                          ? "right-auto left-0"
                          : group.id === "students-career"
                          ? "left-1/2 -translate-x-1/2"
                          : "left-auto right-0",
                        isOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1 opacity-0",
                      )}
                    >
                      {/* Decorative arrow/caret */}
                      <div
                        className={clsx(
                          "absolute top-[6px] h-3 w-3 rotate-45 border-t border-l border-[var(--color-border)] bg-white shadow-[-4px_-4px_8px_rgba(0,0,0,0.02)] transition-colors",
                          group.id === "about-department" || group.id === "academics"
                            ? "left-8"
                            : group.id === "students-career"
                            ? "left-1/2 -translate-x-1/2"
                            : "right-8",
                        )}
                      />

                      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white/95 backdrop-blur-md p-2.5 shadow-[0_18px_38px_rgba(13,40,69,0.12)] text-[var(--color-text)]">
                        <div className="mb-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-accent)] opacity-80 border-b border-[var(--color-border)] pb-1.5">
                          {DESKTOP_GROUP_LABELS[group.id] ?? group.title}
                        </div>
                        <div className="space-y-1">
                          {group.items.map((item) => {
                            const isActiveItem =
                              location.pathname === item.path ||
                              location.pathname.startsWith(`${item.path}/`);

                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                role="menuitem"
                                onClick={closeDropdownNow}
                                className={clsx(
                                  "group/item flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150",
                                  isActiveItem
                                    ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-bold shadow-sm"
                                    : "text-[var(--color-text)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)] hover:translate-x-0.5",
                                )}
                              >
                                <span>{item.label}</span>
                                <ChevronRight
                                  size={14}
                                  className={clsx(
                                    "transition-all duration-150 opacity-0 -translate-x-1",
                                    isActiveItem
                                      ? "opacity-100 translate-x-0 text-[var(--color-primary)]"
                                      : "group-hover/item:opacity-100 group-hover/item:translate-x-0 text-[var(--color-primary)]/70",
                                  )}
                                />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:hidden">
            <MobileSidebar />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-inner border-b border-[var(--color-border)]">
        <div className="page-shell py-2">
          <nav aria-label="Breadcrumb" className="overflow-x-auto no-scrollbar">
            <ol className="flex items-center gap-2 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.1em] text-[var(--color-text-soft)]">
              {breadcrumbTrail.map((crumb, index) => {
                const isLast = index === breadcrumbTrail.length - 1;
                return (
                  <li
                    key={`${crumb}-${index}`}
                    className="flex items-center gap-2"
                  >
                    {index > 0 && (
                      <ChevronRight
                        size={10}
                        className="text-[var(--color-border-strong)] opacity-50"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={clsx(
                        "transition-colors",
                        isLast
                          ? "text-[var(--color-accent)] font-black"
                          : "hover:text-[var(--color-primary)] cursor-default opacity-60",
                      )}
                    >
                      {crumb}
                    </span>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </header>
  );
}
