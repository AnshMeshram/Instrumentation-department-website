import FacultyCard from "../components/FacultyCard";
import facultyData from "../data/faculty.json";
import PageHeader from "../components/PageHeader";

export default function Faculty() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Faculty"
        subtitle="Meet our dedicated faculty members"
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {facultyData.map((faculty) => (
          <FacultyCard key={faculty.id} faculty={faculty} />
        ))}
      </div>
    </div>
  );
}
