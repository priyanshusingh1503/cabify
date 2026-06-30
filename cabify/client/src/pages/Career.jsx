import './Career.css'

export default function Career() {
  return (
    <div className="career-page">
      <nav>
        <div className="logo">Uber</div>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Teams</a></li>
          <li><a href="#">Locations</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </nav>

      <section className="hero">
        <img className="floating float1" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500" alt="" />
        <img className="floating float2" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500" alt="" />
        <div className="hero-content">
          <h1>Superheroes<br />Could Never</h1>
          <p>The tech that carries people and things to where they need to go.</p>
          <button className="btn">Move to Brands</button>
        </div>
      </section>

      <section className="section">
        <h2>What moves us,<br />moves the world</h2>
        <div className="globe"></div>
        <p>We reimagine the way the world moves for the better. Building technology that helps millions of people every day.</p>
      </section>

      <section className="section">
        <h2>Strategy & Operations</h2>
        <div className="cards">
          {[
            { img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', title: 'Operations' },
            { img: 'https://images.unsplash.com/photo-1552664730-d307ca884978', title: 'Engineering' },
            { img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', title: 'Data Science' }
          ].map((card, i) => (
            <div key={i} className="card">
              <img src={card.img} alt={card.title} />
              <h3>{card.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="section video-section">
        <h2>What does it take to move the world?</h2>
        <video autoPlay muted loop controls>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
      </section>

      <section className="section">
        <h2>Every step toward<br />your next move</h2>
        <p>Apply for roles that create real-world impact. Join a global team building the future of mobility.</p>
        <br /><br />
        <button className="btn">Apply Now</button>
      </section>

      <footer>
        <h2>Uber Careers Clone</h2>
        <p>Built with HTML, CSS & JavaScript</p>
      </footer>
    </div>
  )
}
