import { useState, useMemo } from "react";
import publicationsData from "../data/publications.json";
import { buildPublicationCatalog } from "../lib/publicationCatalog";

const PAGE_SIZE = 10;

function PublicationModal({ publication, onClose }) {
  if (!publication) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg sm:text-xl font-bold mb-2 break-words">
          {publication.title}
        </h2>
        <div className="mb-2 text-xs sm:text-sm">
          <b>Authors:</b> {publication.authors}
        </div>
        <div className="mb-2 text-xs sm:text-sm">
          <b>Faculty:</b> {publication.faculty}
        </div>
        <div className="mb-2 text-xs sm:text-sm">
          <b>Year:</b> {publication.sessionYear}
        </div>
        <div className="mb-2 text-xs sm:text-sm">
          <b>Category:</b> {publication.category}
        </div>
        <div className="mb-2 text-xs sm:text-sm">
          <b>Venue:</b> {publication.venue}
        </div>
        <div className="mb-2 text-xs sm:text-sm">
          <b>Published On:</b> {publication.publishedOn}
        </div>
        <div className="mb-2 text-xs sm:text-sm">
          <b>Source Page:</b> {publication.sourcePage}
        </div>
        <div className="mb-2 text-xs sm:text-sm">
          <b>Raw Text:</b>
          <div className="mt-1 p-2 bg-gray-50 rounded border text-xs max-h-40 overflow-auto">
            {publication.rawText}
          </div>
        </div>
        <a
          href={publication.publicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs sm:text-sm"
        >
          Open Publication Link
        </a>
      </div>
    </div>
  );
}

export default function Publications() {
  const catalog = useMemo(() => buildPublicationCatalog(publicationsData), []);
  const [page, setPage] = useState(1);
  const [modalPub, setModalPub] = useState(null);
  const totalPages = Math.max(1, Math.ceil(catalog.length / PAGE_SIZE));
  const paginated = catalog.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto py-6 px-1 sm:px-2">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Publications
      </h1>
      <div className="w-full overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-[700px] w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-2">No.</th>
              <th className="border px-2 py-2">Title</th>
              <th className="border px-2 py-2">Authors</th>
              <th className="border px-2 py-2">Faculty</th>
              <th className="border px-2 py-2">Year</th>
              <th className="border px-2 py-2">Category</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((pub, idx) => (
              <tr key={pub.serialNumber} className="hover:bg-gray-50">
                <td className="border px-2 py-2">
                  {(page - 1) * PAGE_SIZE + idx + 1}
                </td>
                <td className="border px-2 py-2 font-medium break-words max-w-xs">
                  {pub.title}
                </td>
                <td className="border px-2 py-2 break-words max-w-xs">
                  {pub.authors}
                </td>
                <td className="border px-2 py-2 break-words max-w-xs">
                  {pub.faculty}
                </td>
                <td className="border px-2 py-2">{pub.sessionYear}</td>
                <td className="border px-2 py-2">{pub.category}</td>
                <td className="border px-2 py-2">
                  <button
                    className="px-2 py-1 mb-1 sm:mb-0 mr-2 bg-gray-200 rounded hover:bg-gray-300 text-xs sm:text-sm"
                    onClick={() => setModalPub(pub)}
                  >
                    View
                  </button>
                  <a
                    href={pub.publicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs sm:text-sm"
                  >
                    Open
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 gap-2 sm:gap-0">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 w-full sm:w-auto"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-xs sm:text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 w-full sm:w-auto"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <PublicationModal
        publication={modalPub}
        onClose={() => setModalPub(null)}
      />
    </div>
  );
}
