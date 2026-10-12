import React, { useEffect, useRef, useState } from 'react';
import { site, whatsappLink } from '../../config/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  subject: string; // the course / subject the student needs help with
  deadline: string;
  message: string;
}

const emptyForm: FormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  subject: '',
  deadline: '',
  message: '',
};

// Service options mirror the cards in ServicesSection, plus "Other".
const serviceOptions = [
  'Academic Writing & Research Support',
  'Coursework & Assignment Guidance',
  'Exam Preparation & Review',
  'Other',
];

// Suggestions for the free-text course field (students can still type anything).
const subjectSuggestions = [
  'Math & Statistics',
  'Anatomy & Physiology',
  'Biology & Microbiology',
  'Chemistry',
  'Physics',
  'Nursing',
  'RN-BSN',
  'Edgenuity',
  'Acellus',
  'Nursing & Healthcare',
  'Calculus & Linear Algebra',
  'Computer Science & Coding',
  'Business Administration',
  'Psychology & Humanities',
  'Other College & University Course',
];

const WA_GREETING = 'Hello, I am reaching out from your website to request service support.';
const WA_DOCS = 'Hello, I have just submitted a request on your website and would like to send my supporting documents.';

// Local-time YYYY-MM-DD, so "today" is correct for the visitor's timezone.
const todayString = (): string => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

type Errors = Partial<Record<keyof FormData, string>>;

const validate = (f: FormData): Errors => {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (!/^\+?[0-9\s\-()]{7,20}$/.test(f.phone.trim())) e.phone = 'Enter a valid number, e.g. +256 700 000 000.';
  if (!f.service) e.service = 'Please choose the service you need.';
  if (f.subject.trim().length < 2) e.subject = 'Tell us the subject or course.';
  if (!f.deadline) e.deadline = 'Please pick a deadline.';
  else if (f.deadline < todayString()) e.deadline = 'The deadline cannot be in the past.';
  if (f.message.trim().length < 10) e.message = 'Please add a few details (at least 10 characters).';
  return e;
};

const svgBase = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const WaIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" fill="currentColor">
    <path d="M16.002 3C9.373 3 4 8.373 4 15c0 2.385.697 4.607 1.894 6.48L4 29l7.7-1.84A11.94 11.94 0 0 0 16.002 27C22.63 27 28 21.627 28 15S22.63 3 16.002 3Zm5.38 14.47c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
  </svg>
);

