import React, { useEffect, useRef, useState } from 'react';
import { site, whatsappLink } from '../config/site';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Services Catalog', href: '#services' },
  { name: 'Supported Subjects', href: '#subjects' },
  { name: 'How It Works', href: '#how-it-works' },
];

const svgBase = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const css = `
.ftr {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 4.5rem 1.5rem 2rem;
  color: var(--white);
  background:
    radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201, 162, 39, 0.14), transparent 65%),
    var(--navy-dark);
}

.ftr::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--gold), #F1D77A, var(--gold), transparent);
}

.ftr::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: radial-gradient(ellipse at top, #000 15%, transparent 70%);
  mask-image: radial-gradient(ellipse at top, #000 15%, transparent 70%);
}

.ftr__reveal { opacity: 0; }
.ftr--visible .ftr__reveal {
  opacity: 1;
  animation: ftr-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
  animation-delay: var(--d, 0s);
}
@keyframes ftr-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }

.ftr__grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: 2.5rem;
}

/* Brand */
.ftr__brand { display: inline-flex; align-items: center; gap: 0.75rem; margin-bottom: 0.9rem; }
.ftr__logo {
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid var(--gold);
  transition: transform 0.3s ease;
}
.ftr__brand:hover .ftr__logo { transform: rotate(-6deg) scale(1.05); }
.ftr__name { margin: 0; color: var(--gold); font-size: 1.2rem; line-height: 1.2; }
.ftr__tag { margin: 0 0 1.25rem; color: #94A3B8; font-size: 0.92rem; line-height: 1.7; }

.ftr__wa {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 1.2rem;
  border-radius: var(--radius);
  background: #25D366;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 6px 18px rgba(37, 211, 102, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.ftr__wa:hover { transform: translateY(-3px); background: #1FB95A; box-shadow: 0 10px 24px rgba(37, 211, 102, 0.45); }

.ftr__h {
  position: relative;
  margin: 0 0 1.4rem;
  padding-bottom: 0.7rem;
  color: var(--white);
  font-size: 1.05rem;
}
.ftr__h::after {
  content: "";
  position: absolute;
  left: 0; bottom: 0;
  width: 36px; height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--gold), #F1D77A);
}

.ftr__links { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.35rem; }
.ftr__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  color: #94A3B8;
  font-size: 0.92rem;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}
.ftr__link::before {
  content: "";
  width: 0; height: 2px;
  border-radius: 2px;
  background: var(--gold);
  transition: width 0.25s ease;
}
.ftr__link:hover { color: var(--gold); transform: translateX(2px); }
.ftr__link:hover::before { width: 14px; }

.ftr__contact { display: grid; gap: 0.9rem; }
.ftr__row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  color: #94A3B8;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
}
a.ftr__row:hover { color: var(--white); }
.ftr__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 38px; height: 38px;
  border-radius: 10px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: rgba(201, 162, 39, 0.1);
  color: var(--gold);
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}
.ftr__icon svg { width: 18px; height: 18px; }
a.ftr__row:hover .ftr__icon {
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
  transform: rotate(-6deg) scale(1.06);
}
.ftr__label { display: block; font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: #64748B; }
.ftr__value { display: block; margin-top: 0.1rem; color: #CBD5E1; font-weight: 600; overflow-wrap: anywhere; }

.ftr__bottom {
  max-width: 1200px;
  margin: 3.25rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid #1E293B;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: #64748B;
  font-size: 0.85rem;
}
.ftr__top {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(201, 162, 39, 0.4);
  color: var(--gold);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
.ftr__top svg { width: 16px; height: 16px; transition: transform 0.2s ease; }
.ftr__top:hover { background: var(--gold); color: var(--navy-dark); transform: translateY(-2px); }
.ftr__top:hover svg { transform: translateY(-3px); }

.ftr a:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; border-radius: 6px; }

@media (max-width: 560px) {
  .ftr__bottom { justify-content: center; text-align: center; }
}

@media (prefers-reduced-motion: reduce) {
  .ftr__wa, .ftr__link, .ftr__link::before, .ftr__icon, .ftr__logo, .ftr__top, .ftr__top svg { transition: none; }
  .ftr__reveal, .ftr--visible .ftr__reveal { opacity: 1; transform: none; animation: none; }
}
`;

export const Footer: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
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
    <footer ref={ref} className={`ftr ${visible ? 'ftr--visible' : ''}`}>
      <style>{css}</style>

      <div className="ftr__grid">
        {/* Brand Overview */}
        <div className="ftr__reveal" style={d('0.05s')}>
          <div className="ftr__brand">
            <img
              src="/smarts_logo.jpeg"
              alt="Smarts Academic Services Logo"
              className="ftr__logo"
            />
            <h3 className="ftr__name">{site.name}</h3>
          </div>
          <p className="ftr__tag">{site.tagline}</p>
          <a
            className="ftr__wa"
            href={whatsappLink('Hello, I would like to know more about your services.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true" fill="currentColor">
              <path d="M16.002 3C9.373 3 4 8.373 4 15c0 2.385.697 4.607 1.894 6.48L4 29l7.7-1.84A11.94 11.94 0 0 0 16.002 27C22.63 27 28 21.627 28 15S22.63 3 16.002 3Zm5.38 14.47c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Quick Links */}
        <nav className="ftr__reveal" style={d('0.15s')} aria-label="Footer">
          <h4 className="ftr__h">Quick Links</h4>
          <ul className="ftr__links">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a className="ftr__link" href={l.href}>{l.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Direct Contact */}
        <div className="ftr__reveal" style={d('0.25s')}>
          <h4 className="ftr__h">Contact Information</h4>
          <div className="ftr__contact">
            <a className="ftr__row" href={`tel:${site.phone}`}>
              <span className="ftr__icon">
                <svg {...svgBase}>
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                </svg>
              </span>
              <span>
                <span className="ftr__label">Phone / WhatsApp</span>
                <span className="ftr__value">{site.phone}</span>
              </span>
            </a>

            <a className="ftr__row" href={`mailto:${site.email}`}>
              <span className="ftr__icon">
                <svg {...svgBase}>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <span>
                <span className="ftr__label">Email</span>
                <span className="ftr__value">{site.email}</span>
              </span>
            </a>

            {site.facebookUrl ? (
              <a className="ftr__row" href={site.facebookUrl} target="_blank" rel="noopener noreferrer">
                <span className="ftr__icon">
                  <svg {...svgBase}>
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
                  </svg>
                </span>
                <span>
                  <span className="ftr__label">Facebook</span>
                  <span className="ftr__value">{site.facebookLabel}</span>
                </span>
              </a>
            ) : (
              <div className="ftr__row">
                <span className="ftr__icon">
                  <svg {...svgBase}>
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
                  </svg>
                </span>
                <span>
                  <span className="ftr__label">Facebook</span>
                  <span className="ftr__value">{site.facebookLabel}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ftr__bottom ftr__reveal" style={d('0.35s')}>
        <span>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <a className="ftr__top" href="#home">
          Back to top
          <svg {...svgBase} strokeWidth={2.2}>
            <path d="m6 15 6-6 6 6" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;