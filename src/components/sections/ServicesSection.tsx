import React, { useEffect, useRef, useState } from 'react';
import type { Service } from '../../data/servicesData';
import { services as defaultServicesList, fallbackImages as defaultFallbackImages } from '../../data/servicesData';


const localFallbackImages = [
  '/chemistry.jpeg',
  '/maths.jpeg',
  '/nursing.jpeg',
  '/online.jpeg',
  '/plagiarism.jpeg',
];

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
.svc__inner { position: relative; max-width: 1200px; margin: 0 auto; }

.svc__reveal { opacity: 0; }
.svc--visible .svc__reveal {
  opacity: 1;
  transform: none;
  animation: svc-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
  animation-delay: var(--d, 0s);
}
@keyframes svc-rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }

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

.svc__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}
.svc__card {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid #E2E8F0;
  background: var(--gray-50);
}

.svc__card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  z-index: 2;
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

.svc__img-wrap {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: var(--navy);
}
.svc__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.svc__card:hover .svc__img {
  transform: scale(1.08);
}
.svc__img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(11, 37, 69, 0.6) 0%, transparent 60%);
}

.svc__num {
  position: absolute;
  top: 0.6rem; right: 1rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1;
  z-index: 2;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  pointer-events: none;
  user-select: none;
}

.svc__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.75rem 1.5rem 1.5rem;
}

.svc__card h3 { margin: 0 0 0.7rem; color: var(--navy); font-size: 1.25rem; line-height: 1.3; }
.svc__desc { margin: 0 0 1.25rem; color: #475569; font-size: 0.95rem; line-height: 1.65; }

.svc__list { margin: auto 0 0; padding: 1rem 0 0; list-style: none; border-top: 1px dashed #CBD5E1; }
.svc__list li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.55rem;
  color: #475569;
  font-size: 0.9rem;
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

.svc__cta { margin-top: 3.5rem; text-align: center; }
.svc__cta p { margin: 0 0 1rem; color: #64748B; font-size: 1.05rem; }
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
  .svc__bar, .svc__lift, .svc__img, .svc__card::before, .svc__list li { transition: none; }
  .svc__reveal, .svc--visible .svc__reveal { opacity: 1; transform: none; animation: none; }
  .svc__bar { transform: scaleX(1); }
  .svc--visible .svc__card.svc__lift:hover, .svc__card:hover .svc__list li:hover { transform: none; }
}
`;

interface ServicesSectionProps {
  servicesList?: Service[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ servicesList = defaultServicesList }) => {
  const itemsToRender = servicesList && servicesList.length > 0 ? servicesList : defaultServicesList;
  const fallbacks = defaultFallbackImages && defaultFallbackImages.length > 0 ? defaultFallbackImages : localFallbackImages;

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
          {itemsToRender.map((item, index) => {
            const imgSrc =
              item.image ||
              defaultServicesList[index]?.image ||
              fallbacks[index % fallbacks.length];

            return (
              <div
                key={`svc-${index}`}
                className="svc__card svc__lift svc__reveal"
                style={{ '--d': `${(0.1 + index * 0.08).toFixed(2)}s` } as React.CSSProperties}
              >
                <div className="svc__img-wrap">
                  <img
                    src={imgSrc}
                    alt={item.title}
                    className="svc__img"
                    loading="lazy"
                  />
                  <div className="svc__img-overlay" aria-hidden="true" />
                  <span className="svc__num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="svc__body">
                  <h3>{item.title}</h3>
                  <p className="svc__desc">{item.description}</p>

                  {item.features && item.features.length > 0 && (
                    <ul className="svc__list">
                      {item.features.map((feature, idx) => (
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
              </div>
            );
          })}
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