import { Link } from 'react-router-dom'
import './Offering.css'

export default function Offering() {
  const services = [
    { img: 'https://images.pexels.com/photos/4606346/pexels-photo-4606346.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Ride options', desc: 'Access to rides on demand.', link: 'Learn more' },
    { img: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Uber Eats', desc: 'Food delivery on demand.', link: 'Learn more' },
    { img: 'https://images.pexels.com/photos/4316422/pexels-photo-4316422.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Earning with Uber', desc: 'Opportunity is everywhere.', link: 'Drive or deliver with Uber' },
    { img: 'https://images.pexels.com/photos/9062331/pexels-photo-9062331.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Moving cities forward', desc: 'Helping to improve public transportation and access to care for those in need.', link: 'Learn more' },
    { img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Helping businesses move ahead', desc: 'See how Uber Freight and Uber for Business help organizations across the world.', link: 'Learn more' },
    { img: 'https://images.pexels.com/photos/6169658/pexels-photo-6169658.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Same-day delivery', desc: 'An easy delivery solution that allows people to send items the same day.', link: 'Learn more' }
  ]

  const rideCards = [
    { title: 'UberX', desc: 'Affordable rides, all to yourself' },
    { title: 'UberX Share', desc: 'Share the ride with up to one co-rider at a time' },
    { title: 'Uber Comfort', desc: 'Newer cars with extra legroom' }
  ]

  return (
    <div className="offering-page" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <header className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/" className="logo">Uber</Link>
          </div>
          <div className="nav-right">
            <a href="#" className="nav-link">Log in</a>
            <a href="#" className="btn-signup">Sign up</a>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <h1>Uber's technology offerings</h1>
          <p>Changing how people can request rides and get from point A to point B is just the beginning.</p>
          <a href="#" className="btn-dark">Explore the app</a>
        </div>
      </section>

      <section className="intro-section">
        <div className="container">
          <h2>Uber apps, products, and other offerings</h2>
          <p>Uber is a technology company whose mission is to reimagine the way the world moves for the better. Our technology helps us develop and maintain multisided platforms that match consumers looking for rides and independent providers of ride services, as well as with other forms of transportation, including public transit, bikes, and scooters.</p>
          <p>We also connect consumers and restaurants, grocers, and other merchants so they can buy and sell meals, groceries, and other items, then we match them with independent delivery service providers. Plus, Uber connects shippers and carriers in the freight industry.</p>
          <p>Our technology helps people connect and move in over 70 countries and 15,000+ cities around the world.</p>
        </div>
      </section>

      <section className="services-grid">
        <div className="container grid-layout">
          {services.map((s, i) => (
            <div key={i} className="card">
              <img src={s.img} alt={s.title} />
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href="#" className="card-link">{s.link}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="ride-options-section">
        <div className="container">
          <div className="ride-options-header">
            <div>
              <h2>Uber's most popular ride options</h2>
              <p>Request a ride, hop in, and go.</p>
            </div>
            <div className="ride-actions">
              <a href="#" className="btn-dark">Download the app</a>
              <a href="#" className="btn-light">See more ride options</a>
            </div>
          </div>
          <div className="ride-scroller">
            {rideCards.map((rc, i) => (
              <div key={i} className="ride-card">
                <h4>{rc.title}</h4>
                <p>{rc.desc}</p>
                <a href="#" className="card-link">Learn more</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-grid">
        <div className="container grid-layout">
          {[
            { img: 'https://images.pexels.com/photos/5450654/pexels-photo-5450654.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Safety', desc: 'Peace of mind is designed into your experience.', link: 'Learn more about safety' },
            { img: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Cities', desc: 'Available in 15,000+ cities.', link: 'Find a city' },
            { img: 'https://images.pexels.com/photos/2083556/pexels-photo-2083556.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Airports', desc: 'Access to rides at 700+ airports.', link: 'See all airports' }
          ].map((s, i) => (
            <div key={i} className="card">
              <img src={s.img} alt={s.title} />
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href="#" className="card-link">{s.link}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div className="container">
          <h2>Food delivery on demand</h2>
          <div className="split-grid">
            {[
              { img: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Uber Eats', desc: "Order from your favorite restaurants and grocery stores, online or with the Uber app. The merchant will prepare your order, and a nearby delivery person will deliver it to your door.", link: 'Visit Uber Eats' },
              { img: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Restaurants', desc: "Uber Eats makes a real impact on your restaurant business. When your food is featured in the app, new customers can discover it and loyal customers can enjoy it more often.", link: 'Partner with Uber Eats' }
            ].map((col, i) => (
              <div key={i} className="split-column">
                <img src={col.img} alt={col.title} />
                <h3>{col.title}</h3>
                <p>{col.desc}</p>
                <a href="#" className="split-link">{col.link}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="split-section">
        <div className="container">
          <h2>Earn money with Uber</h2>
          <div className="split-grid">
            {[
              { img: 'https://images.pexels.com/photos/4606338/pexels-photo-4606338.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Drive with Uber', desc: 'Make the most of your time on the road on the platform with the largest network of active riders.', link: 'Sign up to drive' },
              { img: 'https://images.pexels.com/photos/6249451/pexels-photo-6249451.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Deliver with Uber', desc: "Make money by delivering food orders that people crave, and other items using the Uber Eats app—all while exploring your city.", link: 'Sign up to deliver' }
            ].map((col, i) => (
              <div key={i} className="split-column">
                <img src={col.img} alt={col.title} />
                <h3>{col.title}</h3>
                <p>{col.desc}</p>
                <a href="#" className="split-link">{col.link}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="split-section">
        <div className="container">
          <h2>Helping businesses move ahead</h2>
          <div className="split-grid">
            {[
              { img: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Uber Freight', desc: 'Uber Freight is a free app that matches carriers with shippers. Shippers tap a button to instantly book the loads they want to haul.', link: 'Visit Uber Freight' },
              { img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Uber for Business', desc: "Whether it's employee travel or customer rides, Uber for Business gives you an easy way to manage your ground transportation needs.", link: 'Visit Uber for Business' }
            ].map((col, i) => (
              <div key={i} className="split-column">
                <img src={col.img} alt={col.title} />
                <h3>{col.title}</h3>
                <p>{col.desc}</p>
                <a href="#" className="split-link">{col.link}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="signup-banner">
        <div className="container signup-grid">
          <a href="#" className="signup-box"><h2>Sign up to ride</h2><span className="arrow">→</span></a>
          <a href="#" className="signup-box"><h2>Sign up to drive</h2><span className="arrow">→</span></a>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <Link to="/" className="footer-logo">Uber</Link>
          <a href="#" className="help-link">Visit Help Center</a>
          <div className="footer-grid">
            {[
              { title: 'Company', links: ['About us', 'Our offerings', 'Newsroom', 'Investors', 'Blog', 'Careers'] },
              { title: 'Products', links: ['Ride', 'Drive', 'Eat', 'Uber for Business', 'Uber Freight'] },
              { title: 'Global citizenship', links: ['Safety', 'Sustainability'] },
              { title: 'Travel', links: ['Reserve', 'Airports', 'Cities'] }
            ].map((col, i) => (
              <div key={i} className="footer-column">
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map((link, j) => <li key={j}><a href="#">{link}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Uber Technologies Inc.</p>
            <div>
              <a href="#" style={{ marginRight: 20 }}>Privacy</a>
              <a href="#" style={{ marginRight: 20 }}>Accessibility</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
