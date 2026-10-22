import React, { useEffect, useState } from 'react';
import { site, whatsappLink } from '../config/site';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Subjects', href: '#subjects' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const css = `
.hdr {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
  color: var(--white);
  background: var(--navy);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  transition: height 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
  animation: hdr-drop 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.hdr--scrolled {
  height: 64px;
  background: rgba(11, 37, 69, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.28);
}

.hdr__inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Brand */
.hdr__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--gold);
  font-size: 1.15rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  min-width: 0;
}

.hdr__logo {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid var(--gold);
  transition: transform 0.3s ease;
}

.hdr__brand:hover .hdr__logo {
  transform: rotate(-5deg) scale(1.05);
}

.hdr__name { overflow: hidden; text-overflow: ellipsis; }

/* Desktop nav */
.hdr__nav { display: none; align-items: center; gap: 0.35rem; }
.hdr__link {
  position: relative;
  padding: 0.5rem 0.7rem;
  color: var(--white);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}
.hdr__link::after {
  content: "";
  position: absolute;
  left: 0.7rem; right: 0.7rem; bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
.hdr__link:hover, .hdr__link--active { color: var(--gold); }
.hdr__link:hover::after, .hdr__link--active::after { transform: scaleX(1); }

/* Buttons */
.hdr__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: 0.5rem;
  padding: 0.55rem 1.25rem;
  border-radius: var(--radius);
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy);
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(201, 162, 39, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hdr__cta:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(201, 162, 39, 0.45); }

.hdr a:focus-visible, .hdr button:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; border-radius: 6px; }

/* Hamburger */
.hdr__burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px; height: 44px;
  padding: 0 10px;
  background: transparent;
  border: 0;
  cursor: pointer;
}
.hdr__burger span {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: var(--white);
  transition: transform 0.3s ease, opacity 0.2s ease;
}
.hdr__burger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hdr__burger--open span:nth-child(2) { opacity: 0; }
.hdr__burger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile panel */
.hdr__panel {
  position: absolute;
  top: 100%; left: 0; right: 0;
  max-height: 0;
  overflow: hidden;
  background: var(--navy-dark);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  transition: max-height 0.4s ease;
}
.hdr__panel--open { max-height: calc(100vh - 64px); overflow-y: auto; }
.hdr__panel-inner { display: grid; gap: 0.25rem; padding: 1rem 1.5rem 1.5rem; }
.hdr__mlink {
  padding: 0.85rem 0.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--white);
  font-weight: 500;
  text-decoration: none;
}
.hdr__mlink--active { color: var(--gold); }
.hdr__mactions { display: grid; gap: 0.75rem; margin-top: 1rem; }
.hdr__mactions .hdr__cta { margin: 0; justify-content: center; padding: 0.8rem 1.25rem; }
.hdr__wa {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.25rem;
  border-radius: var(--radius);
  background: #1FA855;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}

/* Scroll progress bar */
.hdr__progress {
  position: absolute;
  left: 0; bottom: 0;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, var(--gold), #F1D77A);
  transform-origin: left;
  transform: scaleX(0);
}

@keyframes hdr-drop { from { transform: translateY(-100%); } to { transform: translateY(0); } }

@media (min-width: 1000px) {
  .hdr__nav { display: flex; }
  .hdr__burger, .hdr__panel { display: none; }
}
@media (max-width: 360px) { .hdr__name { display: none; } }

@media (prefers-reduced-motion: reduce) {
  .hdr, .hdr__panel, .hdr__burger span, .hdr__link::after, .hdr__logo, .hdr__cta { animation: none; transition: none; }
}
`;

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('#home');

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1000) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className={`hdr ${scrolled ? 'hdr--scrolled' : ''}`}>
      <style>{css}</style>

      <div className="hdr__inner">
        {/* Brand Logo & Title */}
        <a href="#home" className="hdr__brand" onClick={closeMenu}>
          <img
            src="/smarts_logo.jpeg"
            alt="Smarts Academic Services Logo"
            className="hdr__logo"
          />
          <span className="hdr__name">{site.name}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hdr__nav desktop-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`hdr__link ${active === link.href ? 'hdr__link--active' : ''}`}
              aria-current={active === link.href ? 'true' : undefined}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="hdr__cta">Request a Service</a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`hdr__burger ${isMobileMenuOpen ? 'hdr__burger--open' : ''}`}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-panel"
          onClick={() => setIsMobileMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-panel"
        className={`hdr__panel ${isMobileMenuOpen ? 'hdr__panel--open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="hdr__panel-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`hdr__mlink ${active === link.href ? 'hdr__mlink--active' : ''}`}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              {link.name}
            </a>
          ))}
          <div className="hdr__mactions">
            <a href="#contact" className="hdr__cta" tabIndex={isMobileMenuOpen ? 0 : -1} onClick={closeMenu}>
              Request a Service
            </a>
            <a
              href={whatsappLink('Hello, I would like to request a service.')}
              className="hdr__wa"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div
        className="hdr__progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
};

export default Header;