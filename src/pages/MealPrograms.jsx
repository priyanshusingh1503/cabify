import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Team meals delivered',
    desc: 'Order lunch, dinner, or snacks for your team — delivered straight to the office.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>,
  },
  {
    title: 'Client catering',
    desc: 'Impress clients with catered meals during meetings, presentations, and events.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
  },
  {
    title: 'Late-night meals',
    desc: 'Keep your team fueled during late hours with dinner and snack deliveries.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>,
  },
  {
    title: 'Celebration events',
    desc: 'Order catering for team celebrations, birthdays, and company-wide events.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
  },
];

const cuisines = ['North Indian', 'South Indian', 'Chinese', 'Italian', 'Continental', 'Punjabi', 'Mughlai', 'Street Food', 'Healthy', 'Desserts'];

export default function MealPrograms() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    { q: 'How do I set up a meal program?', a: 'Log in to your Uber for Business dashboard, create a meal program, set a budget per employee, and choose which restaurants are available.' },
    { q: 'Can I limit what employees can order?', a: 'Yes. You can set spending limits per meal, restrict certain menu items, and choose approved restaurants.' },
    { q: 'Is there a minimum order?', a: 'Minimum orders vary by restaurant. Most restaurants on Uber Eats have a minimum order of ₹99-₹199.' },
    { q: 'Can I schedule recurring meals?', a: 'Yes. You can set up recurring meal programs for daily lunch, weekly team meals, or specific event dates.' },
    { q: 'How are meals billed?', a: 'All meal orders are billed directly to your company with detailed receipts. No expense claims needed.' },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <nav style={{ height: 64, background: '#fff', borderBottom: '1px solid #e2e2e2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ fontSize: 24, fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '-0.05em' }}>Uber</a>
        <button onClick={() => navigate('/login')} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 100, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Get started</button>
      </nav>

      <section style={{ background: '#000', color: '#fff', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ fontSize: 44, fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>Meal Programs for your team</h1>
          <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 32 }}>Keep your team fed and focused. Order meals from thousands of restaurants — billed directly to your company.</p>
          <button style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '14px 36px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Set up meal program</button>
        </div>
      </section>

      <section style={{ padding: '60px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>Why offer meal programs?</h2>
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

      <section style={{ background: '#f6f6f6', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>Cuisines available</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {cuisines.map((c, i) => (
              <span key={i} style={{ background: '#fff', border: '1px solid #e2e2e2', borderRadius: 100, padding: '8px 20px', fontSize: 14, fontWeight: 500 }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 24px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>How it works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { num: '1', title: 'Set your program', desc: 'Choose budget, restaurants, and eligible employees in your dashboard.' },
            { num: '2', title: 'Employees order', desc: 'Team members browse restaurants and order through Uber Eats.' },
            { num: '3', title: 'Company gets billed', desc: 'All orders are charged to the company with detailed receipts.' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, margin: '0 auto 16px' }}>{s.num}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#5e5e5e' }}>{s.desc}</p>
            </div>
          ))}
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
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Ready to feed your team?</h2>
        <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 24 }}>Set up a meal program in minutes.</p>
        <button style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '16px 48px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Get started</button>
      </section>
    </div>
  );
}
