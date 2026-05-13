import FacultyCard from "../components/FacultyCard";
import facultyData from "../data/faculty.json";
import PageHeader from "../components/PageHeader";

export default function Faculty() {
  return (
    <div className="space-y-12 pb-12">
      <PageHeader
        title="Faculty"
        subtitle="Meet our dedicated faculty members driving academic excellence and industrial innovation."
      />

      <div className="grid grid-cols-1 gap-10">
        {facultyData.map((faculty) => (
          <FacultyCard key={faculty.id} faculty={faculty} />
        ))}
      </div>
    </div>
  );
}
