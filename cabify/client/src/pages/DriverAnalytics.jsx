import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
import { useSocket } from '../hooks/useSocket';
import { getDriverAnalytics, getDriverProfile } from '../services/api';

const statusColors = {
  completed: '#06c167',
  cancelled: '#e11900',
  'in-progress': '#276ef1',
  assigned: '#f5a623',
  pending: '#999',
  arrived: '#a855f7',
};

const typeColors = {
  UberGo: '#276ef1',
  Premier: '#a855f7',
  UberXL: '#f5a623',
};

export default function DriverAnalytics() {
  const navigate = useNavigate();
  const { onRideAccepted, onRideStatusUpdate, connected } = useSocket();
  const [analytics, setAnalytics] = useState(null);
  const [driverInfo, setDriverInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const aboutRef = useRef(null);
  const profileRef = useRef(null);
  const { location: geoLocation } = useGeolocation();
  const refreshTimer = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) setAboutOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  const load = useCallback(() => {
    const token = localStorage.getItem('driverToken');
    if (!token) return;
    Promise.all([getDriverAnalytics(), getDriverProfile()])
      .then(([analyticsRes, profileRes]) => {
        if (analyticsRes.success) setAnalytics(analyticsRes.analytics);
        if (profileRes.success) setDriverInfo(profileRes.driver);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const debouncedRefresh = useCallback(() => {
    clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(load, 500);
  }, [load]);

  useEffect(() => {
    const token = localStorage.getItem('driverToken');
    if (!token) { navigate('/login'); return; }
    load();
  }, [navigate, load]);

  useEffect(() => {
    onRideAccepted(() => debouncedRefresh());
    onRideStatusUpdate(() => debouncedRefresh());
  }, [onRideAccepted, onRideStatusUpdate, debouncedRefresh]);

  useEffect(() => {
    const handler = () => { if (document.visibilityState === 'visible') load(); };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [load]);

  useEffect(() => { if (connected) load(); }, [connected, load]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #e2e2e2', borderTop: '3px solid #000', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
        <p style={{ color: '#5e5e5e', fontSize: 14 }}>Loading dashboard...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const stats = analytics?.totalStats || { totalRides: 0, completedRides: 0, totalRevenue: 0, avgDistance: 0, avgDuration: 0, completionRate: 0 };
  const dailyRides = analytics?.dailyRides || [];
  const typeBreakdown = analytics?.rideTypeBreakdown || {};
  const statusBreakdown = analytics?.statusBreakdown || {};
  const pickupLocations = analytics?.pickupLocations || [];
  const dropoffLocations = analytics?.dropoffLocations || [];
  const recentRides = analytics?.recentRides || [];

  const maxDaily = Math.max(...dailyRides.map(d => d.count), 1);
  const totalTypeRides = Object.values(typeBreakdown).reduce((a, b) => a + b, 0) || 1;
  const totalStatusRides = Object.values(statusBreakdown).reduce((a, b) => a + b, 0) || 1;

  const allLocations = [
    ...pickupLocations.map(l => ({ ...l, type: 'pickup' })),
    ...dropoffLocations.map(l => ({ ...l, type: 'dropoff' })),
  ];
  const mapCenter = allLocations.length > 0
    ? [allLocations.reduce((s, l) => s + l.lat, 0) / allLocations.length, allLocations.reduce((s, l) => s + l.lng, 0) / allLocations.length]
    : [geoLocation.lat, geoLocation.lng];
  const maxCount = Math.max(...allLocations.map(l => l.count), 1);

  const driverName = driverInfo?.name || 'Driver';

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: '#fff' }}>

      {/* Inline Navbar - Uber.com style */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '0 clamp(16px, 4vw, 40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', top: 0, width: '100%', height: 64, zIndex: 1000, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link to="/" style={{ fontSize: 28, fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '-1px' }}>Uber</Link>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="desktop-nav-links">
            <Link to="/driver" style={{ color: '#000', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Panel</Link>
            <Link to="/driver/analytics" style={{ color: '#000', textDecoration: 'none', fontSize: 15, fontWeight: 700, borderBottom: '2px solid #000', paddingBottom: 2 }}>Dashboard</Link>
            <Link to="/drive-page" style={{ color: '#000', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Drive</Link>
            <div ref={aboutRef} style={{ position: 'relative' }}>
              <button onClick={() => setAboutOpen(!aboutOpen)} style={{ background: 'none', border: 'none', color: '#000', fontSize: 15, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
                About
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#000" style={{ transform: aboutOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }}><path d="M7 10l5 5 5-5z"/></svg>
              </button>
              {aboutOpen && (
                <div style={{ position: 'absolute', top: 36, left: 0, background: '#fff', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: '8px 0', minWidth: 220, zIndex: 1001 }}>
                  <Link to="/explore" onClick={() => setAboutOpen(false)} style={{ display: 'block', padding: '12px 20px', color: '#333', textDecoration: 'none', fontSize: 15 }}>Explore</Link>
                  <Link to="/cities" onClick={() => setAboutOpen(false)} style={{ display: 'block', padding: '12px 20px', color: '#333', textDecoration: 'none', fontSize: 15 }}>Our offerings</Link>
                  <Link to="/terms" onClick={() => setAboutOpen(false)} style={{ display: 'block', padding: '12px 20px', color: '#333', textDecoration: 'none', fontSize: 15 }}>Sustainability</Link>
                  <Link to="/freight" onClick={() => setAboutOpen(false)} style={{ display: 'block', padding: '12px 20px', color: '#333', textDecoration: 'none', fontSize: 15 }}>Blog</Link>
                  <Link to="/drive-page" onClick={() => setAboutOpen(false)} style={{ display: 'block', padding: '12px 20px', color: '#333', textDecoration: 'none', fontSize: 15 }}>Careers</Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} className="desktop-nav-right">
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#000"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#000' }}>EN</span>
          </button>
          <Link to="#" style={{ color: '#000', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Help</Link>
          <div ref={profileRef} style={{ position: 'relative' }}>
            <button onClick={() => setProfileOpen(!profileOpen)} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 20, padding: '8px 16px', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              {driverName}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff" style={{ transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }}><path d="M7 10l5 5 5-5z"/></svg>
            </button>
            {profileOpen && (
              <div style={{ position: 'absolute', top: 40, right: 0, background: '#fff', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: '8px 0', minWidth: 200, zIndex: 1001 }}>
                <Link to="/driver" onClick={() => setProfileOpen(false)} style={{ display: 'block', padding: '12px 20px', color: '#333', textDecoration: 'none', fontSize: 15 }}>Driver Panel</Link>
                <Link to="/driver/analytics" onClick={() => setProfileOpen(false)} style={{ display: 'block', padding: '12px 20px', color: '#333', textDecoration: 'none', fontSize: 15 }}>Dashboard</Link>
                <div style={{ borderTop: '1px solid #e5e5e5', margin: '4px 0' }}></div>
                <Link to="/login" onClick={() => setProfileOpen(false)} style={{ display: 'block', padding: '12px 20px', color: '#333', textDecoration: 'none', fontSize: 15 }}>Log out</Link>
              </div>
            )}
          </div>
        </div>
        <button className="hamburger-btn" onClick={() => setMobileMenuOpen(true)} style={{ display: 'none' }}>
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* Mobile nav overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileMenuOpen(false)}>&times;</button>
        <Link to="/driver" onClick={() => setMobileMenuOpen(false)}>Driver Panel</Link>
        <Link to="/driver/analytics" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
        <Link to="/drive-page" onClick={() => setMobileMenuOpen(false)}>Drive</Link>
        <div style={{ borderTop: '1px solid #e5e5e5', margin: '8px 0' }}></div>
        <Link to="/explore" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
        <Link to="/cities" onClick={() => setMobileMenuOpen(false)}>Our offerings</Link>
        <Link to="/terms" onClick={() => setMobileMenuOpen(false)}>Sustainability</Link>
        <div style={{ borderTop: '1px solid #e5e5e5', margin: '8px 0' }}></div>
        <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Log out</Link>
      </div>

      {/* Hero */}
      <section style={{ background: '#000', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)', opacity: 0.7 }} />
        <div className="hero-flex" style={{ position: 'relative', maxWidth: 1200, margin: 'auto', display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 420px' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.1 }}>
              Welcome back, {driverName}
            </h1>
            <p style={{ fontSize: 17, color: '#a3a3a3', marginBottom: 28 }}>
              Track your performance, earnings, and ride activity all in one place.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
                Refresh
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: connected ? '#06c167' : '#e11900' }}></div>
                <span style={{ fontSize: 11, color: connected ? '#06c167' : '#e11900' }}>{connected ? 'Live' : 'Offline'}</span>
              </div>
            </div>

            {/* Stats Cards in Hero */}
            <div className="analytics-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, maxWidth: 460 }}>
              {[
                { label: 'Total Rides', value: stats.totalRides, icon: '🚗' },
                { label: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: '💰' },
                { label: 'Avg Distance', value: `${stats.avgDistance} km`, icon: '📏' },
                { label: 'Completion', value: `${stats.completionRate}%`, icon: '✅' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                  <div>
                    <p style={{ fontSize: 22, fontWeight: 700, color: '#000' }}>{s.value}</p>
                    <p style={{ fontSize: 12, color: '#5e5e5e' }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right" style={{ flex: '1 1 350px', textAlign: 'center' }}>
            <div style={{ width: 200, height: 200, margin: '0 auto', borderRadius: '50%', background: 'linear-gradient(135deg, #276ef1, #1a5ad4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(39,110,241,0.3)' }}>
              <svg viewBox="0 0 24 24" width="80" height="80" fill="#fff"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.14-.4.52-.68.96-.68h9.54c.44 0 .82.28.96.68L19 11H5z"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Rides Chart + Type + Status */}
      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: 'auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, color: '#000', marginBottom: 32, textAlign: 'center' }}>
            Your Ride Activity
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 0 }} className="analytics-chart-grid">
            <div style={{ background: '#f6f6f6', borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Daily Rides (Last 30 Days)</h3>
              {dailyRides.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="#ccc" style={{ marginBottom: 12 }}><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.14-.4.52-.68.96-.68h9.54c.44 0 .82.28.96.68L19 11H5z"/></svg>
                  <p style={{ color: '#999', fontSize: 14 }}>No ride data in the last 30 days</p>
                  <Link to="/driver" style={{ color: '#276ef1', fontSize: 14, textDecoration: 'none', fontWeight: 500, marginTop: 8, display: 'inline-block' }}>Go to Driver Panel →</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 180, overflowX: 'auto', paddingBottom: 24 }}>
                  {dailyRides.map((d, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 24, flex: 1 }}>
                      <span style={{ fontSize: 11, color: '#5e5e5e', marginBottom: 4, fontWeight: 600 }}>{d.count}</span>
                      <div style={{ width: '100%', maxWidth: 32, height: `${(d.count / maxDaily) * 130}px`, background: 'linear-gradient(180deg, #276ef1, #1a5ad4)', borderRadius: '6px 6px 0 0', transition: 'height 0.3s' }}></div>
                      <span style={{ fontSize: 10, color: '#999', marginTop: 6, transform: 'rotate(-45deg)', whiteSpace: 'nowrap' }}>{d.date.slice(5)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: '#f6f6f6', borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Ride Type Breakdown</h3>
                <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 16px' }}>
                  <svg viewBox="0 0 36 36" style={{ width: 120, height: 120, transform: 'rotate(-90deg)' }}>
                    {Object.entries(typeBreakdown).reduce((acc, [type, count]) => {
                      const pct = (count / totalTypeRides) * 100;
                      acc.elements.push(
                        <circle key={type} cx="18" cy="18" r="15.9155" fill="none" stroke={typeColors[type] || '#ccc'} strokeWidth="3.5" strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={-acc.offset} />
                      );
                      acc.offset += pct;
                      return acc;
                    }, { elements: [], offset: 0 }).elements}
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <p style={{ fontSize: 22, fontWeight: 700 }}>{totalTypeRides}</p>
                    <p style={{ fontSize: 11, color: '#999' }}>total</p>
                  </div>
                </div>
                {Object.keys(typeBreakdown).length === 0 ? (
                  <p style={{ color: '#999', fontSize: 13, textAlign: 'center' }}>No data yet</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {Object.entries(typeBreakdown).map(([type, count]) => (
                      <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: typeColors[type] || '#ccc' }}></div>
                        <span style={{ fontSize: 13, flex: 1 }}>{type}</span>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ background: '#f6f6f6', borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Status Breakdown</h3>
                {Object.keys(statusBreakdown).length === 0 ? (
                  <p style={{ color: '#999', fontSize: 13, textAlign: 'center' }}>No data yet</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {Object.entries(statusBreakdown).map(([status, count]) => (
                      <div key={status}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 13, textTransform: 'capitalize' }}>{status}</span>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{count} ({Math.round((count / totalStatusRides) * 100)}%)</span>
                        </div>
                        <div style={{ height: 6, background: '#e2e2e2', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(count / totalStatusRides) * 100}%`, background: statusColors[status] || '#999', borderRadius: 3, transition: 'width 0.3s' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Heatmap */}
      <section style={{ padding: '60px 24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: 1200, margin: 'auto', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, color: '#000', marginBottom: 16 }}>
              Ride Locations Heatmap
            </h2>
            <p style={{ color: '#525252', fontSize: 18, marginBottom: 24 }}>
              See where your most frequent pickups and dropoffs are across the city.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#276ef1', opacity: 0.7 }}></div>
                <span style={{ fontSize: 15 }}>Pickup locations ({pickupLocations.length} hotspots)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#06c167', opacity: 0.7 }}></div>
                <span style={{ fontSize: 15 }}>Dropoff locations ({dropoffLocations.length} hotspots)</span>
              </div>
            </div>
            <Link to="/driver" style={{ background: '#000', color: '#fff', padding: '14px 28px', borderRadius: 8, fontWeight: 600, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
              Go to Driver Panel
            </Link>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            {allLocations.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: 16, padding: 60, textAlign: 'center' }}>
                <svg viewBox="0 0 24 24" width="48" height="48" fill="#ccc" style={{ marginBottom: 12 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <p style={{ color: '#999', fontSize: 14 }}>Complete some rides to see location data</p>
              </div>
            ) : (
              <MapContainer center={mapCenter} zoom={12} style={{ width: '100%', height: 400, borderRadius: 16 }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                {pickupLocations.map((l, i) => (
                  <CircleMarker key={`p${i}`} center={[l.lat, l.lng]} radius={4 + (l.count / maxCount) * 16} pathOptions={{ color: '#1a5ad4', fillColor: '#276ef1', fillOpacity: 0.5 + (l.count / maxCount) * 0.3, weight: 1 }}>
                    <Tooltip>Pickup: {l.count} rides</Tooltip>
                  </CircleMarker>
                ))}
                {dropoffLocations.map((l, i) => (
                  <CircleMarker key={`d${i}`} center={[l.lat, l.lng]} radius={4 + (l.count / maxCount) * 16} pathOptions={{ color: '#059669', fillColor: '#06c167', fillOpacity: 0.5 + (l.count / maxCount) * 0.3, weight: 1 }}>
                    <Tooltip>Dropoff: {l.count} rides</Tooltip>
                  </CircleMarker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>
      </section>

      {/* Recent Rides */}
      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: 'auto', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 100%' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, color: '#000', marginBottom: 16, textAlign: 'center' }}>
              Recent Rides
            </h2>
            {recentRides.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60 }}>
                <svg viewBox="0 0 24 24" width="48" height="48" fill="#ccc" style={{ marginBottom: 12 }}><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.14-.4.52-.68.96-.68h9.54c.44 0 .82.28.96.68L19 11H5z"/></svg>
                <p style={{ color: '#999', fontSize: 14 }}>No rides yet. Start driving to see your history here.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto', background: '#f6f6f6', borderRadius: 16 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e2e2' }}>
                      <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: 600, color: '#5e5e5e' }}>Date</th>
                      <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: 600, color: '#5e5e5e' }}>Route</th>
                      <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: 600, color: '#5e5e5e' }}>Type</th>
                      <th style={{ textAlign: 'right', padding: '14px 16px', fontWeight: 600, color: '#5e5e5e' }}>Distance</th>
                      <th style={{ textAlign: 'right', padding: '14px 16px', fontWeight: 600, color: '#5e5e5e' }}>Price</th>
                      <th style={{ textAlign: 'center', padding: '14px 16px', fontWeight: 600, color: '#5e5e5e' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRides.map((ride, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e8e8e8' }}>
                        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>{new Date(ride.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                        <td style={{ padding: '14px 16px', maxWidth: 300 }}>
                          <span style={{ color: '#333' }}>{ride.pickup?.address || 'N/A'}</span>
                          <span style={{ color: '#999' }}> → </span>
                          <span style={{ color: '#333' }}>{ride.dropoff?.address || 'N/A'}</span>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: 6, background: (typeColors[ride.rideType] || '#999') + '18', color: typeColors[ride.rideType] || '#999', fontWeight: 600, fontSize: 13 }}>{ride.rideType}</span>
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>{ride.distance} km</td>
                        <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 700 }}>₹{ride.price}</td>
                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                          <span style={{ padding: '4px 12px', borderRadius: 20, background: (statusColors[ride.status] || '#999') + '18', color: statusColors[ride.status] || '#999', fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>{ride.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Earnings CTA */}
      <section style={{ padding: '60px 24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: 1200, margin: 'auto', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, color: '#000', marginBottom: 16 }}>
              Start earning with Uber today
            </h2>
            <p style={{ color: '#525252', fontSize: 18, marginBottom: 28 }}>
              Drive on your schedule. Accept rides, track your earnings, and build your career as an Uber driver.
            </p>
            <Link to="/driver" style={{ background: '#000', color: '#fff', padding: '14px 28px', borderRadius: 8, fontWeight: 600, fontSize: 16, textDecoration: 'none', display: 'inline-block', marginRight: 12, marginBottom: 12 }}>
              Go to Driver Panel
            </Link>
            <Link to="/drive-page" style={{ color: '#000', fontSize: 16, textDecoration: 'underline', fontWeight: 500 }}>
              Learn more about driving
            </Link>
          </div>
          <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
            <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NjRkZDNkMS05NGU3LTQ4MWUtYjI4Yy0wOGQ1OTM1M2I5ZTAucG5n" alt="Drive" style={{ maxWidth: '100%', maxHeight: 280, objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      {/* Apps */}
      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: 'auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, color: '#000', marginBottom: 40 }}>
            It's easier in the apps
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            <a href="https://rides.sng.link/Aw5zn/o42y?_dl=uber%3A%2F%2F" target="_blank" rel="noopener noreferrer"
              style={{ background: '#000', color: '#fff', padding: '18px 32px', borderRadius: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600, fontSize: 16 }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Download the Uber app
            </a>
            <a href="https://earn.sng.link/A3ir4p/mf0l?_dl=uberdriver%3A%2F%2F" target="_blank" rel="noopener noreferrer"
              style={{ background: '#000', color: '#fff', padding: '18px 32px', borderRadius: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600, fontSize: 16 }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.14-.4.52-.68.96-.68h9.54c.44 0 .82.28.96.68L19 11H5z"/></svg>
              Download the Driver app
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
