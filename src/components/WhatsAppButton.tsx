import React from 'react';
import { whatsappLink } from '../config/site';

// Scoped styles live in this file so the component stays a single copy-paste.
const css = `
.wab {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 999;
  display: inline-flex;
  align-items: center;
  height: 60px;
  border-radius: 999px;
  background: linear-gradient(135deg, #2BDD72, #25D366 55%, #1DB954);
  color: #FFFFFF;
  text-decoration: none;
  box-shadow: 0 8px 22px rgba(37, 211, 102, 0.45), 0 4px 12px rgba(0, 0, 0, 0.2);
  /* Pops in a moment after the page loads */
  animation: wab-pop 0.7s cubic-bezier(0.2, 1.4, 0.4, 1) 1.2s backwards;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.wab:hover, .wab:focus-visible {
  transform: translateY(-4px) scale(1.04);
  box-shadow: 0 14px 30px rgba(37, 211, 102, 0.55), 0 6px 14px rgba(0, 0, 0, 0.22);
}
.wab:active { transform: scale(0.97); }
.wab:focus-visible { outline: 3px solid var(--gold); outline-offset: 4px; }

/* Soft pulse rings so the button gently draws the eye */
.wab::before, .wab::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 999px;
  background: #25D366;
  animation: wab-ring 2.8s ease-out infinite;
}
.wab::after { animation-delay: 1.4s; }

.wab__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 60px; height: 60px;
}
.wab__icon svg { transition: transform 0.3s ease; }
.wab:hover .wab__icon svg { transform: rotate(-10deg) scale(1.1); }

/* Text slides out on hover or keyboard focus */
.wab__label {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.95rem;
  font-weight: 700;
  opacity: 0;
  transition: max-width 0.35s ease, opacity 0.25s ease, padding 0.35s ease;
}
.wab:hover .wab__label, .wab:focus-visible .wab__label {
  max-width: 180px;
  padding-right: 1.3rem;
  opacity: 1;
}

@keyframes wab-pop { from { transform: scale(0) rotate(-90deg); opacity: 0; } to { transform: scale(1) rotate(0); opacity: 1; } }
@keyframes wab-ring {
  0%   { transform: scale(1);   opacity: 0.45; }
  100% { transform: scale(1.7); opacity: 0; }
}

@media (max-width: 640px) {
  .wab { right: 1rem; bottom: 1rem; height: 56px; }
  .wab__icon { width: 56px; height: 56px; }
  .wab__label { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .wab { animation: none; transition: none; }
  .wab::before, .wab::after { animation: none; display: none; }
  .wab__icon svg, .wab__label { transition: none; }
}
`;

export const WhatsAppButton: React.FC = () => {
  return (
    <>
      <style>{css}</style>
      <a
        className="wab"
        href={whatsappLink("Hello, I would like to inquire about your academic services.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span className="wab__icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor">
            <path d="M16.002 3C9.373 3 4 8.373 4 15c0 2.385.697 4.607 1.894 6.48L4 29l7.7-1.84A11.94 11.94 0 0 0 16.002 27C22.63 27 28 21.627 28 15S22.63 3 16.002 3Zm5.38 14.47c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
          </svg>
        </span>
        <span className="wab__label" aria-hidden="true">Chat with us</span>
      </a>
    </>
  );
};

export default WhatsAppButton;