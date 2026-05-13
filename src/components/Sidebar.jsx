import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { NAV_GROUPS } from "../config/navigation";

function isRouteActive(pathname, path) {
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Sidebar({ mobile = false, onNavigate }) {
  const location = useLocation();

  const [openGroupId, setOpenGroupId] = useState(() => {
    if (!mobile) return null;

    const active = NAV_GROUPS.find((group) =>
      group.items.some((item) => isRouteActive(location.pathname, item.path)),
    );

    return active?.id ?? NAV_GROUPS[0]?.id ?? null;
  });

  useEffect(() => {
    if (!mobile) return;

    const activeGroup = NAV_GROUPS.find((group) =>
      group.items.some((item) => isRouteActive(location.pathname, item.path)),
    );

    if (!activeGroup) return;

    setOpenGroupId(activeGroup.id);
  }, [location.pathname, mobile]);

  const toggleGroup = (groupId) => {
    if (!mobile) return;
    setOpenGroupId((prev) => (prev === groupId ? null : groupId));
  };

  return (
    <nav
      aria-label="Department navigation"
      className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]"
    >
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-soft)] px-5 py-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
          Department Sections
        </p>
      </div>

      <div className="space-y-3 p-4 bg-white">
        {NAV_GROUPS.map((group) => {
          const isOpen = mobile ? openGroupId === group.id : true;

          return (
            <section
              key={group.id}
              className="rounded-xl border border-[var(--color-border)] bg-white overflow-hidden"
            >
              <h2>
                <button
                  type="button"
                  className={clsx(
                    "flex w-full items-center justify-between px-4 py-3 text-left text-xs font-bold uppercase tracking-widest transition-colors",
                    "bg-[var(--color-surface-soft)] text-[var(--color-heading)]",
                    mobile && "hover:bg-[var(--color-border)]",
                  )}
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${group.id}-links`}
                  aria-label={`${isOpen ? "Collapse" : "Expand"} ${group.title}`}
                  disabled={!mobile}
                >
                  {group.title}
                  {mobile ? (
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform text-[var(--color-text-soft)]",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              </h2>

              <div
                id={`${group.id}-links`}
                className={clsx("space-y-1 p-2", !isOpen && "hidden")}
                role="group"
                aria-label={group.title}
              >
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => onNavigate?.()}
                    className={({ isActive }) => {
                      const active =
                        isActive || isRouteActive(location.pathname, item.path);

                      return clsx(
                        "block rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        active
                          ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-semibold"
                          : "text-[var(--color-text)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)]",
                      );
                    }}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </nav>
  );
}
