import React, { useEffect, useRef, useState } from 'react';

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

// One decorative icon per step, in order.
const stepIcons: React.ReactNode[] = [
  // form / request
  <svg key="i1" {...svgProps}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>,
  // paperclip / files
  <svg key="i2" {...svgProps}>
    <path d="m21 11-8.6 8.6a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-8.6 8.6a2 2 0 0 1-3-3L15 7" />
  </svg>,
  // handshake-ish / review: shield with check
  <svg key="i3" {...svgProps}>
    <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // delivered / sparkle star
  <svg key="i4" {...svgProps}>
    <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7Z" />
  </svg>,
];

// Scoped styles live in this file so the component stays a single copy-paste.
const css = `
.hiw {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
  color: var(--white);
  background:
    radial-gradient(ellipse 60% 45% at 50% 0%, rgba(201, 162, 39, 0.16), transparent 65%),
    linear-gradient(170deg, var(--navy) 0%, var(--navy-dark) 100%);
}
/* Faint grid */
.hiw::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
  mask-image: radial-gradient(ellipse at center, #000 25%, transparent 75%);
}
.hiw__inner { position: relative; max-width: 1100px; margin: 0 auto; }

/* Reveal on scroll (animation, so hover transforms keep working afterwards) */
.hiw__reveal { opacity: 0; }
.hiw--visible .hiw__reveal {
  opacity: 1;
  animation: hiw-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
  animation-delay: var(--d, 0s);
}
@keyframes hiw-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }

/* Heading */
.hiw__head { text-align: center; margin-bottom: 3.75rem; }
.hiw__eyebrow {
  display: inline-block;
  margin-bottom: 0.75rem;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: rgba(201, 162, 39, 0.12);
  color: var(--gold);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hiw__title {
  margin: 0 0 0.75rem;
  color: var(--white);
  font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}
.hiw__bar {
  display: block;
  width: 64px; height: 4px;
  margin: 0 auto 1.1rem;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--gold), #F1D77A);
  transform: scaleX(0);
  transition: transform 0.7s ease 0.3s;
}
.hiw--visible .hiw__bar { transform: scaleX(1); }
.hiw__sub { max-width: 620px; margin: 0 auto; color: #B4C0D4; font-size: 1.05rem; line-height: 1.65; }

/* Steps: stacked with a vertical line on mobile */
.hiw__grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
.hiw__step {
  position: relative;
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 1rem;
  align-items: start;
}

.hiw__badge {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 56px; height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
  box-shadow: 0 0 0 6px rgba(201, 162, 39, 0.16), 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hiw__step:hover .hiw__badge {
  transform: scale(1.1) rotate(-6deg);
  box-shadow: 0 0 0 10px rgba(201, 162, 39, 0.22), 0 10px 26px rgba(0, 0, 0, 0.35);
}

/* Connector line between steps (drawn when visible) */
.hiw__step:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 27px; top: 56px;
  bottom: -1.5rem;
  width: 2px;
  background: linear-gradient(180deg, var(--gold), rgba(201, 162, 39, 0.15));
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.8s ease;
  transition-delay: calc(var(--d, 0s) + 0.4s);
}
.hiw--visible .hiw__step:not(:last-child)::after { transform: scaleY(1); }

.hiw__card {
  position: relative;
  overflow: hidden;
  padding: 1.5rem 1.5rem 1.6rem;
  border-radius: var(--radius);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.hiw--visible .hiw__step:hover .hiw__card {
  transform: translateY(-6px);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(201, 162, 39, 0.55);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.hiw__num {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--gold);
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;
}
.hiw__card h3 { margin: 0 0 0.5rem; color: var(--white); font-size: 1.1rem; line-height: 1.3; }
.hiw__card p { margin: 0; color: #B4C0D4; font-size: 0.92rem; line-height: 1.65; }

/* Call to action */
.hiw__cta { margin-top: 3.5rem; text-align: center; }
.hiw__cta p { margin: 0 0 1rem; color: #B4C0D4; }
.hiw__btn {
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
.hiw__btn:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(201, 162, 39, 0.5); }
.hiw__btn span { transition: transform 0.2s ease; }
.hiw__btn:hover span { transform: translateX(4px); }
.hiw__btn:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }

/* Tablet: two columns, no connector */
@media (min-width: 640px) {
  .hiw__grid { grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; }
  .hiw__step { grid-template-columns: 1fr; gap: 0; }
  .hiw__step:not(:last-child)::after { display: none; }
  .hiw__badge { margin: 0 0 -28px 1.5rem; }
  .hiw__card { padding-top: 2.4rem; }
}

/* Desktop: four columns joined by a horizontal line */
@media (min-width: 1000px) {
  .hiw__grid { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
  .hiw__badge { margin: 0 auto -28px; }
  .hiw__card { text-align: center; }
  .hiw__step:not(:last-child)::after {
    display: block;
    left: calc(50% + 28px);
    top: 27px;
    bottom: auto;
    width: calc(100% + 1.5rem - 56px);
    height: 2px;
    background: linear-gradient(90deg, var(--gold), rgba(201, 162, 39, 0.25));
    transform: scaleX(0);
    transform-origin: left;
  }
  .hiw--visible .hiw__step:not(:last-child)::after { transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
  .hiw__bar, .hiw__badge, .hiw__card, .hiw__step::after { transition: none !important; }
  .hiw__reveal, .hiw--visible .hiw__reveal { opacity: 1; transform: none; animation: none; }
  .hiw__bar { transform: scaleX(1); }
  .hiw--visible .hiw__step:hover .hiw__card, .hiw__step:hover .hiw__badge { transform: none; }
}
`;

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Submit Service Request',
      desc: 'Fill in the service request form with your course details, preferred deadline, and requirements.',
    },
    {
      num: '02',
      title: 'Send Supporting Files',
      desc: 'Forward syllabus, instructions, or supporting documents directly via WhatsApp or email.',
    },
    {
      num: '03',
      title: 'Review & Terms Agreement',
      desc: 'Our team evaluates the scope, timelines, and commercial details before confirming the engagement.',
    },
    {
      num: '04',
      title: 'Service Fulfillment',
      desc: 'Receive comprehensive model solutions, review feedback, or tutoring support right on schedule.',
    },
  ];

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Trigger the entrance animation when the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const timeout = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timeout);
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
      id="how-it-works"
      ref={ref}
      className={`hiw ${visible ? 'hiw--visible' : ''}`}
    >
      <style>{css}</style>

      <div className="hiw__inner">
        <div className="hiw__head hiw__reveal">
          <span className="hiw__eyebrow">Simple Process</span>
          <h2 className="hiw__title">How It Works</h2>
          <span className="hiw__bar" aria-hidden="true" />
          <p className="hiw__sub">
            A streamlined 4-step process designed to make getting academic assistance simple and efficient.
          </p>
        </div>

        <ol className="hiw__grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {steps.map((s, index) => (
            <li
              key={s.num}
              className="hiw__step hiw__reveal"
              style={{ '--d': `${0.15 + index * 0.15}s` } as React.CSSProperties}
            >
              <span className="hiw__badge" aria-hidden="true">
                {stepIcons[index % stepIcons.length]}
              </span>
              <div className="hiw__card">
                <span className="hiw__num" aria-hidden="true">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="hiw__cta hiw__reveal" style={{ '--d': '0.8s' } as React.CSSProperties}>
          <p>Ready to begin? It only takes a minute to send your request.</p>
          <a href="#contact" className="hiw__btn">
            Get Started <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;