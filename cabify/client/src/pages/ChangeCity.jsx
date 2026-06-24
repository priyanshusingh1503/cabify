import { useNavigate } from 'react-router-dom';

const cities = [
  'Ahmedabad', 'Agra', 'Amritsar', 'Bengaluru', 'Bhopal', 'Chandigarh', 'Chennai',
  'Coimbatore', 'Delhi', 'Ghaziabad', 'Goa', 'Gurgaon', 'Guwahati', 'Hyderabad',
  'Indore', 'Jaipur', 'Jodhpur', 'Kochi', 'Kolkata', 'Lucknow', 'Ludhiana',
  'Mumbai', 'Mysore', 'Nagpur', 'Noida', 'Patna', 'Pune', 'Raipur', 'Ranchi',
  'Siliguri', 'Surat', 'Thane', 'Trichy', 'Udaipur', 'Vadodara', 'Varanasi',
  'Vijayawada', 'Visakhapatnam',
];

export default function ChangeCity() {
  const navigate = useNavigate();
  const setCity = (city) => {
    localStorage.setItem('selectedCity', city);
    navigate('/');
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80,
      fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif",
    }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 520, maxWidth: '90vw', maxHeight: '70vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 16px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #e2e2e2' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Change City</h2>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#5e5e5e' }}>&times;</button>
        </div>
        <div style={{ padding: '12px 24px', borderBottom: '1px solid #e2e2e2' }}>
          <input type="text" placeholder="Search city..." style={{ width: '100%', height: 44, borderRadius: 8, border: '1px solid #e2e2e2', padding: '0 12px', fontSize: 14, outline: 'none' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, overflowY: 'auto', flex: 1 }}>
          {cities.map((city) => (
            <div key={city} onClick={() => setCity(city)}
              style={{ padding: '14px 24px', cursor: 'pointer', fontSize: 14, borderBottom: '1px solid #f0f0f0', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f6f6f6'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
