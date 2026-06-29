import './Newsroom.css'

export default function Newsroom() {
  const news = [
    { img: 'https://picsum.photos/id/352/400/250', category: 'Rides', title: 'Uber Bike takes centre stage this IPL with ₹25 bike rides', date: 'April 16, 2026' },
    { img: 'https://picsum.photos/id/142/400/250', category: 'Safety', title: 'Uber partners with Bengaluru Police to enhance safety', date: 'January 20, 2026' },
    { img: 'https://picsum.photos/id/183/400/250', category: 'Rides', title: 'How India Ubered in 2025 – Everyday travel, extraordinary scale', date: 'January 6, 2026' },
    { img: 'https://picsum.photos/id/442/400/250', category: 'Safety', title: 'Driving Change: Moving Forward Together', date: 'December 11, 2025' },
    { img: 'https://picsum.photos/id/1070/400/250', category: 'Company News', title: 'Uber forays into B2B Logistics with Uber Direct, launches metro ticketing in Bangalore, powered by ONDC Network', date: 'December 10, 2025' },
    { img: 'https://picsum.photos/id/133/400/250', category: 'Safety', title: 'Uber and AB InBev India partner to promote responsible behaviour on roads', date: 'October 16, 2025' }
  ]

  return (
    <div className="newsroom-page">
      <header>
        <div className="header-left">
          <a href="#" className="logo">Uber Newsroom</a>
        </div>
        <div className="nav-buttons">
          <a href="#" className="login-btn">Log in</a>
          <a href="#" className="signup-btn">Sign up</a>
        </div>
      </header>

      <main className="main-container">
        <div className="section-tag">News</div>
        <h1 className="main-heading">Uber news in India</h1>

        <div className="featured-wrapper">
          <div className="featured-img-box">
            <img src="https://picsum.photos/id/180/800/600" alt="GO-GET 2026 Event" />
          </div>
          <div className="featured-content">
            <div className="tags-row">Company News • Featured • Rides</div>
            <h2 className="featured-title">GO–GET 2026: One app for everything</h2>
            <div className="date-stamp">April 29, 2026</div>
          </div>
        </div>

        <h2 className="section-divider">Latest news</h2>

        <div className="news-grid">
          {news.map((item, i) => (
            <div key={i} className="news-card">
              <div className="card-img-box">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="card-category">{item.category}</div>
              <h3 className="card-title">{item.title}</h3>
              <div className="date-stamp">{item.date}</div>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <div className="footer-logo">Uber</div>
        <div className="footer-grid">
          {[
            { title: 'Company', links: ['About us', 'Our offerings', 'Newsroom', 'Investors', 'Careers'] },
            { title: 'Products', links: ['Ride', 'Drive', 'Eat', 'Uber for Business', 'Uber Freight'] },
            { title: 'Global citizenship', links: ['Safety', 'Sustainability'] },
            { title: 'Travel', links: ['Reserve', 'Airports', 'Cities'] }
          ].map((col, i) => (
            <div key={i} className="footer-col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((link, j) => (
                  <li key={j}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div>&copy; 2026 Uber Technologies Inc.</div>
          <div className="footer-legal-links">
            <a href="#">Privacy</a>
            <a href="#">Accessibility</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
