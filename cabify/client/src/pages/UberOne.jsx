import './UberOne.css'

export default function UberOne() {
  const benefits = [
    { icon: '🚕', title: 'Ride Credits', desc: 'Get up to 10% Uber One credits on rides.' },
    { icon: '⭐⭐⭐', title: 'Top Rated Drivers', desc: 'Access to top-rated drivers on eligible rides.' },
    { icon: '🎧', title: 'Priority Support', desc: '24x7 customer support for members.' },
    { icon: '🎁', title: 'Uber One Exclusives', desc: 'Exclusive member-only offers and rewards.' }
  ]

  const terms = [
    'Benefits available only for eligible rides marked with Uber One.',
    'Earn up to 10% Uber One credits on eligible rides.',
    'Credits may vary depending on region and service.',
    'Top-rated drivers are assigned based on availability.',
    '24x7 support available for members.',
    'Membership charges are recurring until cancelled.',
    'Savings are estimates and may vary.'
  ]

  return (
    <div className="uberone-page">
      <nav className="navbar">
        <div className="logo">Uber</div>
        <ul className="nav-links">
          <li>Ride</li>
          <li>Drive</li>
          <li>Business</li>
          <li>About</li>
        </ul>
        <div className="right-nav">
          <a href="#">EN</a>
          <a href="#">Help</a>
          <a href="#">Log in</a>
          <button>Sign up</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <h1>Uber One</h1>
          <h2>Become an Uber One member to save on trips, get top-rated drivers and more</h2>
          <p>Sign up for just INR 149/month or INR 1499/year</p>
          <p>Update your app and go to the Account section to join.</p>
        </div>
        <div className="hero-right">
          <div className="hero-img">🪙</div>
        </div>
      </section>

      <section className="download">
        <div className="download-card">
          <div className="qr"></div>
          <div>
            <h2>Download the Uber app</h2>
            <p>Scan to download</p>
          </div>
          <div className="arrow">→</div>
        </div>
      </section>

      <section className="benefits">
        <h2>Uber One benefits</h2>
        <div className="grid">
          {benefits.map((b, i) => (
            <div key={i} className="card">
              <div className="icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="savings">
        <div className="coin">🪙</div>
        <div className="savings-text">
          <h2>Members save an average of INR 210 per month with Uber One</h2>
          <p>Update your app and go to the Account section to join.</p>
        </div>
      </section>

      <section className="terms">
        <ol>
          {terms.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
      </section>

      <footer>
        <div className="footer-grid">
          {[
            { title: 'Company', items: ['About us', 'Our offerings', 'Investors', 'Blog', 'Careers'] },
            { title: 'Products', items: ['Ride', 'Drive', 'Eat', 'Business', 'Freight'] },
            { title: 'Global Citizenship', items: ['Safety', 'Sustainability'] },
            { title: 'Travel', items: ['Reserve', 'Airports', 'Cities'] }
          ].map((col, i) => (
            <div key={i}>
              <h3>{col.title}</h3>
              {col.items.map((item, j) => <p key={j}>{item}</p>)}
            </div>
          ))}
        </div>
        <div className="copy">&copy; 2025 Uber Clone. All Rights Reserved.</div>
      </footer>
    </div>
  )
}
