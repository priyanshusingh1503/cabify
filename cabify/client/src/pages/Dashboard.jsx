import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const carIcon = L.divIcon({
  className: '', html: `<div class="car-marker-inner"><svg viewBox="0 0 24 24" width="24" height="24" fill="#000000" style="filter:drop-shadow(0px 2px 4px rgba(0,0,0,0.3))"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.14-.4.52-.68.96-.68h9.54c.44 0 .82.28.96.68L19 11H5z"/></svg></div>`,
  iconSize: [28, 28],
});

const driverIcon = L.divIcon({
  className: '', html: `<div class="driver-marker-icon"></div>`,
  iconSize: [24, 24], iconAnchor: [12, 12],
});

function MapController({ center, zoom, pickupMarker, dropoffMarker, drivers }) {
  const map = useMap();
  const driverMarkers = useRef({});
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  useEffect(() => { if (center) map.setView(center, zoom || 13); }, [center, zoom, map]);

  useEffect(() => {
    drivers.forEach(d => {
      if (driverMarkers.current[d.driverId]) {
        driverMarkers.current[d.driverId].setLatLng([d.lat, d.lng]);
      } else {
        const m = L.marker([d.lat, d.lng], { icon: driverIcon }).addTo(map).bindPopup(`<strong>Driver:</strong> ${d.driverId}`);
        driverMarkers.current[d.driverId] = m;
      }
    });
  }, [drivers, map]);

  useEffect(() => {
    if (pickupRef.current) { map.removeLayer(pickupRef.current); pickupRef.current = null; }
    if (dropoffRef.current) { map.removeLayer(dropoffRef.current); dropoffRef.current = null; }
    if (pickupMarker) {
      pickupRef.current = L.marker(pickupMarker).addTo(map).bindPopup(`<b>Pickup:</b> ${pickupMarker[2] || ''}`);
    }
    if (dropoffMarker) {
      dropoffRef.current = L.marker(dropoffMarker).addTo(map).bindPopup(`<b>Dropoff:</b> ${dropoffMarker[2] || ''}`);
    }
    if (pickupMarker && dropoffMarker) {
      const g = new L.featureGroup([pickupRef.current, dropoffRef.current].filter(Boolean));
      map.fitBounds(g.getBounds().pad(0.2));
    }
  }, [pickupMarker, dropoffMarker, map]);

  return null;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { drivers } = useSocket();
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedRide, setSelectedRide] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [extraStop, setExtraStop] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const mockCars = [
    { lat: 23.2645, lng: 77.4080 },
    { lat: 23.2520, lng: 77.4200 },
    { lat: 23.2710, lng: 77.4150 },
  ];

  const rides = [
    { name: 'UberGo', price: '₹147.71', eta: '3 min away · 12:35 PM arrival', desc: 'Affordable, everyday rides' },
    { name: 'Premier', price: '₹231.24', eta: '5 min away · 12:38 PM arrival', desc: 'Comfortable sedans, top-quality drivers' },
    { name: 'UberXL', price: '₹298.50', eta: '8 min away · 12:40 PM arrival', desc: 'Affordable rides for groups up to 6' },
  ];

  const showToastMsg = (msg) => { setToastMsg(msg); setShowToast(true); setTimeout(() => setShowToast(false), 4000); };

  const handleSearch = () => {
    if (!pickup.trim() || !dropoff.trim()) { showToastMsg('Please enter both pickup and dropoff locations.'); return; }
    setShowResults(true);
  };

  const handleRequestRide = () => {
    showToastMsg(`Requesting ${rides[selectedRide].name}... Your driver will be assigned shortly!`);
    setTimeout(() => {
      showToastMsg('Ride assigned! Driver is 3 mins away.');
      setShowResults(false);
      setPickup(''); setDropoff('');
    }, 3000);
  };

  const pickupCoords = pickup ? [23.2599 + (Math.random() - 0.5) * 0.02, 77.4126 + (Math.random() - 0.5) * 0.02, pickup] : null;
  const dropoffCoords = dropoff ? [23.2599 - (pickupCoords ? pickupCoords[0] - 23.2599 : (Math.random() - 0.5) * 0.02), 77.4126 - (pickupCoords ? pickupCoords[1] - 77.4126 : (Math.random() - 0.5) * 0.02), dropoff] : null;

  const [mapCenter, setMapCenter] = useState([23.2599, 77.4126]);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif", height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav style={{ height: 64, background: '#fff', borderBottom: '1px solid #e2e2e2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'relative', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="/" style={{ fontSize: 24, fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '-0.05em' }}>Uber</a>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', border: 'none', background: 'transparent', fontSize: 14, fontWeight: 500, cursor: 'pointer', borderRadius: 100, position: 'relative' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 20H5V21C5 21.55 4.55 22 4 22H3C2.45 22 2 21.55 2 21V11L4.05 4.13C4.28 3.47 4.9 3 5.61 3H18.39C19.1 3 19.72 3.47 19.95 4.13L22 11V21C22 21.55 21.55 22 21 22H20C19.45 22 19 21.55 19 21V20ZM4.17 11H19.83L18.39 5H5.61L4.17 11ZM5 13V17H19V13H5Z"/></svg>
              <span>Ride</span>
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', border: 'none', background: 'transparent', fontSize: 14, fontWeight: 500, cursor: 'pointer', borderRadius: 100 }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"/></svg>
            <span>Activity</span>
          </button>
          <div style={{ position: 'relative' }} onClick={() => setProfileOpen(!profileOpen)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 8px', borderRadius: 100 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f6f6f6', border: '2px solid #e2e2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5e5e5e' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ color: '#5e5e5e', transform: profileOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }}><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
            </div>
            {profileOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 280, background: '#fff', borderRadius: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.12)', border: '1px solid #e2e2e2', overflow: 'hidden', zIndex: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f6f6f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5e5e5e' }}><svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>
                  <div><p style={{ fontSize: 14, fontWeight: 600 }}>{user?.email?.split('@')[0] || 'User'}</p><p style={{ fontSize: 12, color: '#5e5e5e' }}>{user?.email || 'user@example.com'}</p></div>
                </div>
                <div style={{ height: 1, background: '#e2e2e2' }}></div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 16px', border: 'none', background: 'transparent', fontSize: 14, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  Manage account
                </button>
                <button onClick={() => { logout(); navigate('/login'); }} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 16px', border: 'none', background: 'transparent', fontSize: 14, cursor: 'pointer', color: '#e11900' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Dashboard Layout */}
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        {/* Left Panel */}
        <aside style={{ width: 340, minWidth: 340, height: '100%', background: '#fff', padding: 24, overflowY: 'auto', borderRight: '1px solid #e2e2e2', zIndex: 10 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.02em' }}>Get a ride</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#f6f6f6', borderRadius: 8, marginBottom: 20, fontSize: 13, cursor: 'pointer' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#06c167', flexShrink: 0 }}></span>
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>25% off your next ride. Up to ₹30 per ...</span>
          </div>

          <div style={{ position: 'relative', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px', marginBottom: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid #000', flexShrink: 0 }}></div>
              <input type="text" placeholder="Pickup location" value={pickup} onChange={(e) => setPickup(e.target.value)} style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
            </div>
            <div style={{ width: 2, height: 12, background: '#e2e2e2', marginLeft: 16, marginBottom: 4 }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#000', flexShrink: 0 }}></div>
              <input type="text" placeholder="Dropoff location" value={dropoff} onChange={(e) => setDropoff(e.target.value)} style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
              <button onClick={() => setExtraStop(!extraStop)} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#eef0f2', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            {extraStop && (
              <div style={{ position: 'relative', paddingLeft: 12, marginTop: 4 }}>
                <div style={{ position: 'absolute', left: 16, top: -8, width: 2, height: 8, background: '#e2e2e2' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: '#000', flexShrink: 0 }}></div>
                  <input type="text" placeholder="Add a stop" style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
                  <button onClick={() => setExtraStop(false)} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#eef0f2', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#f6f6f6', borderRadius: 8, marginBottom: 10, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            <span>Pickup now</span>
            <svg style={{ marginLeft: 'auto', color: '#5e5e5e' }} viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', marginBottom: 16, border: '1px solid #e2e2e2', borderRadius: 100, background: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            <span>For me</span>
            <svg style={{ color: '#5e5e5e', marginLeft: 8 }} viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
          </div>
          <button onClick={handleSearch} style={{ width: '100%', height: 48, background: '#000', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Search</button>

          {showResults && (
            <div style={{ marginTop: 20, borderTop: '1px solid #e2e2e2', paddingTop: 16, animation: 'slideUpFade 0.4s forwards' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>Choose a ride</h3>
                <button onClick={() => setShowResults(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#5e5e5e' }}>&times;</button>
              </div>
              {rides.map((r, i) => (
                <div key={i} onClick={() => setSelectedRide(i)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, cursor: 'pointer', border: selectedRide === i ? '2px solid #000' : '2px solid transparent', background: selectedRide === i ? '#f6f6f6' : 'transparent' }}>
                  <div style={{ flexShrink: 0, width: 56, display: 'flex', justifyContent: 'center' }}>
                    <svg viewBox="0 0 64 64" width="56" height="36"><rect x="8" y="22" width="48" height="18" rx="5" fill="#000"/><circle cx="18" cy="42" r="5" fill="#333"/><circle cx="46" cy="42" r="5" fill="#333"/><rect x="38" y="16" width="16" height="8" rx="3" fill="#222"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: 15, fontWeight: 600 }}>{r.name}</span>
                      <span style={{ fontSize: 15, fontWeight: 600 }}>{r.price}</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#5e5e5e', marginTop: 2 }}>{r.eta}</p>
                    <p style={{ fontSize: 12, color: '#5e5e5e', marginTop: 1 }}>{r.desc}</p>
                  </div>
                </div>
              ))}
              <button onClick={handleRequestRide} style={{ width: '100%', height: 48, background: '#000', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 16 }}>Request {rides[selectedRide].name}</button>
            </div>
          )}
        </aside>

        {/* Map */}
        <div style={{ flex: 1, position: 'relative', background: '#e5e3df' }}>
          <MapContainer center={[23.2599, 77.4126]} zoom={13} style={{ width: '100%', height: '100%' }} zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {mockCars.map((c, i) => (
              <Marker key={`mock-${i}`} position={[c.lat, c.lng]} icon={carIcon} />
            ))}
            {drivers.map((d) => (
              <Marker key={d.driverId} position={[d.lat, d.lng]} icon={driverIcon}>
                <Popup>Driver: {d.driverId}</Popup>
              </Marker>
            ))}
            {pickupCoords && <Marker position={[pickupCoords[0], pickupCoords[1]]}><Popup><b>Pickup:</b> {pickup}</Popup></Marker>}
            {dropoffCoords && <Marker position={[dropoffCoords[0], dropoffCoords[1]]}><Popup><b>Dropoff:</b> {dropoff}</Popup></Marker>}
            <MapController center={undefined} zoom={undefined} pickupMarker={pickupCoords} dropoffMarker={dropoffCoords} drivers={drivers} />
          </MapContainer>
        </div>
      </div>

      {/* Toast */}
      <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: showToast ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(80px)', background: '#000', color: '#fff', padding: '14px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', zIndex: 999, transition: 'transform 0.4s, opacity 0.4s', opacity: showToast ? 1 : 0 }}>
        {toastMsg}
      </div>

      <style>{`@keyframes slideUpFade { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
