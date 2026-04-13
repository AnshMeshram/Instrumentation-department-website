import { Mail, Phone } from "lucide-react";
import { useParams } from "react-router-dom";
import facultyData from "../data/faculty.json";
import ProfileTabs from "../components/ProfileTabs";
import PageHeader from "../components/PageHeader";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

export default function FacultyProfile() {
  const { id } = useParams();
  const faculty = facultyData.find((f) => f.id === id);

  if (!faculty) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Faculty profile not found.
      </div>
    );
  }

  const defaultImg = "/faculty_images/image.png";
  const rawImg = faculty.image || "";
  const normalizedImg = rawImg
    .replace("/faculty-images/", "/faculty_images/")
    .replace("faculty-images/", "faculty_images/");
  const initialImg = normalizedImg
    ? normalizedImg.startsWith("/")
      ? normalizedImg
      : `/${normalizedImg}`
    : defaultImg;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Faculty Profile"
        subtitle="Detailed profile and academic contributions"
      />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="h-52 w-40 shrink-0 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
              <img
                src={initialImg}
                alt={faculty.name}
                className="h-full w-full object-contain object-center"
                onError={(e) => {
                  if (e?.target) e.target.src = defaultImg;
                }}
                loading="lazy"
              />
            </div>

            <div className="flex-1 space-y-3">
              <h1 className="text-2xl font-semibold text-[#0f2f66]">
                {faculty.name}
              </h1>
              <p className="text-sm font-medium text-slate-700">
                {faculty.designation}
              </p>
              <Badge variant="type">Faculty Member</Badge>

              <div className="space-y-2 text-sm text-slate-700">
                <p className="inline-flex items-center gap-2">
                  <Mail size={16} aria-hidden="true" />
                  {faculty.email}
                </p>
                <p className="inline-flex items-center gap-2">
                  <Phone size={16} aria-hidden="true" />
                  {faculty.phone}
                </p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Research Interests
                </h2>
                <p className="mt-1 text-sm text-slate-700">
                  {faculty.research}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileTabs faculty={faculty} />
    </div>
  );
}
