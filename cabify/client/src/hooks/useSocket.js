import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

export function useSocket() {
  const [drivers, setDrivers] = useState([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io('/', { transports: ['websocket', 'polling'] });
    socketRef.current = socket;
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('driver-locations-initial', (locations) => setDrivers(locations));
    socket.on('driver-location-updated', (location) => {
      setDrivers((prev) => {
        const idx = prev.findIndex((d) => d.driverId === location.driverId);
        if (idx >= 0) { const n = [...prev]; n[idx] = location; return n; }
        return [...prev, location];
      });
    });
    socket.on('driver-location-removed', ({ driverId }) => {
      setDrivers((prev) => prev.filter((d) => d.driverId !== driverId));
    });
    return () => socket.close();
  }, []);

  const emit = (event, data) => socketRef.current?.emit(event, data);
  return { drivers, connected, emit, socket: socketRef.current };
}
