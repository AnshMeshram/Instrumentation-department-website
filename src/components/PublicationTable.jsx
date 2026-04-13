import { Badge } from "./ui/badge";

function formatDate(value) {
  if (!value) return "-";

  return value;
}

const kindStyles = {
  Journal: "published",
  Conference: "applied",
};

export default function PublicationTable({ publications }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-white text-xs uppercase tracking-[0.08em] text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Title / Publication
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Authors
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Faculty
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Venue
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Session Year
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Published On
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5edf6]">
            {publications.map((publication) => {
              const badgeVariant =
                kindStyles[publication.publicationKind] || "default";

              return (
                <tr
                  key={publication.id}
                  className="align-top transition hover:bg-[#f9fafb]"
                >
                  <td className="max-w-xs px-4 py-4 font-medium leading-6 text-slate-900">
                    {publication.title}
                  </td>
                  <td className="max-w-xs px-4 py-4 leading-6">
                    {publication.authors}
                  </td>
                  <td className="max-w-xs px-4 py-4 leading-6 text-slate-800">
                    {publication.faculty}
                  </td>
                  <td className="max-w-sm px-4 py-4 leading-6 text-slate-800">
                    <div>{publication.venue}</div>
                    {publication.details ? (
                      <div className="mt-1 text-xs text-slate-500">
                        {publication.details}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 py-4 text-slate-800">
                    {publication.sessionYear}
                  </td>
                  <td className="px-4 py-4 text-slate-800">
                    {formatDate(publication.publishedOn)}
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={badgeVariant}>
                      {publication.publicationKind}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
