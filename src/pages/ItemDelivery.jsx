import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Same-day delivery',
    desc: 'Deliver documents, parcels, and packages across the city on the same day.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>,
  },
  {
    title: 'Real-time tracking',
    desc: 'Track your packages in real-time from pickup to dropoff with live updates.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
  },
  {
    title: 'Centralized billing',
    desc: 'All deliveries are billed directly to your company. No expense claims needed.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>,
  },
  {
    title: 'Multi-package',
    desc: 'Send multiple packages to different locations in a single trip.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>,
  },
];

export default function ItemDelivery() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    { q: 'How fast is item delivery?', a: 'Most deliveries within the same city are completed within 30-60 minutes depending on distance and traffic.' },
    { q: 'What items can I send?', a: 'Documents, parcels, gifts, food, and most small to medium-sized packages. Restricted items include hazardous materials and perishables without proper packaging.' },
    { q: 'Is there a weight limit?', a: 'Yes, each package can weigh up to 10 kg. For larger items, contact Uber Freight.' },
    { q: 'Can I send to multiple addresses?', a: 'Yes, you can add multiple dropoff stops to deliver packages to different locations in one trip.' },
    { q: 'How is billing handled?', a: 'All deliveries are billed directly to your company with detailed receipts for each package.' },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <nav style={{ height: 64, background: '#fff', borderBottom: '1px solid #e2e2e2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="/" style={{ fontSize: 24, fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '-0.05em' }}>Uber</a>
          <span style={{ fontSize: 14, color: '#5e5e5e', cursor: 'pointer' }} onClick={() => navigate('/courier')}>Courier</span>
        </div>
        <button onClick={() => navigate('/login')} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 100, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Get started</button>
      </nav>

      <section style={{ background: '#000', color: '#fff', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ fontSize: 44, fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>Item Delivery for your business</h1>
          <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 32 }}>Send documents, parcels, and packages across the city in under an hour. Billed directly to your company.</p>
          <button style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '14px 36px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Start delivering</button>
        </div>
      </section>

      <section style={{ padding: '60px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>Why use Uber for deliveries?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#f6f6f6', borderRadius: 12, padding: 24 }}>
              <div style={{ marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#5e5e5e' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#f6f6f6', padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>How it works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { num: '1', title: 'Enter pickup & dropoff', desc: 'Tell us where to pick up and drop off your package.' },
              { num: '2', title: 'Driver picks up', desc: 'A nearby driver collects your package and heads to the destination.' },
              { num: '3', title: 'Track & delivered', desc: 'Track in real-time. Recipient gets notified on arrival.' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, margin: '0 auto 16px' }}>{s.num}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#5e5e5e' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 24px', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 32 }}>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid #e2e2e2' }}>
            <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '18px 0', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 15, fontWeight: 500, textAlign: 'left' }}>
              <span>{faq.q}</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ transform: expandedFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
              </svg>
            </button>
            {expandedFaq === i && (
              <div style={{ padding: '0 0 18px 0', fontSize: 14, color: '#5e5e5e', lineHeight: 1.6 }}>{faq.a}</div>
            )}
          </div>
        ))}
      </section>

      <section style={{ padding: '60px 24px', textAlign: 'center', background: '#000', color: '#fff' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Ready to start delivering?</h2>
        <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 24 }}>Send your first package today.</p>
        <button style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '16px 48px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Get started</button>
      </section>
    </div>
  );
}
