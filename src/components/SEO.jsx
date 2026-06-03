import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, ogImage = "/college-logo/college_logo.jpg", ogUrl = window.location.href }) {
  const defaultTitle = "Instrumentation & Control Engineering | COEP Tech";
  const fullTitle = title ? `${title} | Instrumentation Dept, COEP Tech` : defaultTitle;
  const defaultDescription = "Department of Instrumentation and Control Engineering at COEP Technological University.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
