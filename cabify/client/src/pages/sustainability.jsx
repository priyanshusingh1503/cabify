import './Sustainability.css'

export default function Sustainability() {
  return (
    <div className="sustainability-page">
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
            <a href="#">EN</a>
            <a href="#">Help</a>
            <a href="#">Log in</a>
            <a href="#" className="btn-signup">Sign up</a>
          </div>
        </div>
      </header>

      <div className="sub-navbar">
        <div className="sub-nav-container">
          <div className="sub-nav-title">Sustainability</div>
          <div className="sub-nav-links">
            <a href="#" className="active">Home</a>
            <a href="#">Newsfeed</a>
          </div>
        </div>
      </div>

      <section className="hero-banner">
        <div className="container">
          <div className="hero-content">
            <h1>Your city, our commitment</h1>
            <p>Uber strives to be a zero-emission and low-packaging-waste platform by 2040.</p>
            <a href="#" className="btn-white">Read our commitment</a>
          </div>
        </div>
      </section>

      <section className="main-intro-section">
        <div className="container intro-grid">
          <div className="intro-heading">
            <h2>Millions of trips a day, zero emissions and a shift to more-sustainable packaging</h2>
          </div>
          <div className="intro-text">
            <p>That's our commitment to every person on the planet, and we'll do everything in our power to get there. The path will be electric and shared. It will be with buses, trains, bicycles, and scooters. It will mean helping people move, order meals, and send things using options that are more sustainable. These changes won't come easily, and they will take work and time to achieve. But we have a plan to get there, and we want you to come along for the ride.</p>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <h2>Our structured roadmap milestones</h2>
          <div className="timeline-grid">
            {[
              { year: '2020 — 2023', title: 'Foundation Goals Initiated', items: ['Announced global goal to become a zero-emission mobility platform by 2040.', 'Expanded target matrix to include zero-emission delivery trips and more-sustainable packaging options.', 'Achieved a verified 100% renewable energy match across corporate US offices.'] },
              { year: 'Target: By the end of 2025', title: 'Regional Electrification & Packaging', items: ['100% of standard customer rides in London and Amsterdam transition to zero-emission configurations.', '50% of all platform mobility kilometers across 7 European capitals scale entirely within EVs.', '80% of Uber Eats orders across European and APAC cities shift from single-use plastics to sustainable options.'] },
              { year: 'Target: By the end of 2030', title: '100% Continental Transition', items: ['100% of passenger rides across Canada, Europe, and the U.S. transition entirely to zero-emission vehicles.', '100% of active courier deliveries across 7 European capitals shift to zero-emission methods.', '100% of global Uber Eats restaurant merchants transition to reusable, recyclable, or compostable packaging layouts.'] },
              { year: 'Target: By the end of 2040', title: 'Global Net-Zero Operations', items: ['100% of platform rides and delivery assignments globally complete inside zero-emission vehicles, micromobility configurations, or synchronized public transit systems.'] }
            ].map((t, i) => (
              <div key={i} className="timeline-card">
                <div className="timeline-year">{t.year}</div>
                <h3>{t.title}</h3>
                <ul>{t.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pillars-section">
        <div className="container">
          <h2>Pioneering cleaner urban logistics</h2>
          <div className="pillars-grid">
            {[
              { title: 'Offering more ways to ride green', desc: 'Providing sustainable, shared alternatives to personal vehicle ownership via integrated options like Comfort Electric, Electric rides, public transit partnerships, and dockless Lime bikes/scooters.' },
              { title: 'Helping drivers and couriers go electric', desc: 'Driving standard platform infrastructure forward via our $800 million Green Future program resources, helping hundreds of thousands transition to battery EVs by 2025.' },
              { title: 'Helping merchants access sustainable packaging', desc: "Eliminating unnecessary plastic waste from Uber Eats orders entirely by 2030 through strategic capital incentives, commercial packaging discounts, and operational advocacy." },
              { title: 'Partnering to accelerate charging infrastructure', desc: 'Teaming up with vehicle manufacturers, grid network providers, and environmental NGOs to scale affordable vehicle access and expand green energy initiatives globally.' }
            ].map((p, i) => (
              <div key={i} className="pillar-card">
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
                <a href="#" className="text-link">Learn more</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SustainabilityFooter />
    </div>
  )
}

function SustainabilityFooter() {
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
          <div className="meta-locations">
            <span>English</span>
            <span>Agra</span>
          </div>
          
        </div>
        <div className="footer-apps">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
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