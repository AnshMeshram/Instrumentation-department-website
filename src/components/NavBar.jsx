import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import * as Icons from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import { NAV_GROUPS } from "../config/navigation";

const BREADCRUMB_PREFIX = [
  "Home",
  "Academics",
  "Schools",
  "School of Engineering and Technology",
  "Department of Instrumentation and Control Engineering",
];

const FEATURED_CARDS = {
  "about-department": {
    title: "Meet the Faculty",
    description: "Our world-class faculty drive innovation and teach the next generation of control engineers.",
    cta: "Explore Faculty Profiles →",
    path: "/faculty"
  },
  "academics": {
    title: "Curriculum & Syllabi",
    description: "Browse detailed course structures and syllabus files for both B.Tech and M.Tech programs.",
    cta: "View Curriculum →",
    path: "/curriculum"
  },
  "students-career": {
    title: "Careers & Placements",
    description: "See our placement ratios, recruitment statistics, average packages, and top corporate partners.",
    cta: "View Placement Records →",
    path: "/internships-and-placements"
  },
  "administration-governance": {
    title: "Board of Studies Minutes",
    description: "Explore the constitution of our Board of Studies and view official minutes of meetings.",
    cta: "Access Minutes →",
    path: "/bos-committee-minutes"
  },
  "notices-updates": {
    title: "Latest Bulletins",
    description: "Read official department notices, circulars, and the latest annual progress reports.",
    cta: "View Circulars & Notices →",
    path: "/circulars-reports"
  }
};

