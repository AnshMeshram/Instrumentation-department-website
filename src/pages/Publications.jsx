import { useState, useMemo } from "react";
import publicationsData from "../data/publications.json";
import { buildPublicationCatalog } from "../lib/publicationCatalog";

const PAGE_SIZE = 10;

function PublicationModal({ publication, onClose }) {
  if (!publication) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2">{publication.title}</h2>
        <div className="mb-2">
          <b>Authors:</b> {publication.authors}
        </div>
        <div className="mb-2">
          <b>Faculty:</b> {publication.faculty}
        </div>
        <div className="mb-2">
          <b>Year:</b> {publication.sessionYear}
        </div>
        <div className="mb-2">
          <b>Category:</b> {publication.category}
        </div>
        <div className="mb-2">
          <b>Venue:</b> {publication.venue}
        </div>
        <div className="mb-2">
          <b>Published On:</b> {publication.publishedOn}
        </div>
        <div className="mb-2">
          <b>Source Page:</b> {publication.sourcePage}
        </div>
        <div className="mb-2">
          <b>Raw Text:</b>
          <div className="mt-1 p-2 bg-gray-50 rounded border text-xs max-h-40 overflow-auto">
            {publication.rawText}
          </div>
        </div>
        <a
          href={publication.publicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
    <div className="max-w-7xl mx-auto py-10 px-2">
      <h1 className="text-3xl font-bold mb-6">Publications</h1>
      <table className="min-w-full border text-sm bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">No.</th>
            <th className="border px-3 py-2">Title</th>
            <th className="border px-3 py-2">Authors</th>
            <th className="border px-3 py-2">Faculty</th>
            <th className="border px-3 py-2">Year</th>
            <th className="border px-3 py-2">Category</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((pub, idx) => (
            <tr key={pub.serialNumber} className="hover:bg-gray-50">
              <td className="border px-3 py-2">
                {(page - 1) * PAGE_SIZE + idx + 1}
              </td>
              <td className="border px-3 py-2 font-medium">{pub.title}</td>
              <td className="border px-3 py-2">{pub.authors}</td>
              <td className="border px-3 py-2">{pub.faculty}</td>
              <td className="border px-3 py-2">{pub.sessionYear}</td>
              <td className="border px-3 py-2">{pub.category}</td>
              <td className="border px-3 py-2">
                <button
                  className="px-2 py-1 mr-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setModalPub(pub)}
                >
                  View
                </button>
                <a
                  href={pub.publicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Open
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
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
