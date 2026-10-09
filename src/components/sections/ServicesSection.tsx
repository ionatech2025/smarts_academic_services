import React, { useEffect, useRef, useState } from 'react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features?: string[];
}

const defaultServices: ServiceItem[] = [
  {
    id: '1',
    title: 'Academic Writing & Research Support',
    description: 'Comprehensive research assistance, paper structuring, and academic guidance.',
    features: ['In-depth Research', 'Plagiarism Checking', 'Citation Formatting'],
  },
  {
    id: '2',
    title: 'Coursework & Assignment Guidance',
    description: 'Step-by-step guidance across diverse academic disciplines and modules.',
    features: ['Syllabus Alignment', 'Custom Tutoring', 'Quality Verification'],
  },
  {
    id: '3',
    title: 'Exam Preparation & Review',
    description: 'Structured revision materials and practice assessments tailored to your syllabus.',
    features: ['Past Paper Reviews', 'Concept Summaries', 'Deadline Tracking'],
  },
];

// Decorative icons, picked by position so any number of services still looks good.
const icons: React.ReactNode[] = [
  // pen / writing
  <svg key="pen" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>,
  // book
  <svg key="book" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5Z" />
    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
  </svg>,
  // checklist / exam
  <svg key="check" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="m8 9 1.5 1.5L12 8" />
    <path d="M14 10h3M8 15h9" />
  </svg>,
];

// Scoped styles live in this file so the component stays a single copy-paste.
const css = `
.svc {
  position: relative;
  overflow: hidden;
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
  background:
    radial-gradient(ellipse 45% 35% at 0% 0%, rgba(201, 162, 39, 0.08), transparent 70%),
    radial-gradient(ellipse 45% 35% at 100% 100%, rgba(11, 37, 69, 0.06), transparent 70%),
    #FFFFFF;
}
.svc__inner { position: relative; max-width: 1100px; margin: 0 auto; }

/* Reveal on scroll */
.svc__reveal { opacity: 0; }
.svc--visible .svc__reveal {
  opacity: 1;
  transform: none;
  /* backwards fill: holds the start state during the delay, then releases so hover transforms still work */
  animation: svc-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
  animation-delay: var(--d, 0s);
}
@keyframes svc-rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }

/* Heading */
.svc__head { text-align: center; margin-bottom: 3.25rem; }
.svc__eyebrow {
  display: inline-block;
  margin-bottom: 0.75rem;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  background: rgba(201, 162, 39, 0.14);
  color: var(--gold-dark, #A98617);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.svc__title {
  margin: 0 0 0.75rem;
  color: var(--navy);
  font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}
.svc__bar {
  display: block;
  width: 64px; height: 4px;
  margin: 0 auto 1.1rem;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--gold), #F1D77A);
  transform: scaleX(0);
  transition: transform 0.7s ease 0.3s;
}
.svc--visible .svc__bar { transform: scaleX(1); }
.svc__sub { max-width: 620px; margin: 0 auto; color: #64748B; font-size: 1.05rem; line-height: 1.65; }

/* Cards */
.svc__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.svc__card {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 2.25rem 2rem 2rem;
  border-radius: var(--radius);
  border: 1px solid #E2E8F0;
  background: var(--gray-50);
}
/* Gold top edge that grows on hover */
.svc__card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--gold), #F1D77A);
  transform: scaleX(0.18);
  transform-origin: left;
  transition: transform 0.45s ease;
}
.svc__lift { transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease, border-color 0.35s ease; }
.svc--visible .svc__card.svc__lift:hover {
  transform: translateY(-8px);
  background: var(--white);
  border-color: rgba(201, 162, 39, 0.5);
  box-shadow: 0 22px 44px rgba(11, 37, 69, 0.14);
}
.svc__card:hover::before { transform: scaleX(1); }

.svc__num {
  position: absolute;
  top: 0.6rem; right: 1.2rem;
  color: rgba(11, 37, 69, 0.06);
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.svc__icon {
  display: grid;
  place-items: center;
  width: 56px; height: 56px;
  margin-bottom: 1.25rem;
  border-radius: 16px;
  background: var(--navy);
  color: var(--gold);
  transition: transform 0.35s ease, background 0.35s ease, color 0.35s ease;
}
.svc__card:hover .svc__icon {
  transform: rotate(-6deg) scale(1.08);
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
}

.svc__card h3 { margin: 0 0 0.7rem; color: var(--navy); font-size: 1.25rem; line-height: 1.3; }
.svc__desc { margin: 0 0 1.25rem; color: #475569; font-size: 0.97rem; line-height: 1.7; }

/* Feature list with check marks */
.svc__list { margin: auto 0 0; padding: 1.1rem 0 0; list-style: none; border-top: 1px dashed #CBD5E1; }
.svc__list li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.55rem;
  color: #475569;
  font-size: 0.92rem;
  transform: translateX(0);
  transition: transform 0.25s ease, color 0.25s ease;
}
.svc__list li:last-child { margin-bottom: 0; }
.svc__card:hover .svc__list li:hover { transform: translateX(4px); color: var(--navy); }
.svc__tick {
  flex: none;
  display: grid;
  place-items: center;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: rgba(201, 162, 39, 0.18);
  color: var(--gold-dark, #A98617);
}

/* Call to action under the grid */
.svc__cta { margin-top: 3rem; text-align: center; }
.svc__cta p { margin: 0 0 1rem; color: #64748B; }
.svc__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 2rem;
  border-radius: var(--radius);
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(201, 162, 39, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.svc__btn:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(201, 162, 39, 0.5); }
.svc__btn span { transition: transform 0.2s ease; }
.svc__btn:hover span { transform: translateX(4px); }
.svc__btn:focus-visible { outline: 3px solid var(--navy); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  .svc__bar, .svc__lift, .svc__icon, .svc__card::before, .svc__list li { transition: none; }
  .svc__reveal, .svc--visible .svc__reveal { opacity: 1; transform: none; animation: none; }
  .svc__bar { transform: scaleX(1); }
  .svc--visible .svc__card.svc__lift:hover, .svc__card:hover .svc__list li:hover { transform: none; }
}
`;

interface ServicesSectionProps {
  services?: ServiceItem[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services = defaultServices }) => {
  const itemsToRender = services && services.length > 0 ? services : defaultServices;

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Trigger the entrance animation when the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const timeout = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(timeout);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      className={`svc ${visible ? 'svc--visible' : ''}`}
    >
      <style>{css}</style>

      <div className="svc__inner">
        <div className="svc__head svc__reveal">
          <span className="svc__eyebrow">What We Offer</span>
          <h2 className="svc__title">Our Services</h2>
          <span className="svc__bar" aria-hidden="true" />
          <p className="svc__sub">
            Tailored academic support designed to empower your learning process.
          </p>
        </div>

        <div className="svc__grid">
          {itemsToRender.map((service, index) => (
            <div
              key={service.id}
              className="svc__card svc__lift svc__reveal"
              style={{ '--d': `${0.12 + index * 0.12}s` } as React.CSSProperties}
            >
              <span className="svc__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="svc__icon" aria-hidden="true">
                {icons[index % icons.length]}
              </span>

              <h3>{service.title}</h3>
              <p className="svc__desc">{service.description}</p>

              {service.features && service.features.length > 0 && (
                <ul className="svc__list">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="svc__tick" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5 12 5 5L20 7" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="svc__cta svc__reveal">
          <p>Not sure which service fits? Tell us what you need and we will guide you.</p>
          <a href="#contact" className="svc__btn">
            Request a Service <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;