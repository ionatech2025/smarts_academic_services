import React from 'react';
import { site, whatsappLink } from '../../config/site';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" style={{
      backgroundColor: 'var(--navy)',
      color: 'var(--white)',
      padding: '5rem 1.5rem 6rem 1.5rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <span style={{
          backgroundColor: 'rgba(201, 162, 39, 0.15)',
          color: 'var(--gold)',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'inline-block',
          marginBottom: '1.5rem',
        }}>
          Professional & Trusted Support
        </span>
        
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: '1.25rem',
          letterSpacing: '-0.02em',
        }}>
          {site.name}
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          color: '#94A3B8',
          maxWidth: '700px',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.6,
        }}>
          {site.tagline}
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <a
            href="#contact"
            style={{
              backgroundColor: 'var(--gold)',
              color: 'var(--navy-dark)',
              padding: '0.85rem 2rem',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 4px 14px rgba(201, 162, 39, 0.3)',
            }}
          >
            Request a Service
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--white)',
              border: '1px solid #334155',
              padding: '0.85rem 2rem',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
};
