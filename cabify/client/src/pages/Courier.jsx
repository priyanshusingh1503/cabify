import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

function SetViewOnClick({ coords }) {
  const map = useMap();
  if (coords) map.setView(coords, 14);
  return null;
}

export default function Courier() {
  const [tab, setTab] = useState('send');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [sendDesc, setSendDesc] = useState('');
  const [receivePickup, setReceivePickup] = useState('');
  const [receiveDropoff, setReceiveDropoff] = useState('');
  const [receiveName, setReceiveName] = useState('');
  const [toast, setToast] = useState({ msg: '', show: false });

  const showToast = (msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast({ msg: '', show: false }), 4000);
  };

  const handleSend = () => {
    if (!pickup || !dropoff || !sendDesc) { showToast('Please fill all fields'); return; }
    showToast('Package pickup requested! A driver is on the way.');
  };

  const handleReceive = () => {
    if (!receivePickup || !receiveDropoff || !receiveName) { showToast('Please fill all fields'); return; }
    showToast('Delivery request sent! We will notify you when someone is delivering.');
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif", height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ height: 64, background: '#fff', borderBottom: '1px solid #e2e2e2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <a href="/" style={{ fontSize: 24, fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '-0.05em' }}>Uber</a>
        <span style={{ fontSize: 15, fontWeight: 600 }}>Courier</span>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <aside style={{ width: 380, padding: 24, overflowY: 'auto', borderRight: '1px solid #e2e2e2' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Send or receive packages</h2>

          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <button onClick={() => setTab('send')} style={{ flex: 1, padding: '12px 0', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', background: tab === 'send' ? '#000' : '#f6f6f6', color: tab === 'send' ? '#fff' : '#000' }}>Send</button>
            <button onClick={() => setTab('receive')} style={{ flex: 1, padding: '12px 0', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', background: tab === 'receive' ? '#000' : '#f6f6f6', color: tab === 'receive' ? '#fff' : '#000' }}>Receive</button>
          </div>

          {tab === 'send' ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px', marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid #000', flexShrink: 0 }}></div>
                <input type="text" placeholder="Pickup location" value={pickup} onChange={e => setPickup(e.target.value)} style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px', marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#000', flexShrink: 0 }}></div>
                <input type="text" placeholder="Dropoff location" value={dropoff} onChange={e => setDropoff(e.target.value)} style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
              </div>
              <textarea placeholder="Describe the package (size, weight, instructions)" value={sendDesc} onChange={e => setSendDesc(e.target.value)} style={{ width: '100%', height: 80, border: '1px solid #e2e2e2', borderRadius: 8, padding: 12, fontSize: 14, outline: 'none', resize: 'none', marginBottom: 16 }}></textarea>
              <button onClick={handleSend} style={{ width: '100%', height: 48, background: '#000', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Request pickup</button>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px', marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid #000', flexShrink: 0 }}></div>
                <input type="text" placeholder="Your location" value={receivePickup} onChange={e => setReceivePickup(e.target.value)} style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px', marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#000', flexShrink: 0 }}></div>
                <input type="text" placeholder="Dropoff location" value={receiveDropoff} onChange={e => setReceiveDropoff(e.target.value)} style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f6f6', borderRadius: 8, padding: '0 12px', marginBottom: 16 }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ flexShrink: 0 }}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                <input type="text" placeholder="Receiver name" value={receiveName} onChange={e => setReceiveName(e.target.value)} style={{ flex: 1, height: 48, border: 'none', background: 'transparent', fontSize: 14, outline: 'none' }} />
              </div>
              <button onClick={handleReceive} style={{ width: '100%', height: 48, background: '#000', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Receive a package</button>
            </>
          )}
        </aside>

        <div style={{ flex: 1, position: 'relative' }}>
          <MapContainer center={[23.2599, 77.4126]} zoom={13} style={{ width: '100%', height: '100%' }} zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          </MapContainer>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: toast.show ? 'translateX(-50%)' : 'translateX(-50%) translateY(80px)', background: '#000', color: '#fff', padding: '14px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', zIndex: 999, transition: 'transform 0.4s, opacity 0.4s', opacity: toast.show ? 1 : 0 }}>
        {toast.msg}
      </div>
    </div>
  );
}
