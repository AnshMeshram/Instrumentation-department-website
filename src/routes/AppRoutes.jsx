import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";

const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Consultancy = lazy(() => import("../pages/Consultancy"));
const Faculty = lazy(() => import("../pages/Faculty"));
const FacultyProfile = lazy(() => import("../pages/FacultyProfile"));
const FDPs = lazy(() => import("../pages/FDPs"));
const Patents = lazy(() => import("../pages/Patents"));
const Publications = lazy(() => import("../pages/Publications"));
const ResearchPapers = lazy(() => import("../pages/ResearchPapers"));
const TimeTable = lazy(() => import("../pages/TimeTable"));
const VirtualLab = lazy(() => import("../pages/VirtualLab"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Phase 3 page imports
const Laboratories = lazy(() => import("../pages/Laboratories"));
const Curriculum = lazy(() => import("../pages/Curriculum"));
const Placements = lazy(() => import("../pages/Placements"));
const Circulars = lazy(() => import("../pages/Circulars"));
const BOSCommittee = lazy(() => import("../pages/BOSCommittee"));
const DeptCommittees = lazy(() => import("../pages/DeptCommittees"));

function PageLoader() {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white/90 px-6 py-16 text-center shadow-sm">
      <p className="text-sm font-medium text-[var(--color-text-soft)]">
        Loading page...
      </p>
    </div>
  );
}

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/about" replace />} />

          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/faculty" element={<PageTransition><Faculty /></PageTransition>} />
          <Route path="/faculty/:id" element={<PageTransition><FacultyProfile /></PageTransition>} />
          <Route path="/virtual-lab" element={<PageTransition><VirtualLab /></PageTransition>} />
          <Route path="/virtual-labs" element={<Navigate to="/virtual-lab" replace />} />

          {/* Fully implemented pages from Phase 3 */}
          <Route path="/laboratories" element={<PageTransition><Laboratories /></PageTransition>} />
          <Route path="/curriculum" element={<PageTransition><Curriculum /></PageTransition>} />
          <Route path="/internships-and-placements" element={<PageTransition><Placements /></PageTransition>} />
          
          <Route path="/bos-committee-minutes" element={<PageTransition><BOSCommittee /></PageTransition>} />
          <Route path="/department-committees" element={<PageTransition><DeptCommittees /></PageTransition>} />
          <Route path="/circulars-reports" element={<PageTransition><Circulars /></PageTransition>} />

          <Route path="/research-projects" element={<PageTransition><ResearchPapers /></PageTransition>} />
          <Route
            path="/research-papers"
            element={<Navigate to="/publications" replace />}
          />
          <Route path="/publications" element={<PageTransition><Publications /></PageTransition>} />
          <Route path="/patents" element={<PageTransition><Patents /></PageTransition>} />
          <Route path="/time-table" element={<PageTransition><TimeTable /></PageTransition>} />
          <Route path="/sttps-fdps" element={<PageTransition><FDPs /></PageTransition>} />
          <Route path="/consultancy-and-training" element={<PageTransition><Consultancy /></PageTransition>} />

          <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
          <Route path="/labs" element={<Navigate to="/laboratories" replace />} />
          <Route path="/projects" element={<Navigate to="/research-projects" replace />} />
          <Route path="/papers" element={<Navigate to="/research-papers" replace />} />
          <Route path="/publication" element={<Navigate to="/publications" replace />} />
          <Route path="/timetable" element={<Navigate to="/time-table" replace />} />
          <Route path="/sttp" element={<Navigate to="/sttps-fdps" replace />} />
          <Route path="/fdp-attended" element={<Navigate to="/sttps-fdps" replace />} />
          <Route path="/fdp-conducted" element={<Navigate to="/sttps-fdps" replace />} />
          <Route path="/placements" element={<Navigate to="/internships-and-placements" replace />} />
          <Route path="/consultancy" element={<Navigate to="/consultancy-and-training" replace />} />
          <Route path="/bos" element={<Navigate to="/bos-committee-minutes" replace />} />
          <Route path="/committees" element={<Navigate to="/department-committees" replace />} />
          <Route path="/circulars" element={<Navigate to="/circulars-reports" replace />} />

          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
