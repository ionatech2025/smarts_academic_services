export const site = {
  name: "Smarts Academic Services",
  tagline: "Professional Online Academic Services for College & University Students",
  phone: "+256754925915",
  whatsapp: "256754925915",
  email: "matovui559@gmail.com",
  facebookLabel: "Docta Smarts",
  facebookUrl: "",
  domain: "https://smartsacademic.com",
} as const;

export const whatsappLink = (msg = "Hello, I'd like to request a service.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
