import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const carIcon = L.divIcon({
  className: '', html: `<div class="car-marker-inner"><svg viewBox="0 0 24 24" width="24" height="24" fill="#000000" style="filter:drop-shadow(0px 2px 4px rgba(0,0,0,0.3))"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.14-.4.52-.68.96-.68h9.54c.44 0 .82.28.96.68L19 11H5z"/></svg></div>`,
  iconSize: [28, 28],
});

export default function Ride() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedRide, setSelectedRide] = useState(0);
  const [toast, setToast] = useState({ msg: '', show: false });
  const [extraStop, setExtraStop] = useState(false);

  const showToast = (msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast({ msg: '', show: false }), 4000);
  };

  const rides = [
    { name: 'UberGo', price: '₹147.71', eta: '3 min away · 12:35 PM', desc: 'Affordable, everyday rides' },
    { name: 'Premier', price: '₹231.24', eta: '5 min away · 12:38 PM', desc: 'Comfortable sedans, top-quality drivers' },
    { name: 'UberXL', price: '₹298.50', eta: '8 min away · 12:40 PM', desc: 'Affordable rides for groups up to 6' },
  ];

  const handleSearch = () => {
    if (!pickup.trim() || !dropoff.trim()) { showToast('Please enter both pickup and dropoff locations.'); return; }
    setShowResults(true);
  };

  const handleRequest = () => {
    showToast(`Requesting ${rides[selectedRide].name}...`);
    setTimeout(() => { showToast('Driver assigned! ETA 3 mins.'); setShowResults(false); setPickup(''); setDropoff(''); }, 3000);
  };

  const mockCars = [
    { lat: 23.2645, lng: 77.4080 },
    { lat: 23.2520, lng: 77.4200 },
    { lat: 23.2710, lng: 77.4150 },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ height: 64, background: '#fff', borderBottom: '1px solid #e2e2e2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <a href="/" style={{ fontSize: 24, fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '-0.05em' }}>Uber</a>
        <button onClick={() => navigate('/login')} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 50, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Log in</button>
      </nav>

      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 64px)' }}>
        <aside style={{ width: 400, maxWidth: '100%', padding: 24, overflowY: 'auto', borderRight: '1px solid #e2e2e2' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Request a ride now</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px', marginBottom: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid #000', flexShrink: 0 }}></div>
              <input type="text" placeholder="Enter pickup location" value={pickup} onChange={e => setPickup(e.target.value)} style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#000', flexShrink: 0 }}></div>
              <input type="text" placeholder="Enter dropoff location" value={dropoff} onChange={e => setDropoff(e.target.value)} style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
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

          {showResults && (
            <div style={{ marginTop: 20, borderTop: '1px solid #e2e2e2', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>Choose a ride</h3>
                <button onClick={() => setShowResults(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#5e5e5e' }}>&times;</button>
              </div>
              {rides.map((r, i) => (
                <div key={i} onClick={() => setSelectedRide(i)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, cursor: 'pointer', border: selectedRide === i ? '2px solid #000' : '2px solid transparent', background: selectedRide === i ? '#f6f6f6' : 'transparent' }}>
                  <div style={{ flexShrink: 0, width: 56 }}>
                    <svg viewBox="0 0 64 64" width="56" height="36"><rect x="8" y="22" width="48" height="18" rx="5" fill="#000"/><circle cx="18" cy="42" r="5" fill="#333"/><circle cx="46" cy="42" r="5" fill="#333"/><rect x="38" y="16" width="16" height="8" rx="3" fill="#222"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 15, fontWeight: 600 }}>{r.name}</span><span style={{ fontWeight: 600 }}>{r.price}</span></div>
                    <p style={{ fontSize: 12, color: '#5e5e5e' }}>{r.eta}</p>
                    <p style={{ fontSize: 12, color: '#5e5e5e' }}>{r.desc}</p>
                  </div>
                </div>
              ))}
              <button onClick={handleRequest} style={{ width: '100%', height: 48, background: '#000', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 16 }}>Request {rides[selectedRide].name}</button>
            </div>
          )}
        </aside>

        <div style={{ flex: 1, position: 'relative' }}>
          <MapContainer center={[23.2599, 77.4126]} zoom={13} style={{ width: '100%', height: '100%' }} zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {mockCars.map((c, i) => <Marker key={i} position={[c.lat, c.lng]} icon={carIcon} />)}
          </MapContainer>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: toast.show ? 'translateX(-50%)' : 'translateX(-50%) translateY(80px)', background: '#000', color: '#fff', padding: '14px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', zIndex: 999, transition: 'transform 0.4s, opacity 0.4s', opacity: toast.show ? 1 : 0 }}>
        {toast.msg}
      </div>
    </div>
  );
}

export function RidePage() {
  return <Ride />;
}