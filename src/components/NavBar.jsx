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
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
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

          <div className="lg:hidden">
            <MobileSidebar />
          </div>
        </div>
      </div>

      <div className="border-y border-[var(--color-border)] bg-[var(--color-surface-soft)]">
        <div className="mx-auto w-full max-w-7xl px-4 py-2.5 lg:px-6">
          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 flex-wrap items-center gap-1 pb-1 text-xs text-slate-700 sm:text-sm"
          >
            {breadcrumbTrail.map((crumb, index) => (
              <span
                key={`${crumb}-${index}`}
                className="inline-flex items-center gap-1.5"
              >
                {index > 0 ? (
                  <ChevronRight size={13} className="text-slate-400" aria-hidden="true" />
                ) : null}
                <span className="rounded-sm border-b border-dotted border-[var(--color-border-strong)] px-0.5 text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-primary)]">
                  {crumb}
                </span>
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-b border-[var(--color-border)] bg-white/95">
        <div className="mx-auto hidden w-full max-w-7xl px-4 lg:block lg:px-6">
          <div
            className="relative"
            onMouseEnter={cancelCloseTimer}
            onMouseLeave={closeDropdownWithDelay}
            onFocusCapture={cancelCloseTimer}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                closeDropdownNow();
              }
            }}
          >
            <div
              className="flex items-center justify-center gap-8 py-3"
              role="navigation"
              aria-label="Department sections"
            >
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
                        "group relative inline-flex items-center gap-1.5 pb-2 text-base font-semibold text-slate-900 transition-colors duration-150",
                        "focus:outline-none focus-visible:text-[#0f2f66]",
                        isOpen || isGroupActive
                          ? "text-[var(--color-primary-strong)]"
                          : "hover:text-[var(--color-primary)]",
                      )}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                    >
                      <span>
                        {DESKTOP_GROUP_LABELS[group.id] ?? group.title}
                      </span>
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={clsx(
                          "mt-0.5 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                      />
                      <span
                        className={clsx(
                          "pointer-events-none absolute inset-x-0 -bottom-px h-0.5 bg-[var(--color-accent)] transition-opacity duration-150",
                          isOpen || isGroupActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100",
                        )}
                      />
                    </button>

                    <div
                      className={clsx(
                        "absolute left-0 top-full z-50 w-76 pt-2 transition-all duration-180",
                        isOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1 opacity-0",
                      )}
                    >
                      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-2 shadow-[0_18px_38px_rgba(13,40,69,0.14)]">
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
                                  "block rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-150",
                                  isActiveItem
                                    ? "bg-[var(--color-primary-soft)] text-[var(--color-primary-strong)]"
                                    : "text-[var(--color-text)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)]",
                                )}
                              >
                                {item.label}
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
        </div>
      </div>
    </header>
  );
}
