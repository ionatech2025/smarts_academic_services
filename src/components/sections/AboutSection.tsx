import React, { useEffect, useRef, useState } from 'react';

// Scoped styles live in this file so the component stays a single copy-paste.
const css = `
.abt {
  position: relative;
  overflow: hidden;
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
  background:
    radial-gradient(ellipse 50% 40% at 100% 0%, rgba(201, 162, 39, 0.08), transparent 70%),
    radial-gradient(ellipse 50% 40% at 0% 100%, rgba(11, 37, 69, 0.06), transparent 70%),
    var(--white);
}
.abt__inner { position: relative; max-width: 1000px; margin: 0 auto; }

/* Reveal on scroll */
.abt__reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.abt--visible .abt__reveal { opacity: 1; transform: translateY(0); }
.abt--visible .abt__reveal--2 { transition-delay: 0.15s; }
.abt--visible .abt__reveal--3 { transition-delay: 0.3s; }

/* Heading */
.abt__head { text-align: center; margin-bottom: 3.25rem; }
.abt__eyebrow {
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
.abt__title {
  margin: 0 0 0.75rem;
  color: var(--navy);
  font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}
.abt__bar {
  display: block;
  width: 64px; height: 4px;
  margin: 0 auto 1.1rem;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--gold), #F1D77A);
  transform: scaleX(0);
  transition: transform 0.7s ease 0.3s;
}
.abt--visible .abt__bar { transform: scaleX(1); }
.abt__sub {
  max-width: 600px;
  margin: 0 auto;
  color: #64748B;
  font-size: 1.05rem;
  line-height: 1.65;
}

/* Cards */
.abt__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
.abt__card {
  position: relative;
  overflow: hidden;
  padding: 2.25rem 2rem 2rem;
  border-radius: var(--radius);
  background: var(--gray-50);
  border: 1px solid var(--gray-200, #E3E8EF);
  border-left: 4px solid var(--navy);
}
.abt__card--gold { border-left-color: var(--gold); }

/* Hover lift, kept off the reveal transition so both can run */
.abt__lift { transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease; }
.abt--visible .abt__card.abt__lift:hover {
  transform: translateY(-6px);
  background: var(--white);
  box-shadow: 0 18px 40px rgba(11, 37, 69, 0.12);
}

/* Big faint number watermark */
.abt__num {
  position: absolute;
  top: 0.4rem; right: 1.2rem;
  color: rgba(11, 37, 69, 0.06);
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.abt__icon {
  display: grid;
  place-items: center;
  width: 52px; height: 52px;
  margin-bottom: 1.1rem;
  border-radius: 14px;
  background: var(--navy);
  color: var(--gold);
  transition: transform 0.3s ease;
}
.abt__card--gold .abt__icon { background: linear-gradient(135deg, #E3BC3B, var(--gold)); color: var(--navy-dark); }
.abt__card:hover .abt__icon { transform: rotate(-6deg) scale(1.08); }

.abt__card h3 { margin: 0 0 0.6rem; color: var(--navy); font-size: 1.25rem; }
.abt__card p { margin: 0; color: var(--text); font-size: 0.96rem; line-height: 1.7; }

@media (prefers-reduced-motion: reduce) {
  .abt__reveal, .abt__bar, .abt__lift, .abt__icon { transition: none; }
  .abt__reveal { opacity: 1; transform: none; }
  .abt__bar { transform: scaleX(1); }
  .abt--visible .abt__card.abt__lift:hover { transform: none; }
}
`;

export const AboutSection: React.FC = () => {
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className={`abt ${visible ? 'abt--visible' : ''}`}
    >
      <style>{css}</style>

      <div className="abt__inner">
        <div className="abt__head abt__reveal">
          <span className="abt__eyebrow">Who We Are</span>
          <h2 className="abt__title">About Us</h2>
          <span className="abt__bar" aria-hidden="true" />
          <p className="abt__sub">
            Elevating higher education success through expert guidance and academic resources.
          </p>
        </div>

        <div className="abt__grid">
          <div className="abt__card abt__lift abt__reveal abt__reveal--2">
            <span className="abt__num" aria-hidden="true">01</span>
            <span className="abt__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9l10-5 10 5-10 5L2 9z" />
                <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
                <path d="M22 9v6" />
              </svg>
            </span>
            <h3>Academic Credibility</h3>
            <p>
              We specialize in college and university course support across diverse disciplines. Our team delivers thorough model solutions and concept coaching tailored to higher education standards.
            </p>
          </div>

          <div className="abt__card abt__card--gold abt__lift abt__reveal abt__reveal--3">
            <span className="abt__num" aria-hidden="true">02</span>
            <span className="abt__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </svg>
            </span>
            <h3>Our Core Mission</h3>
            <p>
              To empower students with clarity, structured review guidance, and reliable coursework assistance while preserving the highest standards of academic integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;