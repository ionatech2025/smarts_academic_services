import React from 'react';
import { site, whatsappLink } from '../../config/site';

// Scoped styles live in this file so the component stays a single copy-paste.
const css = `
.hero-x {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  color: var(--white);
  text-align: center;
  padding: clamp(4rem, 9vw, 7rem) 1.5rem clamp(4.5rem, 10vw, 8rem);
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201, 162, 39, 0.22), transparent 60%),
    linear-gradient(160deg, var(--navy) 0%, var(--navy-dark) 100%);
}

/* Faint academic grid */
.hero-x::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
}

/* Floating glow orbs */
.hero-x__orb {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
}
.hero-x__orb--gold {
  width: 320px; height: 320px;
  top: -80px; right: -60px;
  background: rgba(201, 162, 39, 0.28);
  animation: hero-float-a 11s ease-in-out infinite;
}
.hero-x__orb--blue {
  width: 380px; height: 380px;
  bottom: -140px; left: -100px;
  background: rgba(56, 100, 190, 0.35);
  animation: hero-float-b 14s ease-in-out infinite;
}

.hero-x__inner { max-width: 900px; margin: 0 auto; }

/* Staggered entrance */
.hero-x__rise {
  opacity: 0;
  transform: translateY(22px);
  animation: hero-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.hero-x__rise--1 { animation-delay: 0.05s; }
.hero-x__rise--2 { animation-delay: 0.2s; }
.hero-x__rise--3 { animation-delay: 0.35s; }
.hero-x__rise--4 { animation-delay: 0.5s; }

/* Badge with live pulse dot */
.hero-x__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: rgba(201, 162, 39, 0.12);
  backdrop-filter: blur(6px);
  color: var(--gold);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.hero-x__dot {
  position: relative;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--gold);
}
.hero-x__dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--gold);
  animation: hero-pulse 2s ease-out infinite;
}

.hero-x__title {
  margin: 0 0 1.25rem;
  color: var(--white);
  font-size: clamp(2.2rem, 6.5vw, 3.9rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.025em;
  background: linear-gradient(100deg, #ffffff 0%, #ffffff 45%, #F1D77A 70%, var(--gold) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hero-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) 0.2s forwards,
             hero-shimmer 7s linear 1.2s infinite;
}

.hero-x__line {
  display: block;
  width: 72px; height: 4px;
  margin: 0 auto 1.5rem;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--gold), #F1D77A);
  transform: scaleX(0);
  transform-origin: center;
  animation: hero-draw 0.7s ease-out 0.6s forwards;
}

.hero-x__tagline {
  max-width: 700px;
  margin: 0 auto 2.5rem;
  color: #B4C0D4;
  font-size: clamp(1.02rem, 2.4vw, 1.25rem);
  line-height: 1.65;
}

.hero-x__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.hero-x__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 2rem;
  border-radius: var(--radius);
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease,
              border-color 0.2s ease, color 0.2s ease;
}
.hero-x__btn:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }

.hero-x__btn--gold {
  background: linear-gradient(135deg, #E3BC3B, var(--gold));
  color: var(--navy-dark);
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(201, 162, 39, 0.35);
}
.hero-x__btn--gold:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(201, 162, 39, 0.5);
}
.hero-x__arrow { transition: transform 0.2s ease; }
.hero-x__btn--gold:hover .hero-x__arrow { transform: translateX(4px); }

.hero-x__btn--ghost {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: var(--white);
  font-weight: 600;
  backdrop-filter: blur(6px);
}
.hero-x__btn--ghost:hover {
  transform: translateY(-3px);
  background: #1FA855;
  border-color: #1FA855;
}

@keyframes hero-rise { to { opacity: 1; transform: translateY(0); } }
@keyframes hero-draw { to { transform: scaleX(1); } }
@keyframes hero-shimmer { to { background-position: 200% center; } }
@keyframes hero-pulse {
  0%   { transform: scale(1);   opacity: 0.7; }
  100% { transform: scale(3.2); opacity: 0; }
}
@keyframes hero-float-a {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(-30px, 40px); }
}
@keyframes hero-float-b {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(40px, -30px); }
}

@media (max-width: 480px) {
  .hero-x__btn { width: 100%; justify-content: center; }
}

/* Respect users who prefer less motion */
@media (prefers-reduced-motion: reduce) {
  .hero-x__rise, .hero-x__title, .hero-x__line {
    animation: none;
    opacity: 1;
    transform: none;
  }
  .hero-x__orb, .hero-x__dot::after { animation: none; }
  .hero-x__btn:hover { transform: none; }
}
`;

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="hero-x">
      <style>{css}</style>

      <span className="hero-x__orb hero-x__orb--gold" aria-hidden="true" />
      <span className="hero-x__orb hero-x__orb--blue" aria-hidden="true" />

      <div className="hero-x__inner">
        <span className="hero-x__badge hero-x__rise hero-x__rise--1">
          <span className="hero-x__dot" aria-hidden="true" />
          Professional &amp; Trusted Support
        </span>

        <h1 className="hero-x__title hero-x__rise">{site.name}</h1>

        <span className="hero-x__line" aria-hidden="true" />

        <p className="hero-x__tagline hero-x__rise hero-x__rise--3">{site.tagline}</p>

        <div className="hero-x__actions hero-x__rise hero-x__rise--4">
          <a href="#contact" className="hero-x__btn hero-x__btn--gold">
            Request a Service
            <span className="hero-x__arrow" aria-hidden="true">&rarr;</span>
          </a>
          <a
            href={whatsappLink('Hello, I would like to request a service.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-x__btn hero-x__btn--ghost"
          >
            <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true" fill="currentColor">
              <path d="M16.002 3C9.373 3 4 8.373 4 15c0 2.385.697 4.607 1.894 6.48L4 29l7.7-1.84A11.94 11.94 0 0 0 16.002 27C22.63 27 28 21.627 28 15S22.63 3 16.002 3Zm5.38 14.47c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;