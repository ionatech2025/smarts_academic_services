export interface Subject {
  id: string;
  name: string;
  category: "STEM" | "Healthcare & Nursing" | "Online Platforms" | "General";
  description?: string;
  image?: string;
}

export const subjects: Subject[] = [
  {
    id: "math-stats",
    name: "Math & Statistics",
    category: "STEM",
    image: "/maths.jpeg",
  },
  {
    id: "anatomy-physiology",
    name: "Anatomy & Physiology",
    category: "Healthcare & Nursing",
    image: "/nursing.jpeg",
  },
  {
    id: "biology-microbiology",
    name: "Biology & Microbiology",
    category: "STEM",
    image: "/chemistry.jpeg",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    category: "STEM",
    image: "/chemistry.jpeg",
  },
  {
    id: "physics",
    name: "Physics",
    category: "STEM",
    image: "/maths.jpeg",
  },
  {
    id: "nursing-courses",
    name: "Nursing Courses",
    category: "Healthcare & Nursing",
    image: "/nursing.jpeg",
  },
  {
    id: "rn-bsn",
    name: "RN-BSN Courses",
    category: "Healthcare & Nursing",
    image: "/nursing.jpeg",
  },
  {
    id: "edgenuity",
    name: "Edgenuity",
    category: "Online Platforms",
    image: "/online.jpeg",
  },
  {
    id: "acellus",
    name: "Acellus",
    category: "Online Platforms",
    image: "/poster.jpeg",
  },
  {
    id: "other-courses",
    name: "Other College & University Courses",
    category: "General",
    image: "/services.jpeg",
  },
];