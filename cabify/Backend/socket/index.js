const activeDrivers = new Map();
const rideSubscriptions = new Map();

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('user:register', (data) => {
      const { userId } = data;
      if (!userId) return;
      socket.userId = userId;
      socket.join(userId.toString());
      console.log(`User registered: ${userId} (socket: ${socket.id})`);
    });

    socket.on('driver:register', (data) => {
      const { driverId } = data;
      if (!driverId) return;
      activeDrivers.set(driverId, { driverId, socketId: socket.id, lat: 23.2599, lng: 77.4126 });
      socket.driverId = driverId;
      socket.join('drivers');
      console.log(`Driver registered: ${driverId} (socket: ${socket.id})`);
      socket.emit('driver:registered', { driverId });
      io.emit('driver-locations-initial', Array.from(activeDrivers.values()));
    });

    socket.on('driver:go-online', (data) => {
      const driverId = socket.driverId || data.driverId;
      const { lat, lng } = data;
      if (!driverId) return;
      activeDrivers.set(driverId, { driverId, lat, lng, socketId: socket.id });
      socket.driverId = driverId;
      socket.join('drivers');
      socket.emit('driver:online-confirmed', { driverId });
      io.emit('driver-locations-initial', Array.from(activeDrivers.values()));
    });

    socket.on('driver:update-location', (data) => {
      const driverId = socket.driverId || data.driverId;
      const { lat, lng } = data;
      if (!driverId || lat == null || lng == null) return;
      const existing = activeDrivers.get(driverId);
      if (!existing) return;
      existing.lat = lat; existing.lng = lng;
      io.emit('driver-location-updated', { driverId, lat, lng });
      const rideSid = rideSubscriptions.get(driverId);
      if (rideSid) {
        io.to(rideSid).emit('ride:driver-location', { driverId, lat, lng });
      }
    });

    socket.on('driver:accept-ride', async (data) => {
      const { rideId } = data;
      const driverId = socket.driverId || data.driverId;
      if (!rideId || !driverId) {
        console.log('accept-ride failed: rideId=' + rideId + ' driverId=' + driverId + ' socket.driverId=' + socket.driverId);
        socket.emit('driver:ride-error', { message: 'Ride not available.' });
        return;
      }
      try {
        const Ride = require('../models/Ride');
        const Driver = require('../models/Driver');
        const ride = await Ride.findById(rideId);
        if (!ride || (ride.status !== 'assigned' && ride.status !== 'pending')) {
          socket.emit('driver:ride-error', { message: 'Ride not available.' });
          return;
        }
        ride.driverId = driverId;
        ride.status = 'accepted';
        await ride.save();
        await Driver.findByIdAndUpdate(driverId, { status: 'busy' });
        rideSubscriptions.set(driverId, ride.userId.toString());
        socket.emit('driver:ride-accepted', { rideId, status: 'accepted' });
        io.to(ride.userId.toString()).emit('ride:accepted', {
          rideId, driverId,
          driver: { name: data.name, vehicle: data.vehicle, plateNumber: data.plateNumber },
          message: 'Driver accepted the ride!',
        });
        io.to(ride.userId.toString()).emit('ride:status-update', { rideId, status: 'accepted' });
      } catch (err) {
        console.error('accept-ride error:', err);
        socket.emit('driver:ride-error', { message: 'Server error.' });
      }
    });

    socket.on('driver:update-ride-status', async (data) => {
      const { rideId, status } = data;
      const driverId = socket.driverId || data.driverId;
      if (!rideId || !status || !driverId) {
        console.log('update-ride-status failed: rideId=' + rideId + ' status=' + status + ' driverId=' + driverId);
        return;
      }
      try {
        const Ride = require('../models/Ride');
        const ride = await Ride.findById(rideId);
        if (!ride) { socket.emit('driver:ride-error', { message: 'Ride not found.' }); return; }
        ride.status = status;
        await ride.save();
        socket.emit('driver:ride-status-updated', { rideId, status });
        io.to(ride.userId.toString()).emit('ride:status-update', { rideId, status });
        if (status === 'completed') {
          await Driver.findByIdAndUpdate(driverId, { status: 'available' });
          rideSubscriptions.delete(driverId);
        }
      } catch (err) {
        console.error('update-ride-status error:', err);
        socket.emit('driver:ride-error', { message: 'Server error.' });
      }
    });

    socket.on('driver:go-offline', () => {
      const driverId = socket.driverId;
      if (!driverId) return;
      activeDrivers.delete(driverId);
      delete socket.driverId;
      socket.leave('drivers');
      io.emit('driver-location-removed', { driverId });
    });

    socket.on('disconnect', () => {
      const driverId = socket.driverId;
      if (driverId) {
        activeDrivers.delete(driverId);
        rideSubscriptions.delete(driverId);
      }
      io.emit('driver-location-removed', { driverId: driverId || socket.id });
    });
  });
};

setupSocket.getActiveDrivers = () => activeDrivers;
setupSocket.getRideSubscriptions = () => rideSubscriptions;

module.exports = setupSocket;
