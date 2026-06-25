import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const destinations = [
  { title: 'Bhopal to Indore', desc: '3 hr 30 min · ₹1,200-₹1,500', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=120&h=120&fit=crop' },
  { title: 'Bhopal to Jabalpur', desc: '4 hr 15 min · ₹1,800-₹2,200', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=120&h=120&fit=crop' },
  { title: 'Bhopal to Ujjain', desc: '3 hr · ₹1,000-₹1,300', img: 'https://images.unsplash.com/photo-1592578629295-73a151d69d96?w=120&h=120&fit=crop' },
  { title: 'Bhopal to Gwalior', desc: '5 hr 30 min · ₹2,500-₹3,000', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=120&h=120&fit=crop' },
  { title: 'Bhopal to Narmadapuram', desc: '1 hr 45 min · ₹600-₹800', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=120&fit=crop' },
];

const groupCards = [
  { title: 'Work trip?', desc: 'Share ride costs with nearby coworkers', icon: '💼' },
  { title: 'Weekend getaway?', desc: 'Split the fare with friends going the same way', icon: '🎉' },
  { title: 'Airport run?', desc: 'Save big by sharing your airport transfer', icon: '✈️' },
  { title: 'Late night?', desc: 'Stay safe and save — ride together!', icon: '🌙' },
];

export default function LearnMore() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const faqItems = [
    { q: 'How does Group Ride work?', a: 'You can invite up to 3 friends to share your ride. Each person pays their share through the app, making it cheaper for everyone.' },
    { q: 'Is Group Ride available in all cities?', a: 'Group Ride is currently available in select cities. Check the app to see if it\'s available in your area.' },
    { q: 'Can I add stops along the way?', a: 'Yes! You can add up to 2 additional stops during your Group Ride.' },
    { q: 'How is the fare split?', a: 'The fare is split equally among all confirmed riders in the group.' },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif", maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <nav style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontSize: 24, fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '-0.05em' }}>Uber</a>
        <button onClick={() => navigate(-1)} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 50, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Go back</button>
      </nav>

      {/* Hero */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 60, marginTop: 40, marginBottom: 60 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>Group Ride</h1>
          <p style={{ fontSize: 18, color: '#5e5e5e', marginBottom: 24, lineHeight: 1.5 }}>
            Split the fare with friends and family. Everyone pays less when you ride together.
          </p>
          <button style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Try Group Ride</button>
        </div>
        <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
          <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop" alt="Group ride" style={{ width: '100%', height: 350, objectFit: 'cover', display: 'block' }} />
        </div>
      </div>

      {/* How it works */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>How it works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {[
            { step: '1', title: 'Enter destination', desc: 'Set your dropoff location as usual.' },
            { step: '2', title: 'Select Group Ride', desc: 'Choose Group Ride from the ride options.' },
            { step: '3', title: 'Invite friends', desc: 'Share your ride code with up to 3 friends.' },
            { step: '4', title: 'Ride together', desc: 'Everyone rides together and splits the fare.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#f6f6f6', borderRadius: 12, padding: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{item.step}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: '#5e5e5e' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Popular destinations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {destinations.map((d, i) => (
            <div key={i} style={{ border: '1px solid #e2e2e2', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <img src={d.img} alt={d.title} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: 12 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{d.title}</h3>
                <p style={{ fontSize: 12, color: '#5e5e5e' }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Group Ride cards */}
      <section style={{ marginBottom: 60, background: '#f6f6f6', borderRadius: 16, padding: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Why choose Group Ride?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {groupCards.map((card, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #e2e2e2' }}>
              <span style={{ fontSize: 40, display: 'block', marginBottom: 8 }}>{card.icon}</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ fontSize: 13, color: '#5e5e5e' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ marginBottom: 60, maxWidth: 700, margin: '0 auto 60px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Frequently asked questions</h2>
        {faqItems.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid #e2e2e2', padding: '4px 0' }}>
            <button onClick={() => setExpanded(expanded === i ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '16px 0', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 15, fontWeight: 500, textAlign: 'left' }}>
              <span>{item.q}</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ transform: expanded === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
              </svg>
            </button>
            {expanded === i && (
              <div style={{ padding: '0 0 16px 0', fontSize: 14, color: '#5e5e5e', lineHeight: 1.6 }}>{item.a}</div>
            )}
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', marginBottom: 60, background: '#000', borderRadius: 16, padding: '48px 24px', color: '#fff' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Ready to ride together?</h2>
        <p style={{ fontSize: 16, opacity: 0.8, marginBottom: 24 }}>Download the app and try Group Ride today.</p>
        <button style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Get started</button>
      </section>
    </div>
  );
}
