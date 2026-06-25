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
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
