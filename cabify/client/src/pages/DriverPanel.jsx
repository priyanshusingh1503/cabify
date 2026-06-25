import { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useSocket } from '../hooks/useSocket';

function ClickableMap({ onClick }) {
  useMapEvents({ click: (e) => { onClick && onClick(e.latlng); } });
  return null;
}

const driverMarkerIcon = L.divIcon({
  className: '', html: '<div style="width:20px;height:20px;background:#276ef1;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
  iconSize: [20, 20], iconAnchor: [10, 10],
});

export default function DriverPanel() {
  const { socket, isConnected } = useSocket();
  const [isOnline, setIsOnline] = useState(false);
  const [driverLocation, setDriverLocation] = useState(null);
  const [logs, setLogs] = useState([]);
  const [requests, setRequests] = useState([]);

  const addLog = useCallback((msg) => {
    setLogs(prev => [...prev.slice(-49), `${new Date().toLocaleTimeString()} - ${msg}`]);
  }, []);

  const toggleOnline = () => {
    if (!isConnected) { addLog('Socket not connected. Start backend first.'); return; }
    if (!isOnline) {
      setIsOnline(true);
      const lat = 23.2599 + (Math.random() - 0.5) * 0.02;
      const lng = 77.4126 + (Math.random() - 0.5) * 0.02;
      setDriverLocation({ lat, lng });
      socket.emit('driver:go-online', { lat, lng });
      addLog(`Went ONLINE at (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    } else {
      setIsOnline(false);
      socket.emit('driver:go-offline');
      addLog('Went OFFLINE');
    }
  };

  const handleMapClick = (latlng) => {
    if (!isOnline) return;
    const { lat, lng } = latlng;
    setDriverLocation({ lat, lng });
    socket.emit('driver:update-location', { lat, lng });
    addLog(`Location updated: (${lat.toFixed(4)}, ${lng.toFixed(4)})`);

    // Simulate incoming ride request
    const rideTypes = ['UberGo', 'Premier', 'UberXL'];
    const pickupAreas = ['New Market', 'MP Nagar', 'Ashoka Garden', 'Kolar Road', 'Hoshangabad Road', 'Bawadia Kalan'];
    const dropoffAreas = ['Airport', 'Railway Station', 'BHEL', 'Habibganj', 'DB City', 'People\'s Mall'];
    const req = {
      id: `REQ-${Date.now()}`,
      pickup: pickupAreas[Math.floor(Math.random() * pickupAreas.length)],
      dropoff: dropoffAreas[Math.floor(Math.random() * dropoffAreas.length)],
      type: rideTypes[Math.floor(Math.random() * rideTypes.length)],
      fare: Math.floor(Math.random() * 200 + 80),
      time: new Date().toLocaleTimeString(),
      status: 'pending',
    };
    setRequests(prev => [req, ...prev]);
    addLog(`New ride request: ${req.type} from ${req.pickup} to ${req.dropoff}`);
  };

  const handleAcceptRequest = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
    addLog(`Ride ${id} ACCEPTED!`);
  };

  const handleRejectRequest = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    addLog(`Ride ${id} rejected`);
  };

  const completedRequests = requests.filter(r => r.status === 'accepted' || r.status === 'completed');
  const totalEarnings = completedRequests.reduce((sum, r) => sum + r.fare, 0);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif", height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ height: 64, background: '#fff', borderBottom: '1px solid #e2e2e2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <a href="/" style={{ fontSize: 24, fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '-0.05em' }}>Uber</a>
        <span style={{ fontSize: 15, fontWeight: 600 }}>Driver Panel</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: isConnected ? '#06c167' : '#e11900' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: isConnected ? '#06c167' : '#e11900' }}></span>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left sidebar */}
        <aside style={{ width: 380, padding: 20, overflowY: 'auto', borderRight: '1px solid #e2e2e2', background: '#fafafa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Driver Panel</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: isOnline ? '#06c167' : '#5e5e5e', fontWeight: 500 }}>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
              <div onClick={toggleOnline} style={{ width: 44, height: 26, borderRadius: 13, background: isOnline ? '#06c167' : '#ccc', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: isOnline ? 20 : 2, transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
              </div>
            </div>
          </div>

          {/* Earnings summary */}
          {isOnline && (
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, border: '1px solid #e2e2e2' }}>
              <p style={{ fontSize: 12, color: '#5e5e5e', marginBottom: 4 }}>Today's earnings</p>
              <p style={{ fontSize: 28, fontWeight: 700 }}>₹{totalEarnings}</p>
              <p style={{ fontSize: 12, color: '#5e5e5e' }}>{completedRequests.length} trips completed</p>
            </div>
          )}

          {/* Ride requests */}
          {requests.filter(r => r.status === 'pending').length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>New Ride Requests</h3>
              {requests.filter(r => r.status === 'pending').map(r => (
                <div key={r.id} style={{ background: '#fff', borderRadius: 10, padding: 14, marginBottom: 8, border: '1px solid #e2e2e2' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{r.type}</span>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>₹{r.fare}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#5e5e5e', marginBottom: 2 }}>{r.pickup} → {r.dropoff}</p>
                  <p style={{ fontSize: 11, color: '#5e5e5e', marginBottom: 10 }}>{r.time}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleAcceptRequest(r.id)} style={{ flex: 1, padding: '8px 0', background: '#06c167', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Accept</button>
                    <button onClick={() => handleRejectRequest(r.id)} style={{ flex: 1, padding: '8px 0', background: '#f6f6f6', color: '#000', border: '1px solid #e2e2e2', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Activity log */}
          <div style={{ marginTop: 'auto' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Activity Log</h3>
            <div style={{ background: '#fff', borderRadius: 10, padding: 12, border: '1px solid #e2e2e2', maxHeight: 240, overflowY: 'auto', fontSize: 12, color: '#5e5e5e' }}>
              {logs.length === 0 ? <p style={{ color: '#bbb' }}>No activity yet. Toggle ON to start.</p> : logs.map((log, i) => <p key={i} style={{ marginBottom: 4 }}>{log}</p>)}
            </div>
          </div>
        </aside>

        {/* Map */}
        <div style={{ flex: 1, position: 'relative' }}>
          <MapContainer center={[23.2599, 77.4126]} zoom={13} style={{ width: '100%', height: '100%' }} zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {driverLocation && <Marker position={[driverLocation.lat, driverLocation.lng]} icon={driverMarkerIcon} />}
            <ClickableMap onClick={handleMapClick} />
          </MapContainer>
          {isOnline && (
            <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#fff', borderRadius: 8, padding: '10px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', zIndex: 1000, fontSize: 13, color: '#5e5e5e' }}>
              Tap on the map to update your location
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
