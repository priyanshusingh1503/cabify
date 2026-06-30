import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const benefits = [
  {
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
    title: 'Set your own hours',
    desc: 'You decide when and how long you drive. No minimum hours and no boss.'
  },
  {
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>,
    title: 'Get paid fast',
    desc: 'Weekly pay with Instant Pay option to cash out up to 5 times a day.'
  },
  {
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M21 6h-2v3h-2V6h-2V4h2V2h2v2h2v2zm-10 3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 4c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
    title: '24/7 support',
    desc: 'Get support whenever you need it — before, during, and after trips.'
  },
  {
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/></svg>,
    title: 'Earn more with promotions',
    desc: 'Complete trips in busy areas and earn bonuses, surge pricing, and more.'
  },
];

const steps = [
  { num: '1', title: 'Register to drive', desc: 'Fill out a short form with your basic info to get started.' },
  { num: '2', title: 'Get approved', desc: "We'll review your documents — usually within a few days." },
  { num: '3', title: 'Start earning', desc: 'Go online, accept trips, and start making money immediately.' },
];

export default function Drive() {
  const navigate = useNavigate();
  const [hours, setHours] = useState(20);
  const [earnings, setEarnings] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const calculate = () => {
    const weekly = Math.round(hours * 250);
    setEarnings({ weekly, monthly: weekly * 4, yearly: weekly * 52 });
  };

  const faqs = [
    { q: 'What are the requirements to drive?', a: "You must be at least 21 years old, have a valid driver's license, a qualifying 4-door vehicle, and pass a background check." },
    { q: 'How much can I earn?', a: 'Earnings vary by city, time of day, and demand. On average, drivers earn ₹200-₹300 per hour in most Indian cities.' },
    { q: 'When do I get paid?', a: 'Earnings are deposited weekly. You can also use Instant Pay to cash out up to 5 times per day.' },
    { q: 'Can I drive part-time?', a: 'Yes! There are no minimum hours. Drive as little or as much as you want.' },
    { q: 'What kind of support is available?', a: 'We offer 24/7 phone, chat, and in-app support for all drivers.' },
    { q: 'Do I need my own car?', a: 'Yes, you need a qualifying 4-door vehicle. In some cities, rental options are also available.' },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Hero */}
      <section style={{ background: '#f6f6f6', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>Drive with Uber and earn money on your schedule</h1>
          <p style={{ fontSize: 18, color: '#5e5e5e', marginBottom: 32 }}>Make money on your own time. Sign up to drive and join millions already earning with Uber.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
            <input type="number" value={hours} onChange={e => setHours(e.target.value)} min="1" max="168" style={{ width: 100, height: 52, border: '1px solid #e2e2e2', borderRadius: 8, padding: '0 12px', fontSize: 16, textAlign: 'center', outline: 'none' }} />
            <span style={{ fontSize: 16, display: 'flex', alignItems: 'center', fontWeight: 500 }}>hours per week</span>
            <button onClick={calculate} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 8, padding: '0 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer', height: 52 }}>Calculate</button>
          </div>
          {earnings && (
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', maxWidth: 500, margin: '24px auto 0' }}>
              <p style={{ fontSize: 14, color: '#5e5e5e', marginBottom: 8 }}>Estimated earnings for {hours} hrs/week in Bhopal</p>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div><p style={{ fontSize: 24, fontWeight: 700 }}>₹{earnings.weekly.toLocaleString()}</p><p style={{ fontSize: 12, color: '#5e5e5e' }}>Weekly</p></div>
                <div><p style={{ fontSize: 24, fontWeight: 700 }}>₹{earnings.monthly.toLocaleString()}</p><p style={{ fontSize: 12, color: '#5e5e5e' }}>Monthly</p></div>
                <div><p style={{ fontSize: 24, fontWeight: 700 }}>₹{earnings.yearly.toLocaleString()}</p><p style={{ fontSize: 12, color: '#5e5e5e' }}>Yearly</p></div>
              </div>
            </div>
          )}
          <div style={{ marginTop: 32 }}><button style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 8, padding: '16px 48px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Sign up to drive</button></div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '60px 24px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>How it works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, margin: '0 auto 16px' }}>{s.num}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#5e5e5e' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section style={{ background: '#f6f6f6', padding: '60px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>What you need to get started</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {[
              { title: "Valid driver's license", desc: "A valid driver's license for the city you'll drive in." },
              { title: '4-door vehicle', desc: "A qualifying 4-door car that meets Uber's requirements." },
              { title: 'Background check', desc: 'A clean background check as required by local regulations.' },
              { title: 'Minimum age 21', desc: 'You must be at least 21 years old to drive with Uber.' },
              { title: 'Smartphone', desc: 'A smartphone to run the Uber Driver app.' },
              { title: 'Insurance', desc: 'Valid vehicle insurance and registration.' },
            ].map((req, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#06c167', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{req.title}</h3>
                  <p style={{ fontSize: 13, color: '#5e5e5e' }}>{req.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '60px 24px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>Why drive with Uber?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ background: '#f6f6f6', borderRadius: 12, padding: 24 }}>
              <div style={{ marginBottom: 12 }}>{b.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{b.title}</h3>
              <p style={{ fontSize: 14, color: '#5e5e5e' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: '#000', color: '#fff', padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>What drivers say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { name: 'Rajesh K.', city: 'Mumbai', quote: '"I drive 25 hours a week and earn enough to support my family. The flexibility is unmatched."' },
              { name: 'Priya S.', city: 'Bangalore', quote: '"I love that I can drive when my kids are at school. It fits perfectly around my schedule."' },
              { name: 'Amit P.', city: 'Delhi', quote: '"The promotions and surge pricing make weekends really worth it. Great side income."' },
            ].map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 24, textAlign: 'left' }}>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 16, fontStyle: 'italic', opacity: 0.9 }}>{t.quote}</p>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</p>
                <p style={{ fontSize: 12, opacity: 0.6 }}>{t.city}</p>
              </div>
            ))}
          </div>
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
      <section style={{ padding: '60px 24px', textAlign: 'center', background: '#f6f6f6' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Ready to get started?</h2>
        <p style={{ fontSize: 16, color: '#5e5e5e', marginBottom: 24 }}>Sign up today and start earning in as little as a few days.</p>
        <button style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 8, padding: '16px 48px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Sign up to drive</button>
      </section>
    </div>
  );
}
