export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  iconName: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "assignment-assistance",
    title: "Homework & Assignment Assistance",
    shortDescription: "Structured guidance and step-by-step model solutions for daily coursework.",
    iconName: "book-open",
    features: ["Step-by-step explanations", "Problem-solving techniques", "Timely delivery"]
  },
  {
    id: "coursework-assistance",
    title: "Online Coursework Assistance",
    shortDescription: "Comprehensive support for navigating complex online modules and class units.",
    iconName: "laptop",
    features: ["Module navigation advice", "Study planning", "Continuous feedback"]
  },
  {
    id: "exam-preparation",
    title: "Exam Preparation & Assessment Support",
    shortDescription: "Targeted practice materials, review sessions, and concept reinforcement.",
    iconName: "award",
    features: ["Practice assessments", "Core concept review", "Time management tips"]
  },
  {
    id: "essay-writing",
    title: "Essay & Academic Writing",
    shortDescription: "Expert editing, structural review, and feedback on academic essays.",
    iconName: "edit-3",
    features: ["Grammar & tone refinement", "Citation formatting (APA, MLA, etc.)", "Structure optimization"]
  },
  {
    id: "research-papers",
    title: "Research Papers",
    shortDescription: "In-depth literature review guidance, outline preparation, and research assistance.",
    iconName: "file-text",
    features: ["Methodology support", "Literature synthesis", "Academic formatting"]
  }
];
