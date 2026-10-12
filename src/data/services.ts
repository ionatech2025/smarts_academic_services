export interface Service {
  title: string;
  description: string;
}

// Draft copy: needs client approval before launch (SRS 9.2).
export const services: Service[] = [
  {
    title: "Homework & Assignment Assistance",
    description:
      "Step-by-step guidance, worked examples and feedback to help you understand and complete your assignments.",
  },
  {
    title: "Online Coursework Assistance",
    description:
      "Ongoing support through your online course: explanations, study plans and help staying on track.",
  },
  {
    title: "Exam Preparation & Assessment Support",
    description:
      "Practice questions, review sessions and revision strategies to prepare you for tests and assessments.",
  },
  {
    title: "Essay & Academic Writing",
    description:
      "Help with structure, argument, clarity, editing and proofreading for your academic writing.",
  },
  {
    title: "Research Papers",
    description:
      "Support with topic selection, sourcing, outlining, referencing and revising your research papers.",
  },
];