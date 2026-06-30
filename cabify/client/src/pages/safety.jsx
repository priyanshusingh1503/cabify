import './Safety.css'

export default function Safety() {
  return (
    <div className="safety-page">
      <header className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <a href="#" className="logo">Uber</a>
            <nav className="nav-links">
              <a href="#">Ride</a>
              <a href="#">Drive</a>
              <a href="#">Business</a>
              <a href="#" className="nav-dropdown">About</a>
            </nav>
          </div>
          <div className="nav-right">
            <a href="#" className="nav-lang">EN</a>
            <a href="#">Help</a>
            <a href="#">Log in</a>
            <a href="#" className="btn-signup">Sign up</a>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-text">
            <h1>Our commitment to safety</h1>
            <p>We want you to move freely, make the most of your time, and be connected to the people and places that matter most to you. That's why we are committed to safety, from the creation of new standards to the development of technology with the aim of reducing incidents.</p>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&q=80&w=1000" alt="Riders smiling" />
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="container compact-content">
          <h2>Working together to keep communities safe</h2>
          <p>We have a dedicated public safety team that works closely with law enforcement to support investigations and help keep communities safe. Available 24/7, they provide timely, critical information through our secure portal to assist with active cases when every second counts.</p>
          <a href="#" className="btn-link">Visit the Public Safety Portal</a>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>How safety is built into your experience</h2>
          <div className="features-grid">
            {[
              { title: 'Safety features in the app', desc: 'Share your trip details with loved ones. Track your trip during your ride. Our technology helps put peace of mind at your fingertips.' },
              { title: 'An inclusive community', desc: 'Millions of riders and drivers share a set of Community Guidelines, holding each other accountable to do the right thing.' },
              { title: 'Support at every turn', desc: 'A specially trained team is available 24/7. Reach them in the app, day or night, with any questions or safety concerns.' }
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="journeys-section">
        <div className="container">
          <h2>Building safer journeys for everyone</h2>
          <div className="journeys-grid">
            {[
              { img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800', title: 'Driver safety', desc: "Count on 24/7 support to help with any questions or safety concerns. Share your trip with loved ones. Our focus is on your safety, so you can go where the opportunity is." },
              { img: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=800', title: 'Rider safety', desc: 'Millions of rides are requested every day. Every rider has access to safety features built into the app. And every ride has a support team if you need them.' }
            ].map((j, i) => (
              <div key={i} className="journey-card">
                <div className="card-image"><img src={j.img} alt={j.title} /></div>
                <h3>{j.title}</h3>
                <p>{j.desc}</p>
                <a href="#" className="text-link">Learn more</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="container quote-container">
          <blockquote>"Every day, our technology puts millions of people together in cars in cities around the world. Helping keep people safe is a huge responsibility and one we do not take lightly."</blockquote>
          <cite>Dara Khosrowshahi, Uber CEO</cite>
        </div>
      </section>

      <section className="partner-section">
        <div className="container">
          <h2>Partnering to make a difference</h2>
          <p>Our commitment to safety goes beyond your ride. We have teamed up with leading experts—from public safety officials to anti-violence organizations—to help make roads and cities safer for all.</p>
          <a href="#" className="text-link">Learn more</a>
        </div>
      </section>

      <SafetyFooter />
    </div>
  )
}

function SafetyFooter() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">Uber</div>
          <a href="#" className="footer-help">Visit Help Center</a>
        </div>
        <div className="footer-links-grid">
          {[
            { title: 'Company', links: ['About us', 'Our offerings', 'Newsroom', 'Investors', 'Blog', 'Careers', 'Uber One'] },
            { title: 'Products', links: ['Ride', 'Drive', 'Eat', 'Uber for Business', 'Uber Freight', 'Gift cards'] },
            { title: 'Global citizenship', links: ['Safety', 'Sustainability'] },
            { title: 'Travel', links: ['Reserve', 'Airports', 'Cities'] }
          ].map((col, i) => (
            <div key={i} className="footer-column">
              <h4>{col.title}</h4>
              <ul>{col.links.map((link, j) => <li key={j}><a href="#">{link}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-social-meta">
          <div className="social-icons">
            {[
              'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z',
              'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
              'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
              'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
            ].map((d, i) => (
              <svg key={i} viewBox="0 0 24 24"><path d={d} /></svg>
            ))}
          </div>
          <div className="meta-locations">
            <span>English</span>
            <span className="location-item">Agra</span>
          </div>
        </div>
        <div className="footer-apps">
          <a className="app-badge" href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" /></a>
          <a className="app-badge" href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" /></a>
        </div>
        <div className="footer-legal">
          <span>&copy; 2026 Uber Technologies Inc.</span>
          <div className="legal-links">
            <a href="#">Privacy</a>
            <a href="#">Accessibility</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
} 