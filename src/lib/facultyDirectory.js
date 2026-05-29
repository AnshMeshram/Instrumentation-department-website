const DEFAULT_FACULTY_IMAGE = "/faculty_images/image.png";

const FACULTY_PROFILE_FILES = {
  shendge: "PDS.docx",
  sonawane: "DNS.docx",
  "chetankumar-patil": "CYP.docx",
  "sanjaykumar-patil": "SLP.docx",
  "rajendra-kokate": "RDK.docx",
  "uttam-chaskar": "UMC.docx",
  "rohini-mudhalwadkar": "RPM.docx",
  "girish-lakhekar": "CV_GVL_Revised.docx",
  "nikhila-patil": "NLP.docx",
  "meera-khandekar": "MAK.docx",
  "ketaki-ghodinde": "KAG.docx",
  "amruta-deshpande": "ASD.docx",
};

export function getFacultyImage(imagePath) {
  const normalized = (imagePath || "")
    .replace("/faculty-images/", "/faculty_images/")
    .replace("faculty-images/", "faculty_images/");

  if (!normalized) {
    return DEFAULT_FACULTY_IMAGE;
  }

  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

export function getFacultyDocPath(facultyId) {
  const fileName = FACULTY_PROFILE_FILES[facultyId];
  if (!fileName) {
    return null;
  }
  return `/deparment_faculty_data/${fileName}`;
}

export function getFacultyMetrics(faculty) {
  return {
    educationCount: faculty.education?.length || 0,
    experienceCount: faculty.experience?.length || 0,
    publicationCount: faculty.publications?.length || 0,
    patentCount: faculty.patents?.length || 0,
    achievementCount: faculty.achievements?.length || 0,
  };
}

export function getTopDegree(faculty) {
  return faculty.education?.[0]?.degree || "Academic profile available";
}
