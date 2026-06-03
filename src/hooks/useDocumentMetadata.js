import { useEffect } from "react";

/**
 * Custom hook to dynamically update document title and meta description for SEO.
 * @param {Object} metadata - The metadata object.
 * @param {string} metadata.title - The title of the page.
 * @param {string} [metadata.description] - The description of the page.
 */
export default function useDocumentMetadata({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Instrumentation Dept, COEP Tech`;
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);
}
