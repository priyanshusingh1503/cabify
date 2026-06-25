import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const carIcon = L.divIcon({
  className: '', html: `<div class="w-7 h-7 bg-black rounded-full flex items-center justify-center shadow-lg"><svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.14-.4.52-.68.96-.68h9.54c.44 0 .82.28.96.68L19 11H5z"/></svg></div>`,
  iconSize: [28, 28], iconAnchor: [14, 14],
});

const driverIcon = L.divIcon({
  className: '', html: `<div class="w-6 h-6 bg-blue-500 border-2 border-white rounded-full shadow-lg"></div>`,
  iconSize: [24, 24], iconAnchor: [12, 12],
});

function MapCenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => { if (center) map.setView(center, zoom || 13); }, [center, zoom, map]);
  return null;
}

function MapClickHandler({ onClick }) {
  const map = useMap();
  useEffect(() => {
    if (!onClick) return;
    const h = (e) => onClick(e.latlng);
    map.on('click', h);
    return () => map.off('click', h);
  }, [map, onClick]);
  return null;
}

export default function MapView({ drivers = [], center, zoom = 13, markers = [], onMapClick, className = '' }) {
  return (
    <div className={`w-full h-full min-h-[300px] ${className}`}>
      <MapContainer center={center || [23.2599, 77.4126]} zoom={zoom} className="w-full h-full z-0" zoomControl={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <MapCenter center={center} zoom={zoom} />
        {drivers.map((d) => (
          <Marker key={d.driverId} position={[d.lat, d.lng]} icon={driverIcon}>
            <Popup>Driver: {d.driverId}</Popup>
          </Marker>
        ))}
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]} icon={m.type === 'pickup' ? carIcon : driverIcon}>
            {m.label && <Popup>{m.label}</Popup>}
          </Marker>
        ))}
        <MapClickHandler onClick={onMapClick} />
      </MapContainer>
    </div>
  );
}
