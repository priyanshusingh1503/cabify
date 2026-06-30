import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const rideTypes = [
  { name: 'UberGo', price: '₹621.00', eta: '3 min away', desc: 'Affordable, everyday rides', seats: 4 },
  { name: 'Premier', price: '₹914.00', eta: '5 min away', desc: 'Comfortable sedans, top-quality drivers', seats: 4 },
  { name: 'UberXL', price: '₹1,242.00', eta: '8 min away', desc: 'Affordable rides for groups up to 6', seats: 6 },
];

const faqs = [
  { q: 'How do I request a ride to the airport?', a: 'Enter your pickup location above, select your destination airport from the list, choose a ride type that fits your needs, and tap Request. Your driver will pick you up and take you directly to the airport terminal.' },
  { q: 'Can I schedule an airport ride in advance?', a: 'Yes, you can reserve a ride up to 90 days in advance using Uber Reserve. This gives you peace of mind knowing a driver will be ready for you at your chosen time.' },
  { q: 'How much does an airport ride cost?', a: 'Fares vary based on distance, ride type, and demand. You will see the exact fare before confirming your ride. UberGo is our most affordable option, while Premier and UberXL offer more space and comfort.' },
  { q: 'Does Uber drop off at all airport terminals?', a: 'Yes, Uber can drop you off at the designated rideshare pickup and dropoff zones at all major airports. Follow the airport signs for rideshare services after you arrive.' },
  { q: 'What if my flight is delayed?', a: 'For Reserve rides, Uber automatically tracks your flight and adjusts the pickup time. For on-demand rides, simply request when you have landed and collected your baggage.' },
  { q: 'Can I book a ride from the airport to my hotel?', a: 'Absolutely. Open the app after you land, enter your hotel as the destination, and request a ride from the airport pickup zone.' },
];

