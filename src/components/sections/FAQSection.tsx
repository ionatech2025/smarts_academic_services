import React, { useEffect, useRef, useState } from 'react';
import { whatsappLink } from '../../config/site';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Wording needs client approval before launch (SRS 9.2): confidentiality and
// delivery statements must be things the business can stand behind.
const defaultFAQs: FAQItem[] = [
  {
    id: '1',
    question: 'How do I submit an assignment or coursework inquiry?',
    answer: 'You can submit details through our contact form below or reach out directly via WhatsApp for fast responses.',
  },
  {
    id: '2',
    question: 'How are deadlines handled?',
    answer: 'When requesting support, specify your deadline. We prioritize timely delivery to align with your academic timeline.',
  },
  {
    id: '3',
    question: 'Is my information kept confidential?',
    answer: 'Yes, all client communications and submission details are strictly confidential.',
  },
];

// Scoped styles live in this file so the component stays a single copy-paste.
const css = `
.faq {
  position: relative;
  overflow: hidden;
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
  background:
    radial-gradient(ellipse 45% 40% at 100% 0%, rgba(201, 162, 39, 0.1), transparent 70%),
    radial-gradient(ellipse 45% 40% at 0% 100%, rgba(11, 37, 69, 0.07), transparent 70%),
    var(--gray-50);
}
.faq__inner { position: relative; max-width: 800px; margin: 0 auto; }

/* Reveal on scroll (animation, so hover transforms keep working afterwards) */
.faq__reveal { opacity: 0; }
.faq--visible .faq__reveal {
  opacity: 1;
  animation: faq-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
  animation-delay: var(--d, 0s);
}
@keyframes faq-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }

/* Heading */
.faq__head { text-align: center; margin-bottom: 3rem; }
.faq__eyebrow {
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
.faq__title {
  margin: 0 0 0.75rem;
  color: var(--navy);
  font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}
.faq__bar {
  display: block;
  width: 64px; height: 4px;
  margin: 0 auto 1.1rem;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--gold), #F1D77A);
  transform: scaleX(0);
  transition: transform 0.7s ease 0.3s;
}
.faq--visible .faq__bar { transform: scaleX(1); }
.faq__sub { max-width: 560px; margin: 0 auto; color: #64748B; font-size: 1.05rem; line-height: 1.65; }

/* Accordion */
.faq__list { display: flex; flex-direction: column; gap: 1rem; }
.faq__item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--white);
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(11, 37, 69, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
/* Gold bar down the left edge, grows when open or hovered */
.faq__item::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--gold), #F1D77A);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.35s ease;
}
.faq__item:hover { border-color: rgba(201, 162, 39, 0.45); box-shadow: 0 10px 26px rgba(11, 37, 69, 0.09); }
.faq__item:hover::before { transform: scaleY(0.4); }
.faq__item--open {
  border-color: rgba(201, 162, 39, 0.6);
  box-shadow: 0 16px 36px rgba(11, 37, 69, 0.12);
}
.faq__item--open::before, .faq__item--open:hover::before { transform: scaleY(1); }

.faq__q {
  all: unset;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.4rem;
  cursor: pointer;
  color: var(--navy);
  font-size: 1.02rem;
  font-weight: 700;
  line-height: 1.4;
}
.faq__q:focus-visible { outline: 3px solid var(--gold); outline-offset: -3px; border-radius: var(--radius); }
.faq__num {
  flex: none;
  color: var(--gold-dark, #A98617);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.06em;
}
.faq__qtext { flex: 1; }

/* Plus icon that turns into a minus */
.faq__icon {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(11, 37, 69, 0.07);
  color: var(--navy);
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
}
.faq__icon::before, .faq__icon::after {
  content: "";
  position: absolute;
  width: 14px; height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.3s ease;
}
.faq__icon::after { transform: rotate(90deg); }
.faq__q:hover .faq__icon { background: rgba(201, 162, 39, 0.25); }
.faq__item--open .faq__icon {
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
  transform: rotate(180deg);
}
.faq__item--open .faq__icon::after { transform: rotate(0deg); }

/* Smooth open/close without measuring heights */
.faq__body {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows 0.4s ease, visibility 0s linear 0.4s;
}
.faq__item--open .faq__body {
  grid-template-rows: 1fr;
  visibility: visible;
  transition: grid-template-rows 0.4s ease, visibility 0s;
}
.faq__body-inner { overflow: hidden; }
.faq__a {
  margin: 0;
  padding: 0 1.4rem 1.4rem 3.4rem;
  color: #475569;
  font-size: 0.97rem;
  line-height: 1.75;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s;
}
.faq__item--open .faq__a { opacity: 1; transform: none; }

/* "Still have questions?" card */
.faq__more {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  margin-top: 2.75rem;
  padding: 2rem 1.5rem;
  border-radius: var(--radius);
  text-align: center;
  color: var(--white);
  background:
    radial-gradient(ellipse 70% 60% at 100% 0%, rgba(201, 162, 39, 0.28), transparent 65%),
    linear-gradient(165deg, var(--navy) 0%, var(--navy-dark) 100%);
  box-shadow: 0 20px 44px rgba(11, 37, 69, 0.22);
}
.faq__more h3 { margin: 0 0 0.4rem; color: var(--gold); font-size: 1.3rem; }
.faq__more p { margin: 0 0 1.25rem; color: #B4C0D4; }
.faq__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.9rem; }
.faq__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.8rem 1.6rem;
  border-radius: var(--radius);
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.faq__btn:hover { transform: translateY(-3px); }
.faq__btn--gold {
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
  box-shadow: 0 6px 20px rgba(201, 162, 39, 0.35);
}
.faq__btn--gold:hover { box-shadow: 0 10px 28px rgba(201, 162, 39, 0.5); }
.faq__btn--wa {
  background: #25D366;
  color: #fff;
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
}
.faq__btn--wa:hover { background: #1FB95A; box-shadow: 0 10px 26px rgba(37, 211, 102, 0.45); }
.faq__btn:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }

@media (max-width: 520px) {
  .faq__num { display: none; }
  .faq__a { padding-left: 1.4rem; }
  .faq__q { padding: 1.1rem 1rem 1.1rem 1.25rem; }
  .faq__btn { width: 100%; justify-content: center; }
}

@media (prefers-reduced-motion: reduce) {
  .faq__bar, .faq__item, .faq__item::before, .faq__icon, .faq__icon::before, .faq__icon::after,
  .faq__body, .faq__a, .faq__btn { transition: none !important; }
  .faq__reveal, .faq--visible .faq__reveal { opacity: 1; transform: none; animation: none; }
  .faq__bar { transform: scaleX(1); }
}
`;

