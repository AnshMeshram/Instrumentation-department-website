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
      className="overflow-hidden rounded-2xl border border-[#d7e2f0] bg-white/95 shadow-[0_8px_24px_rgba(15,47,102,0.08)]"
    >
      <div className="border-b border-[#e5e7eb] bg-white px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#284b7a]">
          Department Sections
        </p>
      </div>

      <div className="space-y-2 p-3">
        {NAV_GROUPS.map((group) => {
          const isOpen = mobile ? openGroupId === group.id : true;

          return (
            <section
              key={group.id}
              className="rounded-xl border border-[#e1e8f3] bg-white"
            >
              <h2>
                <button
                  type="button"
                  className={clsx(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.08em]",
                    "bg-[#f3f4f6] text-[#24456f]",
                    mobile && "hover:bg-[#edf3fc]",
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
                        "transition-transform",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              </h2>

              <div
                id={`${group.id}-links`}
                className={clsx("space-y-1.5 px-2 pb-2", !isOpen && "hidden")}
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
                        "block rounded-lg border px-3 py-2 text-sm transition-colors",
                        active
                          ? "border-[#bfd2ec] bg-[#edf4ff] font-semibold text-[#0f2f66]"
                          : "border-transparent text-slate-700 hover:border-[#e5e7eb] hover:bg-[#f9fafb]",
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
