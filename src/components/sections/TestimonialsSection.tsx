import React, { useEffect, useRef, useState } from 'react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

// IMPORTANT: publish ONLY real testimonials the client has approved (SRS 7.6).
// Replace these placeholders with genuine, approved feedback before launch.
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Smarts Academic Services helped me stay on top of my nursing coursework during a demanding clinical rotation.',
    author: 'Sarah M.',
    role: 'Nursing Student',
  },
  {
    id: '2',
    quote: 'Clear step-by-step guidance on complex calculus concepts. Highly responsive and professional support.',
    author: 'David K.',
    role: 'Engineering Major',
  },
];

// "Sarah M." -> "SM", "David Kato" -> "DK"
const initialsOf = (name: string): string =>
  name
    .replace(/[^\p{L}\s]/gu, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

// Scoped styles live in this file so the component stays a single copy-paste.
const css = `
.tst {
  position: relative;
  overflow: hidden;
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
  background:
    radial-gradient(ellipse 45% 40% at 0% 0%, rgba(201, 162, 39, 0.09), transparent 70%),
    radial-gradient(ellipse 45% 40% at 100% 100%, rgba(11, 37, 69, 0.06), transparent 70%),
    var(--white);
}
.tst__inner { position: relative; max-width: 1100px; margin: 0 auto; }

/* Reveal on scroll (animation, so hover transforms keep working afterwards) */
.tst__reveal { opacity: 0; }
.tst--visible .tst__reveal {
  opacity: 1;
  animation: tst-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
  animation-delay: var(--d, 0s);
}
@keyframes tst-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }

/* Heading */
.tst__head { text-align: center; margin-bottom: 3.25rem; }
.tst__eyebrow {
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
.tst__title {
  margin: 0 0 0.75rem;
  color: var(--navy);
  font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}
.tst__bar {
  display: block;
  width: 64px; height: 4px;
  margin: 0 auto 1.1rem;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--gold), #F1D77A);
  transform: scaleX(0);
  transition: transform 0.7s ease 0.3s;
}
.tst--visible .tst__bar { transform: scaleX(1); }
.tst__sub { max-width: 620px; margin: 0 auto; color: #64748B; font-size: 1.05rem; line-height: 1.65; }

/* Cards */
.tst__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.tst__card {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
  padding: 2.5rem 2rem 2rem;
  border-radius: var(--radius);
  background: var(--gray-50);
  border: 1px solid #E2E8F0;
  border-top: 4px solid var(--gold);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease;
}
.tst--visible .tst__card:hover {
  transform: translateY(-8px);
  background: var(--white);
  border-color: rgba(201, 162, 39, 0.5);
  box-shadow: 0 22px 44px rgba(11, 37, 69, 0.14);
}

/* Large decorative quote mark */
.tst__mark {
  position: absolute;
  top: 0.4rem; right: 1.25rem;
  color: rgba(201, 162, 39, 0.22);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 6.5rem;
  font-weight: 700;
  line-height: 1;
  pointer-events: none;
  user-select: none;
  transition: transform 0.4s ease, color 0.4s ease;
}
.tst__card:hover .tst__mark { transform: scale(1.12) rotate(-4deg); color: rgba(201, 162, 39, 0.4); }

.tst__quote {
  position: relative;
  margin: 0 0 1.75rem;
  color: #334155;
  font-size: 1.02rem;
  font-style: italic;
  line-height: 1.75;
}

.tst__who {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px dashed #CBD5E1;
}
.tst__avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 48px; height: 48px;
  border-radius: 50%;
  background: var(--navy);
  color: var(--gold);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.2);
  transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
}
.tst__card:hover .tst__avatar {
  transform: scale(1.08);
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
}
.tst__author { display: block; color: var(--navy); font-style: normal; font-weight: 700; }
.tst__role { display: block; margin-top: 0.1rem; color: #64748B; font-size: 0.85rem; }

/* Call to action */
.tst__cta { margin-top: 3rem; text-align: center; }
.tst__cta p { margin: 0 0 1rem; color: #64748B; }
.tst__btn {
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
.tst__btn:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(201, 162, 39, 0.5); }
.tst__btn span { transition: transform 0.2s ease; }
.tst__btn:hover span { transform: translateX(4px); }
.tst__btn:focus-visible { outline: 3px solid var(--navy); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  .tst__bar, .tst__card, .tst__mark, .tst__avatar { transition: none; }
  .tst__reveal, .tst--visible .tst__reveal { opacity: 1; transform: none; animation: none; }
  .tst__bar { transform: scaleX(1); }
  .tst--visible .tst__card:hover { transform: none; }
}
`;

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials = defaultTestimonials }) => {
  const list = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

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
      id="testimonials"
      ref={ref}
      className={`tst ${visible ? 'tst--visible' : ''}`}
    >
      <style>{css}</style>

      <div className="tst__inner">
        <div className="tst__head tst__reveal">
          <span className="tst__eyebrow">Student Voices</span>
          <h2 className="tst__title">Client Testimonials</h2>
          <span className="tst__bar" aria-hidden="true" />
          <p className="tst__sub">
            See how we have supported students in reaching their academic goals.
          </p>
        </div>

        <div className="tst__grid">
          {list.map((item, index) => (
            <figure
              key={item.id}
              className="tst__card tst__reveal"
              style={{ '--d': `${0.12 + index * 0.14}s` } as React.CSSProperties}
            >
              <span className="tst__mark" aria-hidden="true">&ldquo;</span>

              <blockquote className="tst__quote" style={{ margin: '0 0 1.75rem' }}>
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <figcaption className="tst__who">
                <span className="tst__avatar" aria-hidden="true">{initialsOf(item.author)}</span>
                <span>
                  <cite className="tst__author">{item.author}</cite>
                  <span className="tst__role">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="tst__cta tst__reveal" style={{ '--d': '0.3s' } as React.CSSProperties}>
          <p>Ready for support of your own?</p>
          <a href="#contact" className="tst__btn">
            Request a Service <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;