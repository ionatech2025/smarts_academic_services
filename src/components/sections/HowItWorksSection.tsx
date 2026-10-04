import React from 'react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Submit Service Request',
      desc: 'Fill in the service request form with your course details, preferred deadline, and requirements.',
    },
    {
      num: '02',
      title: 'Send Supporting Files',
      desc: 'Forward syllabus, instructions, or supporting documents directly via WhatsApp or email.',
    },
    {
      num: '03',
      title: 'Review & Terms Agreement',
      desc: 'Our team evaluates the scope, timelines, and commercial details before confirming the engagement.',
    },
    {
      num: '04',
      title: 'Service Fulfillment',
      desc: 'Receive comprehensive model solutions, review feedback, or tutoring support right on schedule.',
    },
  ];

  return (
    <section id="how-it-works" style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--navy)', color: 'var(--white)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ color: 'var(--white)', fontSize: '2rem', marginBottom: '0.5rem' }}>How It Works</h2>
          <p style={{ color: '#94A3B8', maxWidth: '600px', margin: '0 auto' }}>
            A streamlined 4-step process designed to make getting academic assistance simple and efficient.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
        }}>
          {steps.map((s) => (
            <div key={s.num} style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '2rem',
              borderRadius: 'var(--radius)',
              border: '1px solid #1E293B',
            }}>
              <div style={{
                color: 'var(--gold)',
                fontSize: '1.8rem',
                fontWeight: 800,
                marginBottom: '0.75rem',
              }}>
                {s.num}
              </div>
              <h3 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
