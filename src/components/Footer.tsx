import React from 'react';
import { site } from '../config/site';

export const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: 'var(--navy-dark)', color: 'var(--white)', padding: '4rem 1.5rem 2rem 1.5rem' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2.5rem',
      }}>
        {/* Brand Overview */}
        <div>
          <h3 style={{ color: 'var(--gold)', marginTop: 0, marginBottom: '0.75rem' }}>{site.name}</h3>
          <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
            {site.tagline}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: 'var(--white)', marginTop: 0, marginBottom: '1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="#home" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>Home</a></li>
            <li><a href="#about" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</a></li>
            <li><a href="#services" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>Services Catalog</a></li>
            <li><a href="#subjects" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>Supported Subjects</a></li>
            <li><a href="#how-it-works" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>How It Works</a></li>
          </ul>
        </div>

        {/* Direct Contact */}
        <div>
          <h4 style={{ color: 'var(--white)', marginTop: 0, marginBottom: '1rem' }}>Contact Information</h4>
          <p style={{ margin: '0.4rem 0', fontSize: '0.9rem', color: '#94A3B8' }}>
            <strong>Phone / WhatsApp:</strong> {site.phone}
          </p>
          <p style={{ margin: '0.4rem 0', fontSize: '0.9rem', color: '#94A3B8' }}>
            <strong>Email:</strong> {site.email}
          </p>
          <p style={{ margin: '0.4rem 0', fontSize: '0.9rem', color: '#94A3B8' }}>
            <strong>Facebook:</strong> {site.facebookLabel}
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '3rem auto 0 auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid #1E293B',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#64748B',
      }}>
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
};
