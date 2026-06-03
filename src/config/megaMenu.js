import {
  GraduationCap,
  BookOpen,
  Microscope,
  FileText,
  Calendar,
  Layers,
  Building2,
  Briefcase,
  Users,
  UserCheck,
  Award,
  Settings,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";

export const MEGA_MENUS = {
  academics: {
    title: "Academics",
    items: [
      { label: "B.Tech Program", path: "/academics#btech", description: "Four-year undergraduate programme in Instrumentation & Control.", icon: GraduationCap },
      { label: "M.Tech Program", path: "/academics#mtech", description: "Postgraduate specialization in Process Automation.", icon: BookOpen },
      { label: "Ph.D. Program", path: "/academics#phd", description: "Doctoral research in sensors, biomedical, and control.", icon: Microscope },
      { label: "Curriculum & Scheme", path: "/curriculum", description: "Syllabi, course structures, and credit templates.", icon: FileText },
      { label: "Academic Timetable", path: "/time-table", description: "Class schedules, batch listings, and calendars.", icon: Calendar },
    ],
    featured: {
      title: "Academic Excellence",
      description: "Our programs are NBA accredited, offering state-of-the-art training in industrial automation and control engineering.",
      cta: "View Curriculum",
      path: "/curriculum",
      image: "/department-images/dept3.jpg"
    }
  },
  research: {
    title: "Research",
    items: [
      { label: "Research Areas", path: "/research#areas", description: "Sensors, Process Control, Biomedical, and Embedded Systems.", icon: Layers },
      { label: "Research Laboratories", path: "/laboratories", description: "Dedicated lab spaces equipped with industrial standards.", icon: Building2 },
      { label: "Publications Directory", path: "/publications", description: "National and international journal papers, books, and chapters.", icon: FileText },
      { label: "Sponsored Projects", path: "/research-projects", description: "R&D projects funded by DST, ISRO, and major industries.", icon: Briefcase },
    ],
    featured: {
      title: "Innovating for Tomorrow",
      description: "Explore patents and publications from our department's pioneering research.",
      cta: "Explore Patents",
      path: "/patents",
      image: "/department-images/Dept-Photo-768x512.jpeg"
    }
  },
  people: {
    title: "People",
    items: [
      { label: "Faculty Directory", path: "/faculty", description: "Meet our distinguished professors and academic researchers.", icon: Users },
      { label: "Support & Lab Staff", path: "/faculty#staff", description: "The core technical and administration team of our department.", icon: UserCheck },
      { label: "Alumni Network", path: "/alumni", description: "Our alumni making a global impact in engineering and industry.", icon: GraduationCap },
    ],
    featured: {
      title: "Distinguished Faculty",
      description: "Our faculty members serve on international boards, write textbooks, and lead government research grants.",
      cta: "Faculty Directory",
      path: "/faculty",
      image: "/department-images/dept2.jpg"
    }
  },
  studentLife: {
    title: "Student Life",
    items: [
      { label: "Departmental Events", path: "/events", description: "Guest lectures, industry workshops, and student festivals.", icon: Calendar },
      { label: "Student Achievements", path: "/achievements", description: "Academic rankers, sports medals, and technical competition winners.", icon: Award },
      { label: "Internships & Placements", path: "/placements", description: "Placement records, average packages, and recruiting partners.", icon: Briefcase },
      { label: "MESA & Student Clubs", path: "/about#mesa", description: "Instrumentation & Control student chapter activities.", icon: Users },
    ],
    featured: {
      title: "Career Milestones",
      description: "With nearly 100% placements, our graduates are hired by top companies like Honeywell, Emerson, and TCS.",
      cta: "Placement Stats",
      path: "/placements",
      image: "/department-images/dept3.jpg"
    }
  },
  resources: {
    title: "Resources",
    items: [
      { label: "Virtual Labs", path: "/virtual-labs", description: "Perform interactive experiments and simulations online.", icon: Settings },
      { label: "Department Gallery", path: "/gallery", description: "A visual tour of the department labs, events, and campus life.", icon: ImageIcon },
      { label: "NPTEL Online Courses", path: "https://nptel.ac.in/", description: "e-Learning portal and certification program modules.", icon: ExternalLink, external: true },
    ],
    featured: {
      title: "Interactive Learning",
      description: "Access remote simulators and lab software environments through our virtual laboratory interface.",
      cta: "Launch Virtual Labs",
      path: "/virtual-labs",
      image: "/department-images/dept2.jpg"
    }
  }
};
