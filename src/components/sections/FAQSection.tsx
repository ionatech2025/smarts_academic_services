import React, { useState } from 'react';
import { faqs } from '../../data/faqs';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  return (
    <section id="faq" style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--white)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--navy)', fontSize: '2rem', marginBottom: '0.5rem' }}>Frequently Asked Questions</h2>
          <p style={{ color: '#64748B' }}>
            Find answers to common questions regarding our process, policies, and academic support.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    textAlign: 'left',
                    backgroundColor: isOpen ? 'var(--gray-50)' : 'var(--white)',
                    border: 'none',
                    fontWeight: 600,
                    color: 'var(--navy)',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{faq.question}</span>
                  <span style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '1.25rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, borderTop: '1px solid #E2E8F0' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
