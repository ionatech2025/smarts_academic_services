export interface Service {
  title: string;
  description: string;
  image?: string;
  features?: string[];
}

// Draft copy: needs client approval before launch (SRS 9.2).
export const services: Service[] = [
  {
    title: "Homework & Assignment Assistance",
    description:
      "Step-by-step guidance, worked examples and feedback to help you understand and complete your assignments.",
    image: "/AssignmentHelp.jpeg",
    features: ["Worked Examples", "Step-by-Step Breakdown", "Quality Verification"],
  },
  {
    title: "Online Coursework Assistance",
    description:
      "Ongoing support through your online course: explanations, study plans and help staying on track.",
    image: "/online.jpeg",
    features: ["Syllabus Alignment", "Module Tracking", "Custom Study Plans"],
  },
  {
    title: "Exam Preparation & Assessment Support",
    description:
      "Practice questions, review sessions and revision strategies to prepare you for tests and assessments.",
    image: "/poster.jpeg",
    features: ["Past Paper Reviews", "Concept Summaries", "Revision Strategies"],
  },
  {
    title: "Essay & Academic Writing",
    description:
      "Help with structure, argument, clarity, editing and proofreading for your academic writing.",
    image: "/AssignmentWritingHelp.jpeg",
    features: ["Thesis Structuring", "Citation Formatting", "Proofreading & Editing"],
  },
  {
    title: "Research Papers",
    description:
      "Support with topic selection, sourcing, outlining, referencing and revising your research papers.",
    image: "/plagiarism.jpeg",
    features: ["Literature Sourcing", "Plagiarism Checks", "Referencing Support"],
  },
];

export const fallbackImages = [
  "/maths.jpeg",
  "/chemistry.jpeg",
  "/nursing.jpeg",
  "/services.jpeg",
  "/smarts_logo.jpeg",
];