interface FAQSectionProps {
  faqs?: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs = defaultFAQs }) => {
  const list = faqs && faqs.length > 0 ? faqs : defaultFAQs;
  const [openId, setOpenId] = useState<string | null>(null);

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

  const d = (s: string) => ({ '--d': s } as React.CSSProperties);

  return (
    <section
      id="faq"
      ref={ref}
      className={`faq ${visible ? 'faq--visible' : ''}`}
    >
      <style>{css}</style>

      <div className="faq__inner">
        <div className="faq__head faq__reveal">
          <span className="faq__eyebrow">Got Questions?</span>
          <h2 className="faq__title">Frequently Asked Questions</h2>
          <span className="faq__bar" aria-hidden="true" />
          <p className="faq__sub">
            Find answers to common questions about our services and process.
          </p>
        </div>

        <div className="faq__list">
          {list.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq__item faq__reveal ${isOpen ? 'faq__item--open' : ''}`}
                style={d(`${0.1 + index * 0.1}s`)}
              >
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    className="faq__q"
                    id={`faq-q-${faq.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${faq.id}`}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                  >
                    <span className="faq__num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="faq__qtext">{faq.question}</span>
                    <span className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="faq__body"
                  id={`faq-a-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-q-${faq.id}`}
                >
                  <div className="faq__body-inner">
                    <p className="faq__a">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq__more faq__reveal" style={d(`${0.2 + list.length * 0.1}s`)}>
          <h3>Still have questions?</h3>
          <p>We are happy to help. Send us a message and we will get back to you.</p>
          <div className="faq__actions">
            <a href="#contact" className="faq__btn faq__btn--gold">
              Request a Service <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              className="faq__btn faq__btn--wa"
              href={whatsappLink('Hello, I have a question about your services.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true" fill="currentColor">
                <path d="M16.002 3C9.373 3 4 8.373 4 15c0 2.385.697 4.607 1.894 6.48L4 29l7.7-1.84A11.94 11.94 0 0 0 16.002 27C22.63 27 28 21.627 28 15S22.63 3 16.002 3Zm5.38 14.47c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
              </svg>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;