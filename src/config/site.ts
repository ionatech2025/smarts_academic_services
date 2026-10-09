export const site = {
  name: "Smarts Academic Services",
  tagline: "Professional Online Academic Services for College & University Students",
  phone: "+256 754 925 915",
  email: "matovui559@gmail.com",
  facebookLabel: "Docta Smarts",
  facebookUrl: "https://facebook.com", // Update with exact URL when supplied
};

export const subjectsList = [
  "Math & Statistics",
  "Anatomy & Physiology",
  "Biology & Microbiology",
  "Chemistry",
  "Physics",
  "Nursing Courses",
  "RN-BSN Courses",
  "Edgenuity",
  "Acellus",
  "Other College & University Courses",
];

export const servicesList = [
  "Homework & Assignment Assistance",
  "Online Coursework Assistance",
  "Exam Preparation & Assessment Support",
  "Essay & Academic Writing",
  "Research Papers",
  "Other",
];

export const whatsappLink = (msg: string) =>
  `https://wa.me/256754925915?text=${encodeURIComponent(msg)}`;
