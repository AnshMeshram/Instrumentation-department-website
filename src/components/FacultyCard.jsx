import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function FacultyCard({ faculty }) {
  const defaultImg = "/faculty_images/image.png";
  const rawImg = faculty.image || "";
  const normalizedImg = rawImg
    .replace("/faculty-images/", "/faculty_images/")
    .replace("faculty-images/", "faculty_images/");
  const imgSrc = normalizedImg
    ? normalizedImg.startsWith("/")
      ? normalizedImg
      : `/${normalizedImg}`
    : defaultImg;

  return (
    <Card className="group h-full transition-all duration-300 hover:border-[#bfd1ea] hover:shadow-lg">
      <CardContent>
        <Link
          to={`/faculty/${faculty.id}`}
          className="faculty-card flex h-full flex-col md:max-w-xl md:flex-row md:items-start"
        >
          <div className="mb-4 h-64 w-full rounded-lg border border-[#e5e7eb] bg-white p-1 shadow-sm transition-shadow duration-300 group-hover:shadow-md md:mb-0 md:h-48 md:w-44">
            <img
              src={imgSrc}
              alt={faculty.name}
              className="h-full w-full object-contain object-center"
              onError={(e) => {
                if (e?.target) e.target.src = defaultImg;
              }}
              loading="lazy"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between md:p-4">
            <div>
              <h3 className="mb-1 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#0f2f66]">
                {faculty.name}
              </h3>
              <p className="mb-2 text-sm text-slate-600">
                {faculty.designation}
              </p>
              <p className="text-sm text-slate-700 wrap-break-word">
                {faculty.email}
              </p>
              <p className="mb-3 text-sm text-slate-700">{faculty.phone}</p>
              <p className="text-sm text-slate-600">{faculty.research}</p>
            </div>

            <div className="mt-4">
              <Button variant="soft" size="sm">
                View profile
              </Button>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
