import { Card, CardContent } from "./ui/card";

export default function PageHeader({ title, subtitle }) {
  return (
    <Card className="overflow-hidden bg-white">
      <CardContent className="p-6">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight text-[#0f2f66]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          ) : null}
        </header>
      </CardContent>
    </Card>
  );
}
