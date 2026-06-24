const activeDrivers = new Map();

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('driver:go-online', (data) => {
      const { driverId, lat, lng } = data;
      if (!driverId || lat == null || lng == null) return;
      activeDrivers.set(driverId, { driverId, lat, lng, socketId: socket.id });
      socket.driverId = driverId;
      console.log(`Driver online: ${driverId}`);
      socket.emit('driver:online-confirmed', { driverId });
      io.emit('driver-locations-initial', Array.from(activeDrivers.values()));
    });

    socket.on('driver:update-location', (data) => {
      const { driverId, lat, lng } = data;
      if (!driverId || lat == null || lng == null) return;
      const existing = activeDrivers.get(driverId);
      if (!existing) return;
      existing.lat = lat; existing.lng = lng;
      io.emit('driver-location-updated', { driverId, lat, lng });
    });

    socket.on('driver:go-offline', () => {
      const driverId = socket.driverId;
      if (!driverId) return;
      activeDrivers.delete(driverId);
      delete socket.driverId;
      io.emit('driver-location-removed', { driverId });
    });

    socket.on('disconnect', () => {
      const driverId = socket.driverId;
      if (driverId) {
        activeDrivers.delete(driverId);
        io.emit('driver-location-removed', { driverId });
      }
    });
  });
};

module.exports = setupSocket;
