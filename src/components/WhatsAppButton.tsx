import React from 'react';
import { whatsappLink } from '../config/site';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={whatsappLink("Hello, I would like to inquire about your academic services.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        zIndex: 999,
        textDecoration: 'none',
        fontSize: '1.8rem',
        transition: 'transform 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      💬
    </a>
  );
};