export default function AirportRide() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [extraStop, setExtraStop] = useState(false);
  const [selectedRide, setSelectedRide] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleSearch = () => {
    if (!pickup.trim() || !dropoff.trim()) return;
    setShowResults(true);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setShowResults(false);
      setPickup('');
      setDropoff('');
    }, 4000);
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      {/* ===== MAP + BOOKING SECTION ===== */}
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        <aside style={{ width: 400, maxWidth: '100%', padding: 24, overflowY: 'auto', borderRight: '1px solid #e2e2e2', background: '#fff' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#5e5e5e', padding: 0 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back
          </button>

          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Request an airport ride</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px', marginBottom: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid #000', flexShrink: 0 }}></div>
              <input type="text" placeholder="Enter pickup location" value={pickup} onChange={e => setPickup(e.target.value)} style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#000', flexShrink: 0 }}></div>
              <input type="text" placeholder="Enter dropoff location (e.g. Delhi Airport)" value={dropoff} onChange={e => setDropoff(e.target.value)} style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
              <button onClick={() => setExtraStop(!extraStop)} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #e2e2e2', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#f6f6f6', borderRadius: 8, marginBottom: 16, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            <span>Now</span>
            <svg style={{ marginLeft: 'auto' }} viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
          </div>
          <button onClick={handleSearch} style={{ width: '100%', height: 52, background: '#000', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Search</button>

          {showResults && !confirmed && (
            <div style={{ marginTop: 20, borderTop: '1px solid #e2e2e2', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>Choose a ride</h3>
                <button onClick={() => setShowResults(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#5e5e5e' }}>&times;</button>
              </div>
              {rideTypes.map((r, i) => (
                <div key={i} onClick={() => setSelectedRide(i)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, cursor: 'pointer', border: selectedRide === i ? '2px solid #000' : '2px solid transparent', background: selectedRide === i ? '#f6f6f6' : 'transparent', marginBottom: 8 }}>
                  <div style={{ flexShrink: 0, width: 56 }}>
                    <svg viewBox="0 0 64 64" width="56" height="36"><rect x="8" y="22" width="48" height="18" rx="5" fill="#000"/><circle cx="18" cy="42" r="5" fill="#333"/><circle cx="46" cy="42" r="5" fill="#333"/><rect x="38" y="16" width="16" height="8" rx="3" fill="#222"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 15, fontWeight: 600 }}>{r.name}</span><span style={{ fontWeight: 600 }}>{r.price}</span></div>
                    <p style={{ fontSize: 12, color: '#5e5e5e', marginTop: 2 }}>{r.eta} · {r.seats} seats</p>
                    <p style={{ fontSize: 12, color: '#5e5e5e' }}>{r.desc}</p>
                  </div>
                </div>
              ))}
              <button onClick={handleConfirm} style={{ width: '100%', height: 48, background: '#000', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
                Request {rideTypes[selectedRide].name}
              </button>
            </div>
          )}

          {confirmed && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 10, background: '#f0fdf4', border: '1px solid #06c167' }}>
              <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Ride confirmed!</p>
              <p style={{ fontSize: 13, color: '#5e5e5e' }}>{rideTypes[selectedRide].name} to {dropoff}</p>
              <p style={{ fontSize: 12, color: '#06c167', marginTop: 6 }}>Driver assigned! ETA ~{rideTypes[selectedRide].eta}</p>
            </div>
          )}
        </aside>

        <div style={{ flex: 1, background: '#e5e3df', position: 'relative' }}>
          <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xMzRlZmM5Yy1mNjdkLTQ4MWItOGMzZC1kMzQ2MDVjMzA3NzkucG5n" alt="Airport rides" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* ===== DESCRIPTION SECTION ===== */}
      <section style={{ background: '#f6f6f6', padding: '80px 50px' }}>
        <div style={{ maxWidth: 1150, margin: '0 auto' }}>
          <h2 style={{ fontSize: 52, fontWeight: 700, marginBottom: 20 }}>Stress-free airport travel</h2>
          <p style={{ fontSize: 20, color: '#333', lineHeight: 1.7, marginBottom: 50, maxWidth: 700 }}>
            Whether you are catching a flight or returning home, Uber makes airport transfers easy and reliable.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
            {[
              { title: 'Track your flight', desc: 'Uber Reserve automatically monitors your flight status and adjusts pickup time if your flight is delayed.', icon: '✈️' },
              { title: 'Fixed upfront pricing', desc: 'See the exact fare before you book. No surprises, no hidden fees — just a smooth ride to the terminal.', icon: '₹' },
              { title: '24/7 availability', desc: 'Airport rides are available around the clock. Early morning flight? Late night arrival? We have you covered.', icon: '🕐' },
              { title: 'Plenty of space', desc: 'Choose UberXL for extra luggage or group travel. Every ride type includes trunk space for your bags.', icon: '🧳' },
              { title: 'Meet at the curb', desc: 'Get dropped off at the designated rideshare zone right outside your terminal. No shuttles needed.', icon: '🚗' },
              { title: 'Ride with confidence', desc: 'All drivers are verified, trips are GPS-tracked, and help is available 24/7 through the app.', icon: '🛡️' },
            ].map((c, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #e2e2e2' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{c.title}</h3>
                <p style={{ fontSize: 16, color: '#555', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE UBER SECTION ===== */}
      <section style={{ padding: '80px 50px', background: '#fff' }}>
        <div style={{ maxWidth: 1150, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.1, marginBottom: 30 }}>Why choose Uber for airport rides?</h2>
            <p style={{ fontSize: 18, color: '#333', lineHeight: 1.7, marginBottom: 30 }}>
              With millions of airport trips completed worldwide, Uber is the most trusted rideshare service for airport travel. 
              From real-time flight tracking to upfront pricing, every feature is designed to make your journey seamless.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Available at 700+ airports worldwide', 'Cancel free up to 60 minutes before pickup', 'Share your trip with friends and family', 'Choose from multiple ride options to fit your budget'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, fontSize: 16 }}>
                  <span style={{ color: '#06c167', fontSize: 20 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button style={{ marginTop: 10, background: '#000', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Book an airport ride</button>
          </div>
          <div style={{ flex: 1 }}>
            <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1152/height=768/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9jNjQyNWRmNC0zMTkwLTRmZTEtODY2Ni02YTVhZjJjMGEwNDkucG5n" alt="Airport ride" style={{ width: '100%', borderRadius: 16 }} />
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section style={{ padding: '80px 50px', background: '#f6f6f6' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 48, fontWeight: 700, marginBottom: 40 }}>Frequently asked questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid #e5e5e5' }}>
              <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{ width: '100%', border: 'none', background: 'transparent', padding: '24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: 18, fontWeight: 500, color: '#111', textAlign: 'left' }}>
                {faq.q} <span style={{ fontSize: 14, color: '#111', transform: expandedFaq === i ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.3s' }}>ᐯ</span>
              </button>
              <div style={{ maxHeight: expandedFaq === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                <p style={{ padding: '0 20px 25px', fontSize: 16, color: '#555', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
