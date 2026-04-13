import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const kindStyles = {
  Journal: "published",
  Conference: "applied",
};

export default function PublicationCard({ publication }) {
  const badgeVariant = kindStyles[publication.publicationKind] || "default";

  return (
    <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-6 text-slate-900">
            {publication.title}
          </h3>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <Badge variant={badgeVariant}>{publication.publicationKind}</Badge>
            <Badge variant="type">{publication.sessionYear}</Badge>
          </div>
        </div>

        <div className="mt-4 h-px w-full bg-[#e6edf7]" />

        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="font-medium text-slate-500">Authors</dt>
            <dd className="mt-1 leading-6 text-slate-700">
              {publication.authors}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-slate-500">Faculty</dt>
            <dd className="mt-1 leading-6 text-slate-700">
              {publication.faculty}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-slate-500">Venue</dt>
            <dd className="mt-1 leading-6 text-slate-700">
              {publication.venue}
            </dd>
          </div>

          {publication.details ? (
            <div>
              <dt className="font-medium text-slate-500">Details</dt>
              <dd className="mt-1 leading-6 text-slate-700">
                {publication.details}
              </dd>
            </div>
          ) : null}

          <div>
            <dt className="font-medium text-slate-500">Published On</dt>
            <dd className="mt-1 text-slate-700">{publication.publishedOn}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
