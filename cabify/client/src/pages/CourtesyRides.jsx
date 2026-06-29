import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Impressive client experience',
    desc: 'Offer your guests a seamless, branded ride experience from airport to meeting to hotel.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
  },
  {
    title: 'Easy scheduling',
    desc: 'Schedule rides in advance for your guests. They get a text with driver details and ETA.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>,
  },
  {
    title: 'Centralized billing',
    desc: 'All courtesy rides are billed directly to your company. No reimbursements needed.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>,
  },
  {
    title: 'Branded experience',
    desc: 'Customize the ride experience with your company name and messaging for guests.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>,
  },
];

const useCases = [
  { title: 'Airport pickup', desc: 'Greet clients at the airport with a pre-booked Uber waiting for them.' },
  { title: 'Client meetings', desc: 'Arrange rides for guests coming to your office for meetings.' },
  { title: 'Event transportation', desc: 'Provide hassle-free rides for attendees at your corporate events.' },
  { title: 'Hotel transfer', desc: 'Offer complimentary hotel transfers for out-of-town visitors.' },
];

export default function CourtesyRides() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    { q: 'How do I set up a courtesy ride?', a: 'Log in to your Uber for Business dashboard, create a ride program, and select "Courtesy" as the program type. Then you can schedule rides for your guests.' },
    { q: 'Can I schedule rides in advance?', a: 'Yes. You can schedule courtesy rides up to 30 days in advance. Guests receive SMS notifications with driver details.' },
    { q: 'How are guests notified?', a: 'Guests receive an SMS or email with a link to track their ride. No app download required.' },
    { q: 'Do guests need the Uber app?', a: 'No. Guests can track and manage their ride through a web link. The app is optional.' },
    { q: 'Can I set spending limits?', a: 'Yes. You can set per-ride limits and total program budgets for courtesy rides.' },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <nav style={{ height: 64, background: '#fff', borderBottom: '1px solid #e2e2e2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ fontSize: 24, fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '-0.05em' }}>Uber</a>
        <button onClick={() => navigate('/login')} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 100, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Get started</button>
      </nav>

      {/* Hero */}
      <section style={{ background: '#000', color: '#fff', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ fontSize: 44, fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>Courtesy Rides for your guests</h1>
          <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 32 }}>
            Provide a premium transportation experience for your clients and visitors — billed directly to your company.
          </p>
          <button style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '14px 36px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Set up courtesy rides</button>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '60px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>Why offer courtesy rides?</h2>
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

      {/* Use cases */}
      <section style={{ background: '#f6f6f6', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>Common use cases</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {useCases.map((u, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e2e2' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{u.title}</h3>
                <p style={{ fontSize: 13, color: '#5e5e5e' }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '60px 24px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>How it works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { num: '1', title: 'Create a program', desc: 'Set up a courtesy ride program in your Uber for Business dashboard.' },
            { num: '2', title: 'Schedule a ride', desc: 'Enter guest details and trip information to book the ride.' },
            { num: '3', title: 'Guest rides free', desc: 'Your guest receives a notification and enjoys a seamless ride.' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, margin: '0 auto 16px' }}>{s.num}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#5e5e5e' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
      <section style={{ padding: '60px 24px', textAlign: 'center', background: '#000', color: '#fff' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Ready to impress your guests?</h2>
        <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 24 }}>Set up courtesy rides for your business in minutes.</p>
        <button style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '16px 48px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Get started</button>
      </section>
    </div>
  );
}
