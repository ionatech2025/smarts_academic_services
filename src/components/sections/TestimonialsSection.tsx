import React from 'react';
import { testimonials } from '../../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--gray-50)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--navy)', fontSize: '2rem', marginBottom: '0.5rem' }}>Student Experiences</h2>
          <p style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
            See how our academic support services have helped university students succeed.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {testimonials.map((t) => (
            <div key={t.id} style={{
              backgroundColor: 'var(--white)',
              padding: '2rem',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ color: 'var(--gold)', marginBottom: '0.5rem' }}>
                {'★'.repeat(t.rating)}
              </div>
              <p style={{ fontStyle: 'italic', color: '#334155', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                "{t.quote}"
              </p>
              <div>
                <strong style={{ color: 'var(--navy)', display: 'block' }}>{t.clientName}</strong>
                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>{t.course}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
