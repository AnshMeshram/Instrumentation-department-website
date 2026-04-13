import { Card, CardContent } from "../components/ui/card";

export default function PlaceholderPage({ title, description }) {
  return (
    <Card className="overflow-hidden bg-white">
      <CardContent className="p-6">
        <h1 className="text-2xl font-semibold text-[#0f2f66]">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}
