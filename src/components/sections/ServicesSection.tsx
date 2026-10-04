import React from 'react';
import { services } from '../../data/services';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--gray-50)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--navy)', fontSize: '2rem', marginBottom: '0.5rem' }}>Our Academic Services</h2>
          <p style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
            Comprehensive, professional assistance designed to guide you through complex coursework and assessments.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {services.map((service) => (
            <div
              key={service.id}
              style={{
                backgroundColor: 'var(--white)',
                padding: '2rem',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ color: 'var(--navy)', marginTop: 0, marginBottom: '0.75rem' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {service.shortDescription}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                  {service.features.map((feat, idx) => (
                    <li key={idx} style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.4rem' }}>
                      ✓ {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  backgroundColor: 'var(--navy)',
                  color: 'var(--white)',
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                Request Service
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
