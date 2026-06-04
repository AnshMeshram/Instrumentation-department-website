import { useEffect } from "react";

/**
 * Custom hook to dynamically update document title and meta description for SEO.
 * @param {Object} metadata - The metadata object.
 * @param {string} metadata.title - The title of the page.
 * @param {string} [metadata.description] - The description of the page.
 * @param {string} [metadata.image] - The Open Graph image path or URL.
 * @param {string} [metadata.canonicalPath] - Canonical path for the route.
 */
export default function useDocumentMetadata({
  title,
  description,
  image = "/college-logo/college_logo.jpg",
  canonicalPath,
}) {
  useEffect(() => {
    const setMetaTag = (selector, attrName, attrValue, content) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setLinkTag = (selector, rel, href) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute("href", href);
    };

    const siteUrl = "https://instrumentation-coep.netlify.app";
    const canonicalUrl =
      typeof window !== "undefined"
        ? new URL(canonicalPath || window.location.pathname, siteUrl).href
        : siteUrl;
    const imageUrl =
      typeof window !== "undefined"
        ? new URL(image, window.location.origin).href
        : `${siteUrl}${image}`;
    const defaultDescription =
      "Department of Instrumentation and Control Engineering at COEP Technological University.";
    const pageTitle = title
      ? `${title} | Instrumentation Dept, COEP Tech`
      : document.title;
    const pageDescription = description || defaultDescription;

    if (title) {
      document.title = pageTitle;
    }

    setMetaTag(
      'meta[name="description"]',
      "name",
      "description",
      pageDescription,
    );

    if (pageTitle) {
      setMetaTag(
        'meta[property="og:title"]',
        "property",
        "og:title",
        pageTitle,
      );
      setMetaTag(
        'meta[name="twitter:title"]',
        "name",
        "twitter:title",
        pageTitle,
      );
    }

    setMetaTag(
      'meta[property="og:description"]',
      "property",
      "og:description",
      pageDescription,
    );
    setMetaTag(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      pageDescription,
    );

    setMetaTag('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMetaTag('meta[property="og:image"]', "property", "og:image", imageUrl);
    setMetaTag(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image",
      imageUrl,
    );

    setMetaTag('meta[property="og:type"]', "property", "og:type", "website");
    setMetaTag(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image",
    );
    setLinkTag('link[rel="canonical"]', "canonical", canonicalUrl);
  }, [canonicalPath, description, image, title]);
}
