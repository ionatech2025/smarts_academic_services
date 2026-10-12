import React, { useEffect, useRef, useState } from 'react';

interface Subject {
  id: string;
  name: string;
  category: string;
}

const defaultSubjects: Subject[] = [
  { id: '1', name: 'Nursing & Healthcare', category: 'Medical Sciences' },
  { id: '2', name: 'Calculus & Linear Algebra', category: 'Mathematics' },
  { id: '3', name: 'Computer Science & Coding', category: 'Technology' },
  { id: '4', name: 'Edgenuity / Online Modules', category: 'Coursework' },
  { id: '5', name: 'Business Administration', category: 'Management' },
  { id: '6', name: 'Psychology & Humanities', category: 'Social Sciences' },
];

// Decorative icons (24x24, stroke based).
const svgProps = {
  viewBox: '0 0 24 24',
  width: 26,
  height: 26,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const icons = {
  medical: (
    <svg {...svgProps}>
      <path d="M12 21s-7-4.4-9-9.2C1.8 8.6 3.6 5 7 5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.4 0 5.2 3.6 4 6.8-2 4.8-9 9.2-9 9.2Z" />
      <path d="M12 9v6M9 12h6" />
    </svg>
  ),
  math: (
    <svg {...svgProps}>
      <path d="M5 4h14M5 20h14M16 4 9 12l7 8" />
    </svg>
  ),
  tech: (
    <svg {...svgProps}>
      <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />
    </svg>
  ),
  coursework: (
    <svg {...svgProps}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  business: (
    <svg {...svgProps}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </svg>
  ),
  social: (
    <svg {...svgProps}>
      <path d="M12 3a6 6 0 0 0-6 6c0 2 .9 3.2 2 4.2V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.8c1.1-1 2-2.2 2-4.2a6 6 0 0 0-6-6Z" />
      <path d="M10 22h4" />
    </svg>
  ),
  book: (
    <svg {...svgProps}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5Z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </svg>
  ),
};

// Pick an icon from the category text; unknown categories get a book.
const iconFor = (category: string): React.ReactNode => {
  const c = category.toLowerCase();
  if (/(medic|health|nurs|bio|anat)/.test(c)) return icons.medical;
  if (/(math|stat|physic|chem)/.test(c)) return icons.math;
  if (/(tech|comput|cod|engineer)/.test(c)) return icons.tech;
  if (/(course|online|module|platform)/.test(c)) return icons.coursework;
  if (/(manage|business|financ|account|econ)/.test(c)) return icons.business;
  if (/(social|psych|human|art|educat)/.test(c)) return icons.social;
  return icons.book;
};

// Scoped styles live in this file so the component stays a single copy-paste.
const css = `
.sub {
  position: relative;
  overflow: hidden;
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
  background:
    radial-gradient(ellipse 45% 40% at 100% 0%, rgba(201, 162, 39, 0.1), transparent 70%),
    radial-gradient(ellipse 45% 40% at 0% 100%, rgba(11, 37, 69, 0.07), transparent 70%),
    var(--gray-50);
}
.sub__inner { position: relative; max-width: 1100px; margin: 0 auto; }

/* Reveal on scroll (animation, so hover transforms keep working afterwards) */
.sub__reveal { opacity: 0; }
.sub--visible .sub__reveal {
  opacity: 1;
  transform: none;
  animation: sub-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
  animation-delay: var(--d, 0s);
}
@keyframes sub-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }

/* Heading */
.sub__head { text-align: center; margin-bottom: 3.25rem; }
.sub__eyebrow {
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
.sub__title {
  margin: 0 0 0.75rem;
  color: var(--navy);
  font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}
.sub__bar {
  display: block;
  width: 64px; height: 4px;
  margin: 0 auto 1.1rem;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--gold), #F1D77A);
  transform: scaleX(0);
  transition: transform 0.7s ease 0.3s;
}
.sub--visible .sub__bar { transform: scaleX(1); }
.sub__sub { max-width: 620px; margin: 0 auto; color: #64748B; font-size: 1.05rem; line-height: 1.65; }

/* Cards */
.sub__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}
.sub__card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  padding: 1.4rem 1.25rem;
  border-radius: var(--radius);
  border: 1px solid #E2E8F0;
  background: var(--white);
  box-shadow: 0 1px 3px rgba(11, 37, 69, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
/* Gold edge that slides in on hover */
.sub__card::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--gold), #F1D77A);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.35s ease;
}
.sub--visible .sub__card:hover {
  transform: translateY(-6px);
  border-color: rgba(201, 162, 39, 0.5);
  box-shadow: 0 18px 38px rgba(11, 37, 69, 0.13);
}
.sub__card:hover::before { transform: scaleY(1); }

.sub__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 52px; height: 52px;
  border-radius: 14px;
  background: var(--navy);
  color: var(--gold);
  transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
}
.sub__card:hover .sub__icon {
  transform: rotate(-6deg) scale(1.08);
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
}

.sub__text { min-width: 0; flex: 1; }
.sub__cat {
  display: block;
  color: var(--gold-dark, #A98617);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}
.sub__name { margin: 0.25rem 0 0; color: var(--navy); font-size: 1.05rem; line-height: 1.3; }

.sub__arrow {
  flex: none;
  color: var(--gold-dark, #A98617);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.sub__card:hover .sub__arrow { opacity: 1; transform: translateX(0); }

/* Call to action */
.sub__cta { margin-top: 3rem; text-align: center; }
.sub__cta p { margin: 0 0 1rem; color: #64748B; }
.sub__btn {
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
.sub__btn:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(201, 162, 39, 0.5); }
.sub__btn span { transition: transform 0.2s ease; }
.sub__btn:hover span { transform: translateX(4px); }
.sub__btn:focus-visible { outline: 3px solid var(--navy); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  .sub__bar, .sub__card, .sub__card::before, .sub__icon, .sub__arrow { transition: none; }
  .sub__reveal, .sub--visible .sub__reveal { opacity: 1; transform: none; animation: none; }
  .sub__bar { transform: scaleX(1); }
  .sub--visible .sub__card:hover { transform: none; }
}
`;

interface SubjectsSectionProps {
  subjects?: Subject[];
}

export const SubjectsSection: React.FC<SubjectsSectionProps> = ({ subjects = defaultSubjects }) => {
  const list = subjects && subjects.length > 0 ? subjects : defaultSubjects;

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Trigger the entrance animation when the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('sub--visible');
      return;
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
      id="subjects"
      ref={ref}
      className={`sub ${visible ? 'sub--visible' : ''}`}
    >
      <style>{css}</style>

      <div className="sub__inner">
        <div className="sub__head sub__reveal">
          <span className="sub__eyebrow">Areas of Support</span>
          <h2 className="sub__title">Subjects &amp; Disciplines</h2>
          <span className="sub__bar" aria-hidden="true" />
          <p className="sub__sub">Expert support across a wide range of academic fields.</p>
        </div>

        <div className="sub__grid">
          {list.map((item, index) => (
            <div
              key={item.id}
              className="sub__card sub__reveal"
              style={{ '--d': `${0.1 + index * 0.08}s` } as React.CSSProperties}
            >
              <span className="sub__icon" aria-hidden="true">
                {iconFor(item.category)}
              </span>
              <div className="sub__text">
                <span className="sub__cat">{item.category}</span>
                <h3 className="sub__name">{item.name}</h3>
              </div>
              <span className="sub__arrow" aria-hidden="true">&rarr;</span>
            </div>
          ))}
        </div>

        <div className="sub__cta sub__reveal" style={{ '--d': '0.3s' } as React.CSSProperties}>
          <p>Don&rsquo;t see your course? We support other college and university courses too.</p>
          <a href="#contact" className="sub__btn">
            Request a Service <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;