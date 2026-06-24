## Goal
Convert the vanilla HTML/CSS/JS Uber-clone frontend to a React + Vite + Tailwind app with react-leaflet maps, matching the original layout pixel-perfectly.

## Constraints & Preferences
- Separate Vite React app in `client/` folder
- Tailwind CSS for styling (supplemented with custom CSS where needed for exact match)
- react-leaflet for maps (not vanilla Leaflet)
- Vite proxy forwards `/api` and `/socket.io` to backend on port 3000
- MongoDB Atlas for database, manual driver panel via Socket.io
- Backend serves frontend static files in production
- Original Frontend files recreated by user at `cabify/Frontend/` — must match layout exactly

## Progress
### Done
- Backend directory rebuilt from scratch: `server.js`, `config/db.js`, `models/User.js`, `models/Otp.js`, `controllers/authController.js`, `routes/auth.js`, `middleware/rateLimiter.js`, `utils/emailService.js`, `socket/index.js`, `package.json`, `.env`
- Backend npm deps installed (express, mongoose, socket.io, bcryptjs, jsonwebtoken, nodemailer, cors, helmet, morgan, dotenv, express-rate-limit)
- Read all 17+ original Frontend files from `cabify/Frontend/`
- `src/index.css` rewritten with exact original styles
- `src/components/Navbar.jsx` rewritten to match original black navbar with About dropdown
- `src/components/Footer.jsx` rewritten to match original footer columns
- `src/pages/Home.jsx` rewritten with all original sections (Ride request, Explore cards, Account, Reserve, Uber One, Friends ride, Travel cards, Business, FAQ accordion, App section, Terms, Sticky button)
- `src/pages/Login.jsx` rewritten with all original views (email/phone input, OTP 4-digit input, QR scan, success, Google/Apple OAuth modals, error banner, resend timer)
- `src/pages/Dashboard.jsx` rewritten — ride panel + Leaflet map + search/where-to buttons + profile menu + car markers + driver markers + toast notifications
- `src/pages/Ride.jsx` rewritten — split-panel ride booking with live Leaflet map, pickup/dropoff inputs, extra stop, ride type selector
- `src/pages/Explore.jsx` rewritten — sub-nav (Ride/Drive/Courier) + cards grid (12 ride types)
- `src/pages/ChangeCity.jsx` rewritten — modal overlay with search + city list grid
- `src/pages/Courier.jsx` rewritten — send/receive tabs + sidebar form + Leaflet map
- `src/pages/DriverPanel.jsx` rewritten — online/offline toggle + map click to update location + Socket.io driver events + ride request accept/reject + earnings + activity log
- `src/pages/LearnMore.jsx` rewritten — Group Ride hero, how it works steps, popular destinations, why choose cards, FAQ accordion, CTA
- `npm run build` compiles successfully (all pages, 0 errors)
- Both servers running and tested: Backend on port 3000, Vite on port 5173 (Start-Process method to keep them alive across tool calls)

### In Progress
- (none — all pages complete)

### Blocked
- (none)

## Key Decisions
- Use inline styles + a global `index.css` with custom classes instead of pure Tailwind utility classes for complex multi-column layouts from the original — gives pixel control
- Start-Process for launching node servers to keep them alive across separate PowerShell invocations
- Match original `style.css` breakpoints and responsive rules exactly in React

## Next Steps
- User can now test the full site at http://localhost:5173
- Backend auth (login/OTP) available at http://localhost:3000

## Critical Context
- Backend API runs on port 3000, Vite dev server on port 5173
- Mock OTP mode accepts code `1234` when Gmail credentials or MongoDB are not configured
- Socket.io driver events: `driver:go-online`, `driver:update-location`, `driver:go-offline` (panel emits); `driver-locations-initial`, `driver-location-updated`, `driver-location-removed` (clients receive)
- Leaflet map centers on Bhopal, India (23.2599, 77.4126) by default
- Frontend original files available at `cabify/Frontend/` for reference
- Backend and Frontend directories were accidentally deleted earlier but both have now been fully restored

## Relevant Files
- `cabify/Frontend/`: Complete original HTML/CSS/JS source for pixel reference
- `client/vite.config.js`: Tailwind + proxy config
- `client/src/index.css`: Global styles matching original style.css layout
- `client/src/components/Navbar.jsx`: Original navbar with About dropdown
- `client/src/components/Footer.jsx`: Original footer with all columns
- `client/src/pages/Home.jsx`: Full landing page (10+ sections)
- `client/src/pages/Login.jsx`: Multi-view login (email, OTP, QR, success, OAuth modals)
- `client/src/pages/Dashboard.jsx`: Ride panel + Leaflet map + driver markers + profile menu
- `client/src/pages/Ride.jsx`: Split-panel ride booking + Leaflet map
- `client/src/pages/Explore.jsx`: Ride type cards grid
- `client/src/pages/ChangeCity.jsx`: City selector modal overlay
- `client/src/pages/Courier.jsx`: Send/receive package interface + Leaflet map
- `client/src/pages/DriverPanel.jsx`: Driver go online/offline + map click + Socket.io + earnings
- `client/src/pages/LearnMore.jsx`: Group Ride info page with FAQ and destinations
- `client/src/pages/Driver.jsx`: Redirects to `/driver-panel`
- `Backend/`: Express + Socket.io + MongoDB backend (fully recreated)
