export interface Testimonial {
  id: string;
  clientName: string;
  course: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    clientName: "Sarah M.",
    course: "RN-BSN Nursing Student",
    quote: "The coursework guidance helped me manage my heavy nursing workload efficiently. Professional and prompt support!",
    rating: 5
  },
  {
    id: "test-2",
    clientName: "David K.",
    course: "Statistics & Math",
    quote: "Clear step-by-step problem explanations saved me during midterms. Highly recommended service.",
    rating: 5
  },
  {
    id: "test-3",
    clientName: "Elena R.",
    course: "Anatomy & Physiology",
    quote: "Detailed feedback on my assignment structures made complex topics much easier to understand.",
    rating: 5
  }
];
