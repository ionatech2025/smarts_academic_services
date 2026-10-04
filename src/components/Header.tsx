import React, { useState, useEffect } from 'react';
//import { site } from '../config/site';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Subjects', href: '#subjects' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      backgroundColor: 'var(--navy)',
      color: 'var(--white)',
      zIndex: 1000,
      boxShadow: 'var(--shadow-md)',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Brand Logo / Wordmark */}
        <a href="#home" style={{ textDecoration: 'none', color: 'var(--white)' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.02em' }}>
            SMARTS <span style={{ color: 'var(--gold)' }}>ACADEMIC</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Academic Services
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'var(--transition)',
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              backgroundColor: 'var(--gold)',
              color: 'var(--navy-dark)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              transition: 'var(--transition)',
            }}
          >
            Request a Service
          </a>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--white)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'block',
          }}
          className="mobile-toggle"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            right: 0,
            backgroundColor: 'var(--navy-dark)',
            borderTop: '1px solid #1E293B',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            style={{
              backgroundColor: 'var(--gold)',
              color: 'var(--navy-dark)',
              padding: '0.75rem',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Request a Service
          </a>
        </div>
      )}
    </header>
  );
};