export default function NavBar() {
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openDropdown = (groupKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenGroup(groupKey);
  };

  const closeDropdownWithDelay = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenGroup(null);
      closeTimerRef.current = null;
    }, 150);
  };

  const cancelCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const crumbs = [...BREADCRUMB_PREFIX];
    
    // Find active label in menus
    let foundLabel = null;
    NAV_GROUPS.forEach(group => {
      const match = group.items.find(item => item.path === path);
      if (match) foundLabel = match.label;
    });

    if (foundLabel) {
      crumbs.push(foundLabel);
    } else if (path === "/about") {
      crumbs.push("About");
    } else if (path === "/contact") {
      crumbs.push("Contact Us");
    }
    return crumbs;
  };

  const isMenuGroupActive = (items) => {
    return items.some(item => {
      if (item.external) return false;
      const pathBase = item.path.split("#")[0];
      return location.pathname === pathBase || (pathBase !== "/" && location.pathname.startsWith(pathBase));
    });
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/85 backdrop-blur-md border-[var(--color-border)] shadow-md"
          : "bg-white border-transparent"
      )}
    >
      {/* Top Banner and Logo Section */}
      <div className="bg-[var(--color-primary)] text-white relative">
        <div className="page-shell flex items-center justify-between gap-4 py-3">
          <Link
            to="/about"
            onClick={() => setOpenGroup(null)}
            className="flex min-w-0 items-center gap-3 rounded-lg pr-2 transition hover:opacity-90"
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

          {/* Desktop Nav Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-teal-600 active:scale-[0.97] ring-1 ring-white/10"
            >
              <Icons.PhoneCall size={12} />
              Contact Us
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition"
              aria-label="Open navigation menu"
            >
              <Icons.Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Desktop Navbar Bar */}
      <div className="hidden lg:block bg-white border-b border-[var(--color-border)] shadow-sm">
        <div className="page-shell flex items-center justify-center py-0.5 relative">
          <nav
            className="flex items-center gap-8"
            onMouseLeave={closeDropdownWithDelay}
            onMouseEnter={cancelCloseTimer}
          >
            {NAV_GROUPS.map((group) => {
              const key = group.id;
              const isActive = isMenuGroupActive(group.items);
              const isOpen = openGroup === key;
              const featured = FEATURED_CARDS[key] || {
                title: "Explore More",
                description: "Find out more about the Department of Instrumentation & Control Engineering.",
                cta: "Explore Now →",
                path: "/about"
              };

              return (
                <div key={key} className="relative py-3.5">
                  <button
                    onMouseEnter={() => openDropdown(key)}
                    onClick={() => setOpenGroup(isOpen ? null : key)}
                    className={clsx(
                      "flex items-center gap-1 text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition duration-150 relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-md px-1",
                      (isActive || isOpen) && "text-[var(--color-primary)]"
                    )}
                  >
                    <span>{group.title}</span>
                    <Icons.ChevronDown
                      size={14}
                      className={clsx(
                        "mt-0.5 transition-transform duration-200 text-[var(--color-text-soft)]",
                        isOpen && "rotate-180 text-[var(--color-primary)]"
                      )}
                    />
                    
                    {/* Sliding underline indicator */}
                    {(isActive || isOpen) && (
                      <Motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* Mega Dropdown Panel */}
                  <AnimatePresence>
                    {isOpen && (
                      <Motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-[720px] pt-2"
                        onMouseEnter={cancelCloseTimer}
                        onMouseLeave={closeDropdownWithDelay}
                      >
                        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-xl grid grid-cols-12 p-4 gap-4">
                          {/* Left Column - Nav Links (icon + label + description) */}
                          <div className="col-span-8 bg-white space-y-2">
                            <h4 className="text-2xs font-bold uppercase tracking-[0.15em] text-[var(--color-accent)] border-b border-[var(--color-border)] pb-2 mb-2">
                              {group.title}
                            </h4>
                            <div className="grid grid-cols-1 gap-1">
                              {group.items.map((item) => {
                                const IconComponent = Icons[item.icon] || Icons.HelpCircle;
                                const isItemActive = location.pathname === item.path.split("#")[0];

                                return (
                                  <Link
                                    key={item.label}
                                    to={item.path}
                                    onClick={() => setOpenGroup(null)}
                                    className={clsx(
                                      "flex items-start gap-3 p-2.5 transition-all duration-200 group hover:translate-x-[2px]",
                                      isItemActive
                                        ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-semibold rounded-xl"
                                        : "hover:bg-[var(--color-surface-soft)] text-[var(--color-text)] hover:rounded-xl"
                                    )}
                                  >
                                    <div
                                      className={clsx(
                                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg p-1.5 transition-colors",
                                        isItemActive
                                          ? "bg-white text-[var(--color-primary)] shadow-sm"
                                          : "bg-[var(--color-primary-soft)] text-[var(--color-accent)] group-hover:bg-white"
                                      )}
                                    >
                                      <IconComponent size={16} />
                                    </div>
                                    <div className="space-y-0.5">
                                      <div className="flex items-center gap-1 text-sm font-semibold">
                                        <span>{item.label}</span>
                                        {item.external && <Icons.ExternalLink size={10} className="opacity-60" />}
                                      </div>
                                      <p className="text-xs text-[var(--color-text-soft)] line-clamp-1 leading-normal font-normal">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          {/* Right Column - Featured Highlight Card */}
                          <div className="col-span-4 bg-[var(--color-primary)] text-white rounded-xl p-5 flex flex-col justify-between">
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">
                                Featured
                              </h4>
                              <h5 className="text-sm font-bold text-white leading-tight">
                                {featured.title}
                              </h5>
                              <p className="text-[11px] text-white/80 leading-relaxed font-normal">
                                {featured.description}
                              </p>
                            </div>
                            <Link
                              to={featured.path}
                              onClick={() => setOpenGroup(null)}
                              className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[var(--color-accent)] hover:text-white transition-colors"
                            >
                              <span>{featured.cta}</span>
                              <Icons.ChevronRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-[var(--color-border)] shadow-inner">
        <div className="page-shell py-2">
          <nav aria-label="Breadcrumb" className="overflow-x-auto no-scrollbar">
            <ol className="flex items-center gap-2 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.1em] text-[var(--color-text-soft)]">
              {getBreadcrumbs().map((crumb, index, arr) => {
                const isLast = index === arr.length - 1;
                return (
                  <li key={`${crumb}-${index}`} className="flex items-center gap-2">
                    {index > 0 && (
                      <Icons.ChevronRight
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
                          : "hover:text-[var(--color-primary)] cursor-default opacity-60"
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

      {/* Mobile Drawer menu */}
      <MobileSidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </header>
  );
}
