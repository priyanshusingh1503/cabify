import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [pickupOpen, setPickupOpen] = useState(false);
  const [pickupText, setPickupText] = useState('Pickup now');
  const [pickupLoc, setPickupLoc] = useState('');
  const [dropoffLoc, setDropoffLoc] = useState('');
  const pickupRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (pickupRef.current && !pickupRef.current.contains(e.target)) setPickupOpen(false); };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  useEffect(() => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const q = item.querySelector('.faq-question');
      q?.addEventListener('click', () => {
        faqItems.forEach(f => { if (f !== item) f.classList.remove('active'); });
        item.classList.toggle('active');
      });
    });
  }, []);

  const handleSeePrices = () => {
    if (!pickupLoc.trim() || !dropoffLoc.trim()) { alert('Please enter pickup and dropoff locations.'); return; }
    const distance = Math.floor(Math.random() * 20) + 1;
    const totalFare = 50 + distance * 12;
    alert(`Ride Details\n\nPickup: ${pickupLoc}\nDropoff: ${dropoffLoc}\nDistance: ${distance} km\nEstimated Fare: ₹${totalFare}`);
  };

  return (
    <div>
      {/* ===== RIDE SECTION ===== */}
      <section className="ride-page" style={{ padding: '80px 100px', background: '#fff' }}>
        <div className="top-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50 }}>
          <h1 style={{ fontSize: 28 }}>Ride</h1>
          <ul style={{ display: 'flex', listStyle: 'none', gap: 35 }}>
            <li><Link to="/ride">Request a ride</Link></li>
            <li><Link to="/login">Reserve a ride</Link></li>
            <li><Link to="/ride">See prices</Link></li>
            <li><Link to="/explore">Explore ride options</Link></li>
            <li><Link to="#">Airport rides</Link></li>
          </ul>
        </div>

        <div className="ride-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 80 }}>
          <div className="ride-content" style={{ width: '45%' }}>
            <div style={{ marginBottom: 20, fontSize: 18 }}>
              <i className="fa-solid fa-location-dot"></i>
              <strong style={{ marginLeft: 5 }}>Agra, IN</strong>
              <Link to="/change-city" style={{ color: 'black', marginLeft: 10 }}>Change city</Link>
            </div>
            <h2 style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 50 }}>Request a ride</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 18 }}>
              <i className="fa-solid fa-tag" style={{ color: 'green' }}></i>
              <span>Up to 50% off your first 5 Uber rides. T&Cs apply.*</span>
            </div>
            <p style={{ marginLeft: 30, marginBottom: 35, fontSize: 14, color: '#666' }}>*Valid within 15 days of signup.</p>

            <div ref={pickupRef} style={{ position: 'relative', width: 300, marginBottom: 20 }}>
              <button onClick={() => setPickupOpen(!pickupOpen)} style={{ width: '100%', height: 56, background: '#eee', border: 'none', borderRadius: 12, padding: '0 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: 18, fontWeight: 500 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className="fa-solid fa-clock"></i>
                  <span>{pickupText}</span>
                </span>
                <i className="fa-solid fa-chevron-down" style={{ transition: '0.3s', transform: pickupOpen ? 'rotate(180deg)' : 'none' }}></i>
              </button>
              <div style={{ position: 'absolute', top: 65, left: 0, width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', opacity: pickupOpen ? 1 : 0, visibility: pickupOpen ? 'visible' : 'hidden', transform: pickupOpen ? 'translateY(0)' : 'translateY(-10px)', transition: '0.25s', zIndex: 1000 }}>
                {['Pickup now', 'Schedule later'].map((item) => (
                  <div key={item} onClick={() => { setPickupText(item); setPickupOpen(false); }} className="pickup-dropdown-item">{item}</div>
                ))}
              </div>
            </div>

            <div style={{ background: '#e9e9e9', display: 'flex', alignItems: 'center', padding: 20, borderRadius: 8, marginBottom: 10 }}>
              <i className="fa-solid fa-circle-dot" style={{ fontSize: 20 }}></i>
              <input type="text" placeholder="Pickup location" value={pickupLoc} onChange={(e) => setPickupLoc(e.target.value)} style={{ flex: 1, border: 'none', background: 'none', outline: 'none', paddingLeft: 15, fontSize: 24 }} />
              <i className="fa-solid fa-location-arrow" style={{ cursor: 'pointer' }} onClick={() => { if (navigator.geolocation) { navigator.geolocation.getCurrentPosition((p) => { setPickupLoc(`Current Location (${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)})`); }, () => alert('Unable to fetch location.')); } else alert('Geolocation not supported.'); }}></i>
            </div>
            <div style={{ width: 2, height: 25, background: 'black', marginLeft: 29 }}></div>
            <div style={{ background: '#e9e9e9', display: 'flex', alignItems: 'center', padding: 20, borderRadius: 8, marginBottom: 10 }}>
              <i className="fa-solid fa-square" style={{ fontSize: 20 }}></i>
              <input type="text" placeholder="Dropoff location" value={dropoffLoc} onChange={(e) => setDropoffLoc(e.target.value)} style={{ flex: 1, border: 'none', background: 'none', outline: 'none', paddingLeft: 15, fontSize: 24 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 35, marginTop: 25 }}>
              <button onClick={handleSeePrices} style={{ width: 190, height: 60, background: 'black', color: 'white', border: 'none', borderRadius: 10, fontSize: 18, fontWeight: 600, cursor: 'pointer' }}>See prices</button>
              <Link to="/login" style={{ color: 'black', textDecoration: 'none', fontSize: 18, borderBottom: '1px solid #cfcfcf', paddingBottom: 3 }}>Log in to see your recent activity</Link>
            </div>
          </div>

          <div className="ride-image" style={{ width: '50%' }}>
            <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xMzRlZmM5Yy1mNjdkLTQ4MWItOGMzZC1kMzQ2MDVjMzA3NzkucG5n" alt="Ride" style={{ width: '100%', borderRadius: 10 }} />
          </div>
        </div>
      </section>

      {/* ===== EXPLORE SECTION ===== */}
      <section style={{ background: '#f6f6f6', padding: '60px 50px' }}>
        <h1 style={{ fontSize: 64, fontWeight: 700, marginBottom: 40 }}>Explore what you can do with Uber</h1>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { title: 'Ride', desc: 'Go anywhere with Uber. Request a ride, hop in, and go.', img: 'https://mobile-content.uber.com/launch-experience/top_bar_rides_3d.png' },
            { title: 'Reserve', desc: 'Reserve your ride in advance so you can relax on the day of your trip.', img: 'https://cn-geo1.uber.com/static/mobile-content/launch-experience/nava-icons-may-2026/light-mode/Calendar-351-temp.png' },
            { title: 'Intercity', desc: 'Get convenient, affordable outstation cabs anytime at your door.', img: 'https://mobile-content.uber.com/launch-experience/intercity.png' },
          ].map(c => (
            <div key={c.title} style={{ background: '#f3f3f3', borderRadius: 15, padding: 24, width: 380, minHeight: 220, position: 'relative' }}>
              <div style={{ width: '60%' }}>
                <h3 style={{ fontSize: 30, marginBottom: 15, fontWeight: 600 }}>{c.title}</h3>
                <p style={{ fontSize: 18, lineHeight: 1.5, color: '#333', marginBottom: 25 }}>{c.desc}</p>
                <Link to="/ride"><button style={{ background: 'white', border: 'none', borderRadius: 30, padding: '12px 24px', fontSize: 17, fontWeight: 600, cursor: 'pointer' }}>Details</button></Link>
              </div>
              <img src={c.img} alt={c.title} style={{ position: 'absolute', right: 20, bottom: 20, width: 150, borderRadius: 10 }} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== ACCOUNT SECTION ===== */}
      <section style={{ background: '#f6f6f6', padding: '80px 90px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 60 }}>
        <div style={{ flex: 1, maxWidth: 500 }}>
          <h1 style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, marginBottom: 30 }}>Log in to see your account details</h1>
          <p style={{ fontSize: 22, lineHeight: 1.6, color: '#222', marginBottom: 40 }}>View past trips, tailored suggestions, support resources, and more.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <Link to="/login" style={{ background: '#000', color: '#fff', textDecoration: 'none', padding: '18px 30px', borderRadius: 12, fontSize: 20, fontWeight: 600 }}>Log in to your account</Link>
            <Link to="/ride" style={{ textDecoration: 'none', color: '#000', fontSize: 20, borderBottom: '1px solid #ccc', paddingBottom: 5 }}>Create an account</Link>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi94fFqyIoIexfozxcB4ex-9S8ZTJd8beeIqwakIFdzQ&s=10" alt="Account" style={{ width: '100%', maxWidth: 700, borderRadius: 15 }} />
        </div>
      </section>

      {/* ===== RESERVE SECTION ===== */}
      <section style={{ padding: 50, background: '#fff' }}>
        <h2 style={{ fontSize: 48, marginBottom: 30 }}>Plan for later</h2>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 2, background: '#b9dbe2', borderRadius: 15, padding: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: 48, marginBottom: 30 }}>Get your ride right<br />with Uber Reserve</h1>
              <h3 style={{ marginBottom: 15, fontSize: 18 }}>Choose date and time</h3>
              <div style={{ display: 'flex', gap: 15 }}>
                <div><label style={{ display: 'block', marginBottom: 5, color: '#555', fontSize: 14 }}>Date</label><div style={{ background: 'white', padding: '12px 15px', borderRadius: 8, minWidth: 150, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><i className="fa-solid fa-calendar"></i> Jun 17</div></div>
                <div><label style={{ display: 'block', marginBottom: 5, color: '#555', fontSize: 14 }}>Time</label><div style={{ background: 'white', padding: '12px 15px', borderRadius: 8, minWidth: 150, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><i className="fa-solid fa-clock"></i> 7:20 PM <i className="fa-solid fa-caret-down"></i></div></div>
              </div>
              <button style={{ marginTop: 20, width: 320, background: 'black', color: 'white', border: 'none', padding: 14, borderRadius: 8, fontSize: 18, cursor: 'pointer' }}>Next</button>
            </div>
          </div>
          <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: 15, padding: 25 }}>
            <h2 style={{ marginBottom: 20 }}>Benefits</h2>
            {[{icon:'fa-solid fa-calendar',text:'Choose your exact pickup time up to 90 days in advance.'},{icon:'fa-solid fa-clock',text:'Extra wait time included to meet your ride.'},{icon:'fa-solid fa-credit-card',text:'Cancel at no charge up to 60 minutes in advance.'}].map((b,i) => (
              <div key={i} style={{ display:'flex', gap:15, padding:'20px 0', borderBottom:'1px solid #eee' }}>
                <i className={b.icon} style={{ fontSize:20, marginTop:5 }}></i>
                <p style={{ fontSize:14 }}>{b.text}</p>
              </div>
            ))}
            <Link to="#" style={{ display:'inline-block', marginTop:20, color:'#555', fontSize:14 }}>See terms</Link>
          </div>
        </div>
      </section>

      {/* ===== UBER ONE ===== */}
      <section style={{ background: '#000', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '60px 120px', minHeight: 380 }}>
        <div style={{ width: '40%' }}>
          <h1 style={{ fontSize: 52, marginBottom: 25, fontWeight: 700 }}>Uber One</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 30, maxWidth: 420 }}>One membership for member pricing and experiences on rides, deliveries, and more.</p>
          <button style={{ background: 'white', color: 'black', border: 'none', padding: '14px 28px', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Try it now</button>
        </div>
        <div style={{ width: '45%', display: 'flex', justifyContent: 'center' }}>
          <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1152/height=768/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9jNjQyNWRmNC0zMTkwLTRmZTEtODY2Ni02YTVhZjJjMGEwNDkucG5n" alt="Uber One" style={{ width: '100%', maxWidth: 550, borderRadius: 10 }} />
        </div>
      </section>

      {/* ===== FRIENDS RIDE ===== */}
      <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 120, padding: '80px 100px', background: '#fff' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1152/height=648/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mNzdhYTM4MC1hMzc4LTQ3YmYtOGI4OC1hYWJhMTU4N2VmZGQucG5n" alt="Group Ride" style={{ width: '100%', maxWidth: 420, borderRadius: 15 }} />
        </div>
        <div style={{ flex: 1, maxWidth: 450 }}>
          <h2 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, marginBottom: 30 }}>Ride with friends<br />seamlessly</h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: '#222', marginBottom: 35 }}>Riding with friends just got easier: set up a group ride in the Uber app, invite your friends, and arrive at your destination. Friends who ride together save together.</p>
          <Link to="/learn" style={{ textDecoration: 'none', color: '#000', fontSize: 18, borderBottom: '1px solid #ccc', paddingBottom: 5 }}>Learn more</Link>
        </div>
      </section>

      {/* ===== TRAVEL SECTION ===== */}
      <section style={{ padding: '70px 80px', background: '#fff' }}>
        <h2 style={{ fontSize: 48, fontWeight: 700, marginBottom: 50 }}>Use the Uber app to help you travel your way</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
          {[
            { title:'Ride options', desc:"There's more than one way to move with Uber, no matter where you are or where you're headed next.", img:'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=768/height=768/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy81NGY2MDE2MS1jZjZiLTQ0MDEtYTMwOS04YmIxOTZjMDAxNGMuanBn' },
            { title:'700+ airports', desc:'You can request a ride to and from most major airports. Schedule a ride to the airport for one less thing to worry about.', img:'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=768/height=768/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mOWJhMjdjNC02NjVjLTRjY2EtODE2MS05ZTNmODdmNDk5OTQucG5n' },
            { title:'15,000+ cities', desc:'The app is available in thousands of cities worldwide, so you can request a ride even when you\'re far from home.', img:'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=768/height=768/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9iOGMzOWRlMC02ZTEzLTQ4NWItYmE0NS02NjUxMTE3MGM2MmEuanBn' },
          ].map(c => (
            <div key={c.title}>
              <img src={c.img} alt={c.title} style={{ width:'100%', height:320, objectFit:'cover', marginBottom:20, borderRadius:10 }} />
              <h3 style={{ fontSize:28, marginBottom:15 }}>{c.title}</h3>
              <p style={{ fontSize:18, lineHeight:1.7, color:'#222', marginBottom:30 }}>{c.desc}</p>
              <button style={{ background:'#000', color:'#fff', border:'none', padding:'14px 28px', borderRadius:8, fontSize:16, fontWeight:600, cursor:'pointer' }}>Search ride options</button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BUSINESS SECTION ===== */}
      <section style={{ background: '#000', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '80px 120px', gap: 80 }}>
        <div style={{ flex: 1, maxWidth: 500 }}>
          <h2 style={{ fontSize: 58, lineHeight: 1.1, marginBottom: 35, fontWeight: 700 }}>Looking for business<br />solutions?</h2>
          <p style={{ fontSize: 20, lineHeight: 1.6, marginBottom: 30 }}>Get information about how companies leverage <Link to="#" style={{ color: '#fff' }}>Uber for Business</Link>:</p>
          <ul style={{ marginLeft: 25, marginBottom: 40 }}>
            {['Business travel','Courtesy rides','Meal programs','Item delivery'].map(l => <li key={l} style={{ marginBottom: 25, fontSize: 22 }}><Link to="#" style={{ color: '#fff' }}>{l}</Link></li>)}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: 25 }}>
            <button style={{ background: '#fff', color: '#000', border: 'none', padding: '15px 28px', borderRadius: 10, fontSize: 18, fontWeight: 600, cursor: 'pointer' }}>Get started</button>
            <Link to="#" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #666', paddingBottom: 4, fontSize: 18 }}>Check out our solutions</Link>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1152/height=648/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9kNjQ4ZjViNi1iYjVmLTQ1MGUtODczMy05MGFlZmVjYmQwOWUuanBn" alt="Uber Business" style={{ width: '100%', maxWidth: 650, borderRadius: 10 }} />
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="faq-section" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: 1150, margin: '0 auto' }}>
          <h2 style={{ fontSize: 52, fontWeight: 700, color: '#222', marginBottom: 50, lineHeight: 1.1 }}>Frequently asked questions</h2>
          {['Can I have a lost item delivered to me?', 'Can I rent a car using Uber?', 'Can I request a ride that picks up friends in different locations?', 'Can I request a taxi on Uber?', 'Is there an Uber ride option for 5 people?'].map((q, i) => (
            <div key={i} className="faq-item" style={{ borderBottom: '1px solid #e5e5e5' }}>
              <button className="faq-question" style={{ width: '100%', border: 'none', background: 'transparent', padding: '24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: 18, fontWeight: 500, color: '#111', textAlign: 'left' }}>
                {q} <span style={{ fontSize: 14, color: '#111', transition: '0.3s' }}>&#9662;</span>
              </button>
              <div className="faq-answer" style={{ maxHeight: 0, overflow: 'hidden', transition: 'max-height 0.4s ease', paddingLeft: 20, paddingRight: 20 }}>
                <p style={{ paddingBottom: 25, fontSize: 16, color: '#555' }}>This feature is available in select cities. Please check the app for availability in your area.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== APP SECTION ===== */}
      <section style={{ padding: '70px 20px' }}>
        <div style={{ maxWidth: 1150, margin: '0 auto' }}>
          <h2 style={{ fontSize: 52, fontWeight: 700, color: '#000', marginBottom: 40 }}>Do more in the app</h2>
          <div style={{ display: 'flex', gap: 35 }}>
            {[
              { title:'Download the Uber app', sub:'Scan to download', img:'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=2304/height=2304/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9hNTk5ODZhZC0wZDlmLTQzOTYtODUzOS0zODliY2U5N2Y1NzkucG5n' },
              { title:'Sign up to ride', sub:null, img:'https://tb-static.uber.com/prod/udam-assets/e24f1914-1e23-4896-ad77-22e88c37c2f9.svg' },
            ].map((c, i) => (
              <div key={i} style={{ flex: 1, background: '#fff', padding: 25, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 28, border: '1px solid #eee', borderRadius: 12 }}>
                <img src={c.img} alt={c.title} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 10 }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: '#000', marginBottom: 8 }}>{c.title}</h3>
                  {c.sub && <p style={{ fontSize: 18, color: '#000' }}>{c.sub}</p>}
                </div>
                <span style={{ fontSize: 38, color: '#000', fontWeight: 300 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TERMS SECTION ===== */}
      <section style={{ background: '#f6f6f6', padding: '60px 20px 40px' }}>
        <div style={{ maxWidth: 1150, margin: '0 auto' }}>
          {[
            '*Join the millions of riders who trust Uber for their everyday travel needs. Get doorstep pickup and dropoff to your chosen destination at the tap of a button. Select from a wide range of affordable options, such as Uber Auto, Uber Moto, and Cabs.',
            'Limited-period offer– Discount on first 5 trips (cab or moto) completed within 15 days of signing up. The offer is valid only for first-time users only. The promotion shall apply automatically to eligible rides. Download the Uber app now to request your first ride.',
            'Discounts applicable - (i) For cab rides- 25% discount (maximum discount of INR 75 per ride) (ii) For moto rides- 50% discount (maximum discount of INR 50 per ride)',
            'This offer cannot be combined with any other offers or promo codes.',
            'The offer is non-transferable and limited to one per user/account.',
            'Uber reserves the right to alter, suspend or withdraw the promotion offer in the future in its sole discretion without any prior notice. Terms and conditions apply.',
          ].map((t, i) => <p key={i} style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, lineHeight: 1.7, color: '#000', marginBottom: 22, maxWidth: 1120 }}>{t}</p>)}
          <p style={{ marginTop: 90, fontSize: 14 }}>Certain requirements and features vary by country, region, and city.</p>
        </div>
      </section>

      {/* ===== STICKY BUTTON ===== */}
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: '#fff', padding: 10, zIndex: 999 }}>
        <Link to="/ride"><button style={{ width: '100%', background: '#000', color: '#fff', border: 'none', height: 52, borderRadius: 6, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>See prices</button></Link>
      </div>
    </div>
  );
}
