import useDocumentMetadata from "../hooks/useDocumentMetadata";

export default function SEO({ title, description, image, canonicalPath }) {
  useDocumentMetadata({ title, description, image, canonicalPath });
  return null;
}
