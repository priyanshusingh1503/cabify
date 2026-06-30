import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    title: 'Ride Programs',
    desc: 'Give employees and clients on-demand rides for work commutes, client meetings, and events.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.14-.4.52-.68.96-.68h9.54c.44 0 .82.28.96.68L19 11H5z"/></svg>,
  },
  {
    title: 'Uber Eats for Work',
    desc: 'Deliver meals to employees for lunch, late-night work, or team celebrations.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>,
  },
  {
    title: 'Centralized Billing',
    desc: 'All business trips billed directly to your company. No individual expense claims.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>,
  },
  {
    title: 'Expense Management',
    desc: 'Auto-categorized receipts and detailed trip reports that integrate with your accounting tools.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>,
  },
  {
    title: 'Safety Tools',
    desc: 'Real-time trip tracking, driver verification, share trip with colleagues, and 24/7 support.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>,
  },
  {
    title: 'Reporting & Analytics',
    desc: 'Track spending, trip patterns, and usage across your organization with detailed dashboards.',
    icon: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>,
  },
];

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'For small teams getting started with business travel.',
    features: ['Basic ride programs', 'Centralized billing', 'Email support', 'Up to 10 employees'],
  },
  {
    name: 'Business',
    price: '₹499/month',
    desc: 'For growing companies with more travel needs.',
    features: ['Advanced ride programs', 'Uber Eats for work', 'Priority support', 'Up to 100 employees', 'Expense integration', 'Basic analytics'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large organizations with complex travel requirements.',
    features: ['Custom ride & eats programs', 'Dedicated account manager', '24/7 premium support', 'Unlimited employees', 'Advanced analytics', 'API access', 'Custom integrations'],
  },
];

const faqs = [
  { q: 'How does centralized billing work?', a: 'All rides and meal deliveries booked by employees are charged directly to the company. Detailed receipts are automatically generated for each trip.' },
  { q: 'Can I control which employees can book rides?', a: 'Yes. Admins can set up ride programs with specific policies, budgets, and approved employee lists.' },
  { q: 'How do I integrate with my accounting software?', a: 'Uber for Business offers direct integrations with major expense management platforms like Concur, Expensify, and Zoho Expense.' },
  { q: 'Is there a minimum number of employees?', a: 'No. Starter plan works for teams of any size. Business and Enterprise plans scale with your needs.' },
  { q: 'Can I set spending limits per employee?', a: 'Yes. You can configure per-trip, per-day, and per-month limits for each employee or team.' },
  { q: 'What support options are available?', a: 'Starter includes email support. Business includes priority support. Enterprise includes a dedicated account manager and 24/7 phone support.' },
];

export default function Business() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>

      {/* Hero */}
      <section style={{ background: '#000', color: '#fff', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>Uber for Business</h1>
          <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 32, lineHeight: 1.5 }}>
            Simplify business travel and meals. Give your team the flexibility to ride and eat on the company account.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button onClick={() => navigate('/uber-business')} style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Get started</button>
            <button onClick={() => navigate('/uber-business')} style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Contact sales</button>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ padding: '40px 24px', textAlign: 'center', borderBottom: '1px solid #e2e2e2' }}>
        <p style={{ fontSize: 14, color: '#5e5e5e', marginBottom: 16 }}>Trusted by thousands of businesses worldwide</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', color: '#bbb', fontSize: 20, fontWeight: 700, letterSpacing: '0.05em' }}>
          {['GOOGLE', 'P&G', 'WALMART', 'UNILEVER', 'CISCO', 'ADIDAS'].map(name => (
            <span key={name} style={{ opacity: 0.5 }}>{name}</span>
          ))}
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: '60px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Everything your business needs</h2>
        <p style={{ fontSize: 16, color: '#5e5e5e', textAlign: 'center', marginBottom: 40 }}>From rides to meals, manage it all from one dashboard.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {products.map((p, i) => (
            <div key={i} style={{ background: '#f6f6f6', borderRadius: 12, padding: 24 }}>
              <div style={{ marginBottom: 12 }}>{p.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: '#5e5e5e', lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: '#f6f6f6', padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>Get started in minutes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { num: '1', title: 'Create your account', desc: 'Sign up with your work email and set up your company profile.' },
              { num: '2', title: 'Set policies', desc: 'Define ride programs, spending limits, and eligible employees.' },
              { num: '3', title: 'Invite your team', desc: 'Add employees — they can start booking rides and meals immediately.' },
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

      {/* Plans */}
      <section style={{ padding: '60px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>Choose your plan</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {plans.map((plan, i) => (
            <div key={i} style={{ border: plan.popular ? '2px solid #000' : '1px solid #e2e2e2', borderRadius: 16, padding: 32, position: 'relative' }}>
              {plan.popular && <span style={{ position: 'absolute', top: -12, left: 24, background: '#000', color: '#fff', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 100 }}>Most popular</span>}
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{plan.name}</h3>
              <p style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{plan.price}</p>
              <p style={{ fontSize: 13, color: '#5e5e5e', marginBottom: 20 }}>{plan.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 24 }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, marginBottom: 10 }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#06c167"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/uber-business')} style={{ width: '100%', height: 44, background: plan.popular ? '#000' : '#f6f6f6', color: plan.popular ? '#fff' : '#000', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Get started</button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: '#000', color: '#fff', padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>Trusted by industry leaders</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { quote: '"Uber for Business saved us 30% on travel costs and made expense reporting effortless."', name: 'Anita Sharma', role: 'CFO, TechCorp India' },
              { quote: '"Our team loves the convenience. Setting up ride programs for employees took just 10 minutes."', name: 'Raj Mehta', role: 'VP Operations, GreenLeaf Enterprises' },
              { quote: '"The centralized billing and analytics gave us complete visibility into travel spend."', name: 'Priya Singh', role: 'Finance Director, Nexus Group' },
            ].map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 24, textAlign: 'left' }}>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 16, fontStyle: 'italic', opacity: 0.9 }}>{t.quote}</p>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</p>
                <p style={{ fontSize: 12, opacity: 0.6 }}>{t.role}</p>
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
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Ready to simplify business travel?</h2>
        <p style={{ fontSize: 16, color: '#5e5e5e', marginBottom: 24 }}>Join thousands of companies using Uber for Business.</p>
        <button onClick={() => navigate('/uber-business')} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 8, padding: '16px 48px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Get started free</button>
      </section>
    </div>
  );
}
