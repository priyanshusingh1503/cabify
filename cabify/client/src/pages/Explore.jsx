import { useNavigate } from 'react-router-dom';

const exploreData = [
  { title: 'Ride', desc: 'Go anywhere, get anything', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
  { title: 'Reserve', desc: 'Reserve your ride in advance', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
  { title: 'Intercity', desc: 'Outstation rides to nearby cities', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
  { title: 'Rental', desc: 'Hourly packages with multiple stops', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
  { title: 'Package', desc: 'Send a package anywhere in town', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
  { title: 'Airport', desc: 'Hassle-free airport transfers', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
  { title: 'Connect', desc: 'Auto-rickshaw rides starting at ₹10/km', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
  { title: 'Rickshaw', desc: 'Electric rickshaw rides in your city', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
  { title: 'Moto', desc: 'Affordable bike rides', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
  { title: 'Auto', desc: 'Auto-rickshaw rides starting at ₹10/km', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
  { title: 'Bike', desc: 'Affordable bike rides', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
  { title: 'Business', desc: 'Uber for work', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_256,h_256/v1548646930/assets/64/20d09f-ba50-4a73-b0c1-05e4671592c8/original/Thumbnail.png' },
];

export default function Explore() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif", maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <nav style={{ height: 64, display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="/" style={{ fontSize: 24, fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '-0.05em' }}>Uber</a>
        <span style={{ fontSize: 14, fontWeight: 500, borderBottom: '2px solid #000', paddingBottom: 2, cursor: 'pointer' }}>Ride</span>
        <span style={{ fontSize: 14, color: '#5e5e5e', cursor: 'pointer' }} onClick={() => navigate('/driver')}>Drive</span>
        <span style={{ fontSize: 14, color: '#5e5e5e', cursor: 'pointer' }} onClick={() => navigate('/courier')}>Courier</span>
      </nav>

      <h1 style={{ fontSize: 36, fontWeight: 700, marginTop: 32, marginBottom: 8 }}>Explore</h1>
      <p style={{ fontSize: 16, color: '#5e5e5e', marginBottom: 32 }}>Find the perfect ride for your need.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 60 }}>
        {exploreData.map((item, i) => (
          <div key={i} style={{ border: '1px solid #e2e2e2', borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'box-shadow 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
            <img src={item.img} alt={item.title} style={{ width: 64, height: 64, marginBottom: 12 }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: '#5e5e5e' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
