import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function ProfileTabs({ faculty }) {
  const tabs = [
    { key: "education", label: "Education" },
    { key: "experience", label: "Experience" },
    { key: "publications", label: "Research Publications" },
    { key: "patents", label: "Patents" },
    { key: "achievements", label: "Achievements/Award Recognition" },
  ];

  return (
    <Tabs defaultValue="education" className="mt-10">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="education">
        <div className="space-y-4">
          {faculty.education.map((edu, i) => (
            <div
              key={i}
              className="border-b border-[#e7eef8] pb-4 last:border-b-0"
            >
              <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
              <p className="text-sm text-slate-600">{edu.institute}</p>
              <span className="text-xs text-slate-500">{edu.year}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="experience">
        <ul className="list-disc pl-6 space-y-2">
          {faculty.experience.map((exp, i) => (
            <li key={i}>{exp}</li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="publications">
        <ul className="list-disc pl-6 space-y-2">
          {faculty.publications.map((pub, i) => (
            <li key={i}>{pub}</li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="patents">
        <ul className="list-disc pl-6 space-y-2">
          {faculty.patents.map((pat, i) => (
            <li key={i}>{pat}</li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="achievements">
        <ul className="list-disc pl-6 space-y-2">
          {faculty.achievements.map((ach, i) => (
            <li key={i}>{ach}</li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
