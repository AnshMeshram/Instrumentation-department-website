import { Navigate, Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Faculty from "../pages/Faculty";
import FacultyProfile from "../pages/FacultyProfile";
import FDPs from "../pages/FDPs";
import Patents from "../pages/Patents";
import PlaceholderPage from "../pages/PlaceholderPage";
import Consultancy from "../pages/Consultancy";
import ResearchPapers from "../pages/ResearchPapers";
import Publications from "../pages/Publications";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" replace />} />

      <Route path="/about" element={<About />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/faculty/:id" element={<FacultyProfile />} />

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
      <Route
        path="/time-table"
        element={
          <PlaceholderPage
            title="Time Table"
            description="Semester-wise class schedules and lab timetables will be published here."
          />
        }
      />
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
  );
}
