import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const About = lazy(() => import("../pages/About"));
const Consultancy = lazy(() => import("../pages/Consultancy"));
const Faculty = lazy(() => import("../pages/Faculty"));
const FacultyProfile = lazy(() => import("../pages/FacultyProfile"));
const FDPs = lazy(() => import("../pages/FDPs"));
const Patents = lazy(() => import("../pages/Patents"));
const PlaceholderPage = lazy(() => import("../pages/PlaceholderPage"));
const Publications = lazy(() => import("../pages/Publications"));
const ResearchPapers = lazy(() => import("../pages/ResearchPapers"));
const TimeTable = lazy(() => import("../pages/TimeTable"));
const VirtualLab = lazy(() => import("../pages/VirtualLab"));

function PageLoader() {
  return (
    <div className="rounded-[2rem] border border-[var(--color-border)] bg-white/90 px-6 py-16 text-center shadow-sm">
      <p className="text-sm font-medium text-[var(--color-text-soft)]">
        Loading page...
      </p>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />

        <Route path="/about" element={<About />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/faculty/:id" element={<FacultyProfile />} />
        <Route path="/virtual-lab" element={<VirtualLab />} />

        <Route
          path="/laboratories"
          element={
            <PlaceholderPage
              title="Laboratories"
              description="Laboratory infrastructure, equipment profiles, and utilization details will be published here."
            />
          }
        />
        <Route path="/research-projects" element={<ResearchPapers />} />
        <Route
          path="/research-papers"
          element={<Navigate to="/publications" replace />}
        />
        <Route path="/publications" element={<Publications />} />
        <Route path="/patents" element={<Patents />} />
        <Route
          path="/curriculum"
          element={
            <PlaceholderPage
              title="Curriculum"
              description="Program curriculum documents and scheme details will be available in this section."
            />
          }
        />
        <Route path="/time-table" element={<TimeTable />} />
        <Route path="/sttps-fdps" element={<FDPs />} />
        <Route
          path="/internships-and-placements"
          element={
            <PlaceholderPage
              title="Internships and Placements"
              description="Internship opportunities, placement statistics, and recruiters will be maintained here."
            />
          }
        />
        <Route path="/consultancy-and-training" element={<Consultancy />} />
        <Route
          path="/bos-committee-minutes"
          element={
            <PlaceholderPage
              title="BOS Committee and Minutes of Meeting"
              description="Board of Studies composition and minutes of meetings will be published here."
            />
          }
        />
        <Route
          path="/department-committees"
          element={
            <PlaceholderPage
              title="Department Committees"
              description="Constituted departmental committees and member details will be provided here."
            />
          }
        />
        <Route
          path="/circulars-reports"
          element={
            <PlaceholderPage
              title="Circulars / Reports"
              description="Circulars, notices, annual reports, and related official documents will appear here."
            />
          }
        />

        <Route path="/labs" element={<Navigate to="/laboratories" replace />} />
        <Route
          path="/projects"
          element={<Navigate to="/research-projects" replace />}
        />
        <Route
          path="/papers"
          element={<Navigate to="/research-papers" replace />}
        />
        <Route
          path="/publication"
          element={<Navigate to="/publications" replace />}
        />
        <Route
          path="/timetable"
          element={<Navigate to="/time-table" replace />}
        />
        <Route path="/sttp" element={<Navigate to="/sttps-fdps" replace />} />
        <Route
          path="/fdp-attended"
          element={<Navigate to="/sttps-fdps" replace />}
        />
        <Route
          path="/fdp-conducted"
          element={<Navigate to="/sttps-fdps" replace />}
        />
        <Route
          path="/placements"
          element={<Navigate to="/internships-and-placements" replace />}
        />
        <Route
          path="/consultancy"
          element={<Navigate to="/consultancy-and-training" replace />}
        />
        <Route
          path="/bos"
          element={<Navigate to="/bos-committee-minutes" replace />}
        />
        <Route
          path="/committees"
          element={<Navigate to="/department-committees" replace />}
        />
        <Route
          path="/circulars"
          element={<Navigate to="/circulars-reports" replace />}
        />

        <Route
          path="*"
          element={
            <PlaceholderPage
              title="404 - Page Not Found"
              description="The requested page does not exist in the current website structure."
            />
          }
        />
      </Routes>
    </Suspense>
  );
}
