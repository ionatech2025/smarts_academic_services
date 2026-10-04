import React from 'react';
import { subjects } from '../../data/subjects';

export const SubjectsSection: React.FC = () => {
  return (
    <section id="subjects" style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--white)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--navy)', fontSize: '2rem', marginBottom: '0.5rem' }}>Supported Subjects & Platforms</h2>
          <p style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
            We cover key university disciplines, specialized healthcare tracks, and major online learning systems.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}>
          {subjects.map((subj) => (
            <div
              key={subj.id}
              style={{
                padding: '1.25rem',
                border: '1px solid #E2E8F0',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--white)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {subj.category}
                </span>
                <h4 style={{ color: 'var(--navy)', margin: '0.4rem 0 0 0', fontSize: '1.1rem' }}>
                  {subj.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
