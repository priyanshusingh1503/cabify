import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Pizza', icon: '🍕', color: '#FFF3E0' },
  { name: 'Biryani', icon: '🍛', color: '#FFEBEE' },
  { name: 'Chinese', icon: '🥟', color: '#FFF8E1' },
  { name: 'Burgers', icon: '🍔', color: '#E8F5E9' },
  { name: 'Desserts', icon: '🍰', color: '#FCE4EC' },
  { name: 'South Indian', icon: '🥞', color: '#E3F2FD' },
  { name: 'Punjabi', icon: '🍲', color: '#F3E5F5' },
  { name: 'Beverages', icon: '🥤', color: '#E0F7FA' },
  { name: 'Healthy', icon: '🥗', color: '#E8F5E9' },
  { name: 'Fast Food', icon: '🌭', color: '#FFF3E0' },
];

const restaurants = [
  { name: 'Dominos Pizza', rating: 4.2, time: '25-35 min', minOrder: '₹199', tag: 'Pizza', bg: '#E53935' },
  { name: 'Biryani Blues', rating: 4.4, time: '30-40 min', minOrder: '₹249', tag: 'Biryani', bg: '#F57C00' },
  { name: 'Haldiram\'s', rating: 4.5, time: '20-30 min', minOrder: '₹149', tag: 'North Indian', bg: '#43A047' },
  { name: 'McDonald\'s', rating: 4.1, time: '20-25 min', minOrder: '₹149', tag: 'Burgers', bg: '#D32F2F' },
  { name: 'Faasos', rating: 4.0, time: '25-35 min', minOrder: '₹99', tag: 'Wraps', bg: '#7B1FA2' },
  { name: 'Box8', rating: 4.3, time: '25-30 min', minOrder: '₹179', tag: 'Indian', bg: '#1565C0' },
  { name: 'Chaayos', rating: 4.3, time: '20-30 min', minOrder: '₹99', tag: 'Tea & Snacks', bg: '#BF360C' },
  { name: 'Behrouz Biryani', rating: 4.5, time: '35-45 min', minOrder: '₹299', tag: 'Biryani', bg: '#4A148C' },
  { name: 'Sweet Truth', rating: 4.4, time: '20-30 min', minOrder: '₹99', tag: 'Desserts', bg: '#880E4F' },
  { name: 'Lunchbox', rating: 4.2, time: '25-35 min', minOrder: '₹199', tag: 'Meals', bg: '#00695C' },
];

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Chandigarh', 'Lucknow', 'Bhopal'];

export default function Eats() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deliveryAddr, setDeliveryAddr] = useState('');

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      {/* Nav */}
      <nav style={{ height: 64, background: '#fff', borderBottom: '1px solid #e2e2e2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="/" style={{ fontSize: 24, fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '-0.05em' }}>Uber</a>
          <span style={{ fontSize: 14, color: '#5e5e5e', cursor: 'pointer' }} onClick={() => navigate('/ride')}>Ride</span>
          <span style={{ fontSize: 14, color: '#5e5e5e', cursor: 'pointer' }} onClick={() => navigate('/drive-page')}>Drive</span>
          <span style={{ fontSize: 14, fontWeight: 500, borderBottom: '2px solid #000', paddingBottom: 2, cursor: 'pointer' }}>Eats</span>
        </div>
        <button onClick={() => navigate('/login')} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 100, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Log in</button>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #000 0%, #333 100%)', color: '#fff', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ fontSize: 44, fontWeight: 700, marginBottom: 12 }}>Order food delivery</h1>
          <p style={{ fontSize: 18, marginBottom: 32, opacity: 0.85 }}>from your favourite restaurants near you</p>
          <div style={{ background: '#fff', borderRadius: 12, padding: 16, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ flex: 1, minWidth: 180, display: 'flex', alignItems: 'center', gap: 8, background: '#f6f6f6', borderRadius: 8, padding: '0 12px' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#5e5e5e"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <input type="text" placeholder="Delivery address" value={deliveryAddr} onChange={e => setDeliveryAddr(e.target.value)} style={{ flex: 1, height: 44, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
            </div>
            <div style={{ flex: 1, minWidth: 180, display: 'flex', alignItems: 'center', gap: 8, background: '#f6f6f6', borderRadius: 8, padding: '0 12px' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#5e5e5e"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              <input type="text" placeholder="Search food or restaurant" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, height: 44, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '40px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>What are you craving?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12 }}>
          {categories.map((c, i) => (
            <div key={i} style={{ background: c.color, borderRadius: 12, padding: 16, textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <span style={{ fontSize: 32, display: 'block', marginBottom: 6 }}>{c.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurants */}
      <section style={{ padding: '0 24px 60px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Popular restaurants near you</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
          {(search ? filtered : restaurants).map((r, i) => (
            <div key={i} style={{ border: '1px solid #e2e2e2', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <div style={{ height: 120, background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 40, fontWeight: 700 }}>{r.name.charAt(0)}</div>
              <div style={{ padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600 }}>{r.name}</h3>
                  <span style={{ fontSize: 12, background: '#f6f6f6', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>★ {r.rating}</span>
                </div>
                <p style={{ fontSize: 12, color: '#5e5e5e', marginBottom: 2 }}>{r.time} · Min {r.minOrder}</p>
                <p style={{ fontSize: 12, color: '#5e5e5e' }}>{r.tag}</p>
              </div>
            </div>
          ))}
        </div>
        {search && filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#5e5e5e', marginTop: 40, fontSize: 16 }}>No restaurants found for "{search}"</p>
        )}
      </section>

      {/* How it works */}
      <section style={{ background: '#f6f6f6', padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>How Uber Eats works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { num: '1', icon: '📱', title: 'Browse', desc: 'Find restaurants near you and browse their menus.' },
              { num: '2', icon: '🛒', title: 'Order & pay', desc: 'Customize your order and pay securely in-app.' },
              { num: '3', icon: '🚀', title: 'Track delivery', desc: 'Track your order in real-time from the restaurant to your door.' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 20 }}>
                <span style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>{s.icon}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#5e5e5e' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner */}
      <section style={{ padding: '60px 24px', textAlign: 'center', background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Partner with Uber Eats</h2>
          <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 24 }}>Grow your restaurant's reach — join Uber Eats and start receiving orders today.</p>
          <button style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '14px 36px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Add your restaurant</button>
        </div>
      </section>

      {/* Cities */}
      <section style={{ padding: '40px 24px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Available in these cities</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {cities.map((city, i) => (
            <span key={i} style={{ background: '#f6f6f6', borderRadius: 100, padding: '6px 14px', fontSize: 13, fontWeight: 500 }}>{city}</span>
          ))}
        </div>
      </section>

      {/* App download */}
      <section style={{ padding: '0 24px 60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Download the app</h2>
        <p style={{ fontSize: 14, color: '#5e5e5e', marginBottom: 20 }}>Order food delivery anytime, anywhere.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ height: 44 }} />
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" style={{ height: 44 }} />
        </div>
      </section>
    </div>
  );
}
