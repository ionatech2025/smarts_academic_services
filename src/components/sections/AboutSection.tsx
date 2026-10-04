import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--white)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--navy)', fontSize: '2rem', marginBottom: '0.5rem' }}>About Us</h2>
          <p style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
            Elevating higher education success through expert guidance and academic resources.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          <div style={{
            padding: '2rem',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--radius)',
            borderLeft: '4px solid var(--navy)',
          }}>
            <h3 style={{ color: 'var(--navy)', marginTop: 0 }}>Academic Credibility</h3>
            <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              We specialize in college and university course support across diverse disciplines. Our team delivers thorough model solutions and concept coaching tailored to higher education standards.
            </p>
          </div>

          <div style={{
            padding: '2rem',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--radius)',
            borderLeft: '4px solid var(--gold)',
          }}>
            <h3 style={{ color: 'var(--navy)', marginTop: 0 }}>Our Core Mission</h3>
            <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              To empower students with clarity, structured review guidance, and reliable coursework assistance while preserving the highest standards of academic integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
