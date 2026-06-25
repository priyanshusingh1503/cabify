require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const setupSocket = require('./socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Serve the built React app in production
const distPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(distPath));

app.use('/api', authRoutes);

// SPA fallback
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

setupSocket(io);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    console.log('Starting server without database...');
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} (no DB)`));
  });
