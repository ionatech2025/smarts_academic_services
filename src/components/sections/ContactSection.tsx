import React, { useState } from 'react';
import { site, whatsappLink } from '../../config/site';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    deadline: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY',
          subject: `New Service Request from ${formData.name}`,
          ...formData,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', deadline: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--gray-50)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ color: 'var(--navy)', fontSize: '2rem', marginBottom: '0.5rem' }}>Request a Service</h2>
          <p style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
            Submit your inquiry below or reach out directly through WhatsApp for immediate consultation.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Direct Contact Info */}
          <div style={{
            backgroundColor: 'var(--navy)',
            color: 'var(--white)',
            padding: '2.5rem',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-md)',
          }}>
            <h3 style={{ color: 'var(--gold)', marginTop: 0, marginBottom: '1rem', fontSize: '1.4rem' }}>
              Direct Contact
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Have urgent assignments or specific requirements? Reach out directly via phone or WhatsApp for real-time updates.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone / WhatsApp</span>
                <p style={{ margin: '0.2rem 0 0 0', fontWeight: 600, fontSize: '1.05rem' }}>{site.phone}</p>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</span>
                <p style={{ margin: '0.2rem 0 0 0', fontWeight: 600, fontSize: '1.05rem' }}>{site.email}</p>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Facebook</span>
                <p style={{ margin: '0.2rem 0 0 0', fontWeight: 600, fontSize: '1.05rem' }}>{site.facebookLabel}</p>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <a
                href={whatsappLink("Hello, I am reaching out from your website to request service support.")}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius)',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Chat on WhatsApp Now
              </a>
            </div>
          </div>

          {/* Form */}
          <div style={{
            backgroundColor: 'var(--white)',
            padding: '2.5rem',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid #E2E8F0',
          }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h3 style={{ color: 'var(--navy)', marginTop: 0 }}>Request Received!</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Thank you for submitting your details. Our team will review your instructions and contact you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    backgroundColor: 'var(--navy)',
                    color: 'var(--white)',
                    border: 'none',
                    padding: '0.6rem 1.5rem',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    marginTop: '1rem',
                  }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius)',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.95rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)' }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.95rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)' }}>
                      Subject / Course *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="e.g. Nursing, Calculus, Edgenuity"
                      value={formData.subject}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.95rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="deadline" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)' }}>
                      Target Deadline *
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      required
                      value={formData.deadline}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.95rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)' }}>
                    Instructions / Assignment Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Provide detailed context or syllabus requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius)',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#DC2626', fontSize: '0.85rem', margin: 0 }}>
                    Submission failed. Please check your network connection or message us on WhatsApp directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    backgroundColor: 'var(--navy)',
                    color: 'var(--white)',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius)',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    opacity: status === 'submitting' ? 0.7 : 1,
                  }}
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
