const BASE_PATH = "/deparment_faculty_data";

const SECTION_RESOURCES = {
  education: [],
  experience: [
    {
      label: "Research Projects Record",
      file: "reasearch-Projects.pdf",
      type: "PDF",
    },
  ],
  publications: [
    {
      label: "Department Publications",
      file: "publications.pdf",
      type: "PDF",
    },
  ],
  patents: [
    {
      label: "Department Patent Record",
      file: "patent.pdf",
      type: "PDF",
    },
  ],
  achievements: [
    {
      label: "FDP Attended",
      file: "FDP-attended.pdf",
      type: "PDF",
    },
    {
      label: "FDP Conducted",
      file: "FDP-conducted.pdf",
      type: "PDF",
    },
    {
      label: "Consultancy Highlights",
      file: "consultancy-1.pdf",
      type: "PDF",
    },
  ],
};

export function getSectionResources(sectionKey) {
  const resources = SECTION_RESOURCES[sectionKey] || [];
  return resources.map((resource) => ({
    ...resource,
    href: `${BASE_PATH}/${resource.file}`,
  }));
}
