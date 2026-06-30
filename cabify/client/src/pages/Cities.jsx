import { useNavigate } from 'react-router-dom';

const cities = [
  { name: 'Delhi', rides: '12,000+', drivers: '3,200+' },
  { name: 'Mumbai', rides: '15,000+', drivers: '4,100+' },
  { name: 'Bengaluru', rides: '18,000+', drivers: '5,300+' },
  { name: 'Hyderabad', rides: '9,000+', drivers: '2,400+' },
  { name: 'Chennai', rides: '8,500+', drivers: '2,200+' },
  { name: 'Kolkata', rides: '7,200+', drivers: '1,900+' },
  { name: 'Pune', rides: '6,800+', drivers: '1,800+' },
  { name: 'Ahmedabad', rides: '5,400+', drivers: '1,400+' },
  { name: 'Jaipur', rides: '4,600+', drivers: '1,200+' },
  { name: 'Lucknow', rides: '3,800+', drivers: '980+' },
  { name: 'Bhopal', rides: '2,100+', drivers: '620+' },
  { name: 'Patna', rides: '1,800+', drivers: '480+' },
  { name: 'Indore', rides: '2,400+', drivers: '710+' },
  { name: 'Nagpur', rides: '1,600+', drivers: '420+' },
  { name: 'Chandigarh', rides: '2,800+', drivers: '750+' },
  { name: 'Kochi', rides: '3,200+', drivers: '890+' },
];

export default function Cities() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif", maxWidth: 1150, margin: '0 auto', padding: '32px 24px 80px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#5e5e5e', padding: 0 }}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back
      </button>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>Cities we serve</h1>
      <p style={{ fontSize: 16, color: '#5e5e5e', marginBottom: 40 }}>Uber is available in 15,000+ cities across the world. Here are some in India.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {cities.map((c) => (
          <div key={c.name} onClick={() => navigate('/ride')} style={{ padding: '20px 24px', borderRadius: 12, border: '1px solid #e2e2e2', cursor: 'pointer', transition: 'box-shadow 0.2s, border-color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#000'; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e2e2'; }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{c.name}</h3>
            <p style={{ fontSize: 13, color: '#5e5e5e', marginBottom: 2 }}>{c.rides} rides completed</p>
            <p style={{ fontSize: 13, color: '#5e5e5e' }}>{c.drivers} active drivers</p>
          </div>
        ))}
      </div>
    </div>
  );
}
