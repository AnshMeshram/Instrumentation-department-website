import Carousel from "../components/Carousel";
import aboutData from "../data/about.json";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";

export default function About() {
  const { title, summary, images } = aboutData;

  const imagesArr = images.map((f) => ({ src: f, alt: title }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="About"
        subtitle="Overview of the Department of Instrumentation and Control Engineering"
      />

      <Card className="overflow-hidden">
        <Carousel images={imagesArr} autoPlay interval={4500} />
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="prose prose-slate max-w-none">
            {summary.map((p, idx) => (
              <p key={idx} className="text-justify leading-7">
                {p}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
