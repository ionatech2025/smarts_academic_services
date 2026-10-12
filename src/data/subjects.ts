export interface Subject {
  id: string;
  name: string;
  category: "STEM" | "Healthcare & Nursing" | "Online Platforms" | "General";
  description?: string;
}

export const subjects: Subject[] = [
  { id: "math-stats", name: "Math & Statistics", category: "STEM" },
  { id: "anatomy-physiology", name: "Anatomy & Physiology", category: "Healthcare & Nursing" },
  { id: "biology-microbiology", name: "Biology & Microbiology", category: "STEM" },
  { id: "chemistry", name: "Chemistry", category: "STEM" },
  { id: "physics", name: "Physics", category: "STEM" },
  { id: "nursing-courses", name: "Nursing Courses", category: "Healthcare & Nursing" },
  { id: "rn-bsn", name: "RN-BSN Courses", category: "Healthcare & Nursing" },
  { id: "edgenuity", name: "Edgenuity", category: "Online Platforms" },
  { id: "acellus", name: "Acellus", category: "Online Platforms" },
  { id: "other-courses", name: "Other College & University Courses", category: "General" }
];
