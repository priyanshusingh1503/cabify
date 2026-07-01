import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Ride from './pages/Ride';
import Explore from './pages/Explore';
import ChangeCity from './pages/ChangeCity';
import Courier from './pages/Courier';
import DriverPanel from './pages/DriverPanel';
import LearnMore from './pages/LearnMore';
import About from './pages/About';
import Offering from './pages/Offering';
import Newsroom from './pages/Newsroom';
import Career from './pages/Career';
import UberOne from './pages/UberOne';
import Drive from './pages/Drive';
import Eats from './pages/Eats';
import Business from './pages/Business';
import Safety from './pages/safety';
import Sustainability from './pages/sustainability';
import AirportRide from './pages/AirportRide';
import Cities from './pages/Cities';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ride" element={<Ride />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/change-city" element={<ChangeCity />} />
          <Route path="/courier" element={<Courier />} />
          <Route path="/driver" element={<DriverPanel />} />
          <Route path="/learn" element={<LearnMore />} />
          <Route path="/about" element={<About />} />
          <Route path="/offerings" element={<Offering />} />
          <Route path="/newsroom" element={<Newsroom />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/uber-one" element={<UberOne />} />
          <Route path="/drive" element={<Drive />} />
          <Route path="/eat" element={<Eats />} />
          <Route path="/business" element={<Business />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/airports" element={<AirportRide />} />
          <Route path="/cities" element={<Cities />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
