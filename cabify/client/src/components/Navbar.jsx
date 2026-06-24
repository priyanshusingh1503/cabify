import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '/ride' || pathname === '/explore' || pathname === '/learn';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (pathname === '/login' || pathname === '/dashboard') return null;

  return (
    <header className="navbar" style={{ background: isHome ? '#000' : '#000', padding: '15px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', width: '100%', top: 0, zIndex: 1000, color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <Link to="/" style={{ fontSize: 28, fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>Uber</Link>
        <ul style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: 25, margin: 0, padding: 0 }}>
          <li><Link to="/ride" style={{ color: 'white', textDecoration: 'none', fontSize: 16 }}>Ride</Link></li>
          <li><Link to="#" style={{ color: 'white', textDecoration: 'none', fontSize: 16 }}>Drive</Link></li>
          <li><Link to="#" style={{ color: 'white', textDecoration: 'none', fontSize: 16 }}>Business</Link></li>
          <li ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{ background: 'none', border: 'none', color: 'white', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              About <span style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>&#9662;</span>
            </button>
            <div className="dropdown-menu" style={{ display: dropdownOpen ? 'block' : 'none', position: 'absolute', top: 35, left: 0, width: 290, background: 'white', borderRadius: 12, padding: '10px 0', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', maxHeight: '80vh', overflowY: 'auto', zIndex: 1000 }}>
              <Link to="/explore" onClick={() => setDropdownOpen(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 25px', color: '#666', fontSize: 18, textDecoration: 'none' }}>Explore <span style={{ fontSize: 25 }}>&#8250;</span></Link>
              {['About us', 'Our offerings', 'How Uber works', 'Sustainability', 'Newsroom', 'Investor relations', 'Autonomous', 'Uber Advertising', 'Blog', 'Careers'].map(l => (
                <Link key={l} to="#" onClick={() => setDropdownOpen(false)} style={{ display: 'block', padding: '18px 25px', color: '#666', fontSize: 18, textDecoration: 'none' }}>{l}</Link>
              ))}
            </div>
          </li>
        </ul>
      </div>
      <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: 16 }}>Log in</Link>
        <Link to="/login" style={{ background: 'white', color: 'black', padding: '8px 18px', borderRadius: 20, textDecoration: 'none', fontWeight: 'bold', fontSize: 14 }}>Sign up</Link>
      </div>
    </header>
  );
}