// Scoped styles live in this file so the component stays a single copy-paste.
const css = `
.cnt {
  position: relative;
  overflow: hidden;
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
  background:
    radial-gradient(ellipse 45% 35% at 100% 0%, rgba(201, 162, 39, 0.1), transparent 70%),
    radial-gradient(ellipse 45% 35% at 0% 100%, rgba(11, 37, 69, 0.08), transparent 70%),
    var(--gray-50);
}
.cnt__inner { position: relative; max-width: 1100px; margin: 0 auto; }

/* Reveal on scroll (animation, so hover transforms keep working afterwards) */
.cnt__reveal { opacity: 0; }
.cnt--visible .cnt__reveal {
  opacity: 1;
  animation: cnt-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
  animation-delay: var(--d, 0s);
}
@keyframes cnt-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }

/* Heading */
.cnt__head { text-align: center; margin-bottom: 3.25rem; }
.cnt__eyebrow {
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
.cnt__title {
  margin: 0 0 0.75rem;
  color: var(--navy);
  font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}
.cnt__bar {
  display: block;
  width: 64px; height: 4px;
  margin: 0 auto 1.1rem;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--gold), #F1D77A);
  transform: scaleX(0);
  transition: transform 0.7s ease 0.3s;
}
.cnt--visible .cnt__bar { transform: scaleX(1); }
.cnt__sub { max-width: 620px; margin: 0 auto; color: #64748B; font-size: 1.05rem; line-height: 1.65; }

.cnt__grid { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: start; }
@media (min-width: 900px) { .cnt__grid { grid-template-columns: 0.85fr 1.15fr; gap: 2.5rem; } }

/* ---------- Direct contact panel ---------- */
.cnt__info {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 2.5rem 2rem;
  border-radius: var(--radius);
  color: var(--white);
  background:
    radial-gradient(ellipse 80% 50% at 100% 0%, rgba(201, 162, 39, 0.25), transparent 65%),
    linear-gradient(165deg, var(--navy) 0%, var(--navy-dark) 100%);
  box-shadow: 0 24px 50px rgba(11, 37, 69, 0.25);
}
.cnt__info::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
  mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
}
.cnt__info h3 { margin: 0 0 0.75rem; color: var(--gold); font-size: 1.5rem; }
.cnt__info > p { margin: 0 0 1.75rem; color: #B4C0D4; font-size: 0.95rem; line-height: 1.65; }

.cnt__items { display: grid; gap: 0.85rem; }
.cnt__item {
  display: flex;
  align-items: center;
  gap: 0.95rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  color: var(--white);
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}
a.cnt__item:hover {
  transform: translateX(6px);
  background: rgba(255, 255, 255, 0.11);
  border-color: rgba(201, 162, 39, 0.55);
}
.cnt__item-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 44px; height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
}
.cnt__item-icon svg { width: 22px; height: 22px; }
.cnt__item-label {
  display: block;
  color: #94A3B8;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.cnt__item-value { display: block; margin-top: 0.15rem; font-weight: 600; font-size: 1rem; overflow-wrap: anywhere; }

.cnt__wa {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.75rem;
  padding: 0.95rem;
  border-radius: var(--radius);
  background: #25D366;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 22px rgba(37, 211, 102, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.cnt__wa:hover { transform: translateY(-3px); background: #1FB95A; box-shadow: 0 12px 28px rgba(37, 211, 102, 0.5); }

/* ---------- Form card ---------- */
.cnt__card {
  position: relative;
  padding: 2.25rem 2rem 2rem;
  border-radius: var(--radius);
  background: var(--white);
  border: 1px solid #E2E8F0;
  border-top: 4px solid var(--gold);
  box-shadow: 0 18px 44px rgba(11, 37, 69, 0.1);
}
.cnt__card-title { margin: 0 0 0.35rem; color: var(--navy); font-size: 1.4rem; }
.cnt__card-sub { margin: 0 0 1.5rem; color: #64748B; font-size: 0.92rem; }

.cnt__form { display: grid; gap: 1.15rem; }
.cnt__row { display: grid; grid-template-columns: 1fr; gap: 1.15rem; }
@media (min-width: 560px) { .cnt__row { grid-template-columns: 1fr 1fr; } }

.cnt__label {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--navy);
  font-size: 0.9rem;
  font-weight: 600;
}
.cnt__req { margin-left: 0.15rem; color: var(--gold-dark, #A98617); }

.cnt__input, .cnt__select, .cnt__textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem 0.9rem;
  border-radius: var(--radius);
  border: 1.5px solid #CBD5E1;
  background: #FBFCFE;
  color: var(--text);
  font: inherit;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.cnt__textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
.cnt__input:hover, .cnt__select:hover, .cnt__textarea:hover { border-color: #94A3B8; }
.cnt__input:focus, .cnt__select:focus, .cnt__textarea:focus {
  outline: none;
  border-color: var(--gold);
  background: var(--white);
  box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.2);
}
.cnt__input--bad { border-color: #DC2626; background: #FFF8F8; }
.cnt__input--bad:focus { box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.15); border-color: #DC2626; }
.cnt__err { margin: 0.4rem 0 0; color: #DC2626; font-size: 0.82rem; animation: cnt-shake 0.35s ease; }
@keyframes cnt-shake { 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }

/* Honeypot: hidden from people, visible to bots */
.cnt__hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }

.cnt__submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.95rem 1.5rem;
  border: 0;
  border-radius: var(--radius);
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
  font: inherit;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(201, 162, 39, 0.38);
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}
.cnt__submit:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(201, 162, 39, 0.5); }
.cnt__submit:disabled { cursor: not-allowed; opacity: 0.75; }
.cnt__submit span { transition: transform 0.2s ease; }
.cnt__submit:hover:not(:disabled) span { transform: translateX(4px); }
.cnt__spin {
  width: 18px; height: 18px;
  border-radius: 50%;
  border: 3px solid rgba(8, 26, 51, 0.25);
  border-top-color: var(--navy-dark);
  animation: cnt-spin 0.7s linear infinite;
}
@keyframes cnt-spin { to { transform: rotate(360deg); } }
.cnt__note { margin: 0; color: #64748B; font-size: 0.8rem; text-align: center; }

.cnt a:focus-visible, .cnt button:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }

/* Error banner with fallbacks */
.cnt__fail {
  padding: 1rem 1.1rem;
  border-radius: var(--radius);
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
  font-size: 0.9rem;
  line-height: 1.6;
}
.cnt__fail p { margin: 0 0 0.75rem; }
.cnt__fail-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.cnt__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  background: var(--white);
  border: 1px solid #FCA5A5;
  color: #991B1B;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
}
.cnt__chip:hover { background: #FEE2E2; }

/* ---------- Success state ---------- */
.cnt__ok { text-align: center; padding: 1rem 0 0.5rem; }
.cnt__check {
  display: grid;
  place-items: center;
  width: 84px; height: 84px;
  margin: 0 auto 1.25rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
  box-shadow: 0 0 0 10px rgba(201, 162, 39, 0.18);
  animation: cnt-pop 0.6s cubic-bezier(0.2, 1.4, 0.4, 1) both;
}
.cnt__check path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: cnt-draw 0.5s ease 0.35s forwards; }
@keyframes cnt-pop { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes cnt-draw { to { stroke-dashoffset: 0; } }
.cnt__ok h3 { margin: 0 0 0.6rem; color: var(--navy); font-size: 1.6rem; }
.cnt__ok > p { margin: 0 auto 1.5rem; max-width: 420px; color: #475569; line-height: 1.7; }
.cnt__docs {
  margin: 0 0 1.5rem;
  padding: 1.1rem 1.2rem;
  border-radius: var(--radius);
  background: var(--gray-50);
  border: 1px dashed #CBD5E1;
  text-align: left;
}
.cnt__docs strong { display: block; margin-bottom: 0.3rem; color: var(--navy); }
.cnt__docs p { margin: 0 0 0.9rem; color: #475569; font-size: 0.92rem; line-height: 1.6; }
.cnt__docs-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.cnt__docs-wa, .cnt__docs-mail {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease;
}
.cnt__docs-wa { background: #25D366; color: #fff; }
.cnt__docs-mail { background: var(--navy); color: var(--white); }
.cnt__docs-wa:hover, .cnt__docs-mail:hover { transform: translateY(-2px); }
.cnt__again {
  padding: 0.7rem 1.6rem;
  border-radius: var(--radius);
  border: 2px solid var(--navy);
  background: transparent;
  color: var(--navy);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.cnt__again:hover { background: var(--navy); color: var(--white); }

@media (prefers-reduced-motion: reduce) {
  .cnt__bar, .cnt__item, .cnt__wa, .cnt__input, .cnt__select, .cnt__textarea, .cnt__submit, .cnt__submit span { transition: none; }
  .cnt__reveal, .cnt--visible .cnt__reveal { opacity: 1; transform: none; animation: none; }
  .cnt__bar { transform: scaleX(1); }
  .cnt__check, .cnt__check path, .cnt__err { animation: none; stroke-dashoffset: 0; }
  .cnt__spin { animation-duration: 1.6s; }
}
`;

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [honeypot, setHoneypot] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Trigger the entrance animation when the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const errors = validate(formData);
  const showError = (k: keyof FormData) => (touched[k] ? errors[k] : undefined);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show every error at once if the form isn't valid yet
    if (Object.keys(errors).length > 0) {
      setTouched({
        name: true, email: true, phone: true, service: true,
        subject: true, deadline: true, message: true,
      });
      const first = Object.keys(errors)[0];
      document.getElementById(first)?.focus();
      return;
    }

    // Bots tick the hidden box; pretend success and send nothing
    if (honeypot) {
      setStatus('success');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY',
          // Email subject line. (The course goes in "course" so it can't overwrite this.)
          subject: `New Service Request from ${formData.name.trim()}`,
          from_name: site.name,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          course: formData.subject.trim(),
          deadline: formData.deadline,
          message: formData.message.trim(),
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result && result.success) {
        setStatus('success');
        setFormData(emptyForm);
        setTouched({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const fieldProps = (k: keyof FormData) => ({
    id: k,
    name: k,
    value: formData[k],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-required': true as const,
    'aria-invalid': showError(k) ? (true as const) : undefined,
    'aria-describedby': showError(k) ? `${k}-err` : undefined,
  });

  const err = (k: keyof FormData) =>
    showError(k) ? (
      <p className="cnt__err" id={`${k}-err`} role="alert">
        {showError(k)}
      </p>
    ) : null;

  const revealStyle = (d: string) => ({ '--d': d } as React.CSSProperties);

  return (
    <section
      id="contact"
      ref={ref}
      className={`cnt ${visible ? 'cnt--visible' : ''}`}
    >
      <style>{css}</style>

      <div className="cnt__inner">
        <div className="cnt__head cnt__reveal">
          <span className="cnt__eyebrow">Get In Touch</span>
          <h2 className="cnt__title">Request a Service</h2>
          <span className="cnt__bar" aria-hidden="true" />
          <p className="cnt__sub">
            Submit your inquiry below or reach out directly through WhatsApp for immediate consultation.
          </p>
        </div>

        <div className="cnt__grid">
          {/* Direct Contact Info */}
          <div className="cnt__info cnt__reveal" style={revealStyle('0.12s')}>
            <h3>Direct Contact</h3>
            <p>
              Have urgent assignments or specific requirements? Reach out directly via phone or WhatsApp for real-time updates.
            </p>

            <div className="cnt__items">
              <a className="cnt__item" href={`tel:${site.phone}`}>
                <span className="cnt__item-icon">
                  <svg {...svgBase}>
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                  </svg>
                </span>
                <span>
                  <span className="cnt__item-label">Phone / WhatsApp</span>
                  <span className="cnt__item-value">{site.phone}</span>
                </span>
              </a>

              <a className="cnt__item" href={`mailto:${site.email}`}>
                <span className="cnt__item-icon">
                  <svg {...svgBase}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <span>
                  <span className="cnt__item-label">Email</span>
                  <span className="cnt__item-value">{site.email}</span>
                </span>
              </a>

              {site.facebookUrl ? (
                <a className="cnt__item" href={site.facebookUrl} target="_blank" rel="noopener noreferrer">
                  <span className="cnt__item-icon">
                    <svg {...svgBase}>
                      <path d="M15 8h-2a2 2 0 0 0-2 2v11M9 13h6" />
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
                    </svg>
                  </span>
                  <span>
                    <span className="cnt__item-label">Facebook</span>
                    <span className="cnt__item-value">{site.facebookLabel}</span>
                  </span>
                </a>
              ) : (
                <div className="cnt__item">
                  <span className="cnt__item-icon">
                    <svg {...svgBase}>
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
                    </svg>
                  </span>
                  <span>
                    <span className="cnt__item-label">Facebook</span>
                    <span className="cnt__item-value">{site.facebookLabel}</span>
                  </span>
                </div>
              )}
            </div>

            <a
              className="cnt__wa"
              href={whatsappLink(WA_GREETING)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WaIcon />
              Chat on WhatsApp Now
            </a>
          </div>

          {/* Form */}
          <div className="cnt__card cnt__reveal" style={revealStyle('0.26s')}>
            {status === 'success' ? (
              <div className="cnt__ok" role="status">
                <div className="cnt__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </div>
                <h3>Request Received!</h3>
                <p>
                  Thank you for submitting your details. Our team will review your instructions and contact you shortly.
                </p>

                <div className="cnt__docs">
                  <strong>Need to share files?</strong>
                  <p>
                    Send your syllabus, instructions or supporting documents via WhatsApp or email. This website does not accept file uploads.
                  </p>
                  <div className="cnt__docs-actions">
                    <a
                      className="cnt__docs-wa"
                      href={whatsappLink(WA_DOCS)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WaIcon size={18} />
                      Send on WhatsApp
                    </a>
                    <a className="cnt__docs-mail" href={`mailto:${site.email}?subject=Supporting documents`}>
                      Send by Email
                    </a>
                  </div>
                </div>

                <button type="button" className="cnt__again" onClick={() => setStatus('idle')}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <h3 className="cnt__card-title">Tell us what you need</h3>
                <p className="cnt__card-sub">Fields marked <span className="cnt__req">*</span> are required.</p>

                <form className="cnt__form" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="name" className="cnt__label">
                      Full Name <span className="cnt__req" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="name"
                      className={`cnt__input ${showError('name') ? 'cnt__input--bad' : ''}`}
                      {...fieldProps('name')}
                    />
                    {err('name')}
                  </div>

                  <div className="cnt__row">
                    <div>
                      <label htmlFor="email" className="cnt__label">
                        Email Address <span className="cnt__req" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="email"
                        autoComplete="email"
                        className={`cnt__input ${showError('email') ? 'cnt__input--bad' : ''}`}
                        {...fieldProps('email')}
                      />
                      {err('email')}
                    </div>

                    <div>
                      <label htmlFor="phone" className="cnt__label">
                        Phone / WhatsApp <span className="cnt__req" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="+256 700 000 000"
                        className={`cnt__input ${showError('phone') ? 'cnt__input--bad' : ''}`}
                        {...fieldProps('phone')}
                      />
                      {err('phone')}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="cnt__label">
                      Service Required <span className="cnt__req" aria-hidden="true">*</span>
                    </label>
                    <select
                      className={`cnt__select ${showError('service') ? 'cnt__input--bad' : ''}`}
                      {...fieldProps('service')}
                    >
                      <option value="">Select a service...</option>
                      {serviceOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {err('service')}
                  </div>

                  <div className="cnt__row">
                    <div>
                      <label htmlFor="subject" className="cnt__label">
                        Subject / Course <span className="cnt__req" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        list="cnt-subjects"
                        placeholder="e.g. Nursing, Calculus, Edgenuity"
                        className={`cnt__input ${showError('subject') ? 'cnt__input--bad' : ''}`}
                        {...fieldProps('subject')}
                      />
                      <datalist id="cnt-subjects">
                        {subjectSuggestions.map((s) => (
                          <option key={s} value={s} />
                        ))}
                      </datalist>
                      {err('subject')}
                    </div>

                    <div>
                      <label htmlFor="deadline" className="cnt__label">
                        Target Deadline <span className="cnt__req" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="date"
                        min={todayString()}
                        className={`cnt__input ${showError('deadline') ? 'cnt__input--bad' : ''}`}
                        {...fieldProps('deadline')}
                      />
                      {err('deadline')}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="cnt__label">
                      Instructions / Assignment Details <span className="cnt__req" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Provide detailed context or syllabus requirements..."
                      className={`cnt__textarea ${showError('message') ? 'cnt__input--bad' : ''}`}
                      {...fieldProps('message')}
                    />
                    {err('message')}
                  </div>

                  {/* Spam trap: real visitors never see or tick this */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="cnt__hp"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    checked={honeypot}
                    onChange={(e) => setHoneypot(e.target.checked)}
                  />

                  {status === 'error' && (
                    <div className="cnt__fail" role="alert">
                      <p>
                        Submission failed. Please check your network connection and try again, or reach us directly. Your details are still filled in.
                      </p>
                      <div className="cnt__fail-actions">
                        <a
                          className="cnt__chip"
                          href={whatsappLink(WA_GREETING)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WaIcon size={16} /> WhatsApp us
                        </a>
                        <a className="cnt__chip" href={`mailto:${site.email}`}>Email us</a>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="cnt__submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <span className="cnt__spin" aria-hidden="true" /> Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request <span aria-hidden="true">&rarr;</span>
                      </>
                    )}
                  </button>
                  <p className="cnt__note">
                    Your details are sent securely to our team and used only to respond to your request.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;