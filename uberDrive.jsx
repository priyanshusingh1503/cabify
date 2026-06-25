import './drive.css'

function Navbar() {
  return (
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
  )
}

function DriveNavbar() {
  return (
    <section className="drive-navbar">
      <div className="drive-container">
        <div className="drive-logo">
          <h2>Drive</h2>
        </div>
        <ul className="drive-links">
          <li><a href="#">Sign up</a></li>
          <li><a href="#">Requirements</a></li>
          <li><a href="#">Your first trip</a></li>
          <li><a href="#">Using the app</a></li>
          <li><a href="#">Earnings</a></li>
          <li><a href="#">Uber Pro</a></li>
          <li><a href="#">Safety</a></li>
          <li><a href="#">Contact us</a></li>
        </ul>
      </div>
    </section>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>
          Drive when you <br />
          want, make what <br />
          you need
        </h1>
        <p>Earn on your own schedule.</p>
        <button>Get Started</button>
      </div>
      <div className="hero-image">
        <img
          src="srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NzNiNjcxZi00Y2NkLTQ4NGEtYWQ5Ny1jZGVkMzE4MjNlZDAucG5n.webp"
          alt="Hero"
        />
      </div>
    </section>
  )
}

function WhyDrive() {
  return (
    <section className="why-drive">
      <div className="container">
        <h2>Why drive with us</h2>
        <div className="banner">
          <img src="3aa87102-5c54-478c-8a98-0df3a951a202.svg" alt="Why Drive" />
        </div>
        <div className="features">
          <div className="feature">
            <div className="icon">📅</div>
            <h3>Set your own hours</h3>
            <p>You decide when and how often you drive.</p>
          </div>
          <div className="feature">
            <div className="icon">💵</div>
            <h3>Get paid fast</h3>
            <p>Weekly payments in your bank account.</p>
          </div>
          <div className="feature">
            <div className="icon">🧑‍💼</div>
            <h3>Get support at every turn</h3>
            <p>If there's anything that you need, you can reach us anytime.</p>
          </div>
        </div>
        <a href="#" className="drive-link">How driving works</a>
      </div>
    </section>
  )
}

function Requirements() {
  return (
    <section className="requirements">
      <h2>Here's what you need to sign up</h2>
      <div className="cards">
        <div className="card">
          <h3>Requirements</h3>
          <ul>
            <li>18+ years old</li>
            <li>Background screening</li>
          </ul>
        </div>
        <div className="card">
          <h3>Documents</h3>
          <ul>
            <li>Driving License</li>
            <li>Residence Proof</li>
          </ul>
        </div>
        <div className="card">
          <h3>Signup Process</h3>
          <ul>
            <li>Submit Documents</li>
            <li>Verification</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Safety() {
  return (
    <section className="safety">
      <h2>Safety on the road</h2>
      <div className="safety-grid">
        <div>
          <img src="6f7f63bb-10f4-488b-9000-593bcfe40dca.svg" alt="Protection" />
          <h3>Protection on every trip</h3>
        </div>
        <div>
          <img src="5237d27d-0510-551e-807c-cb3a80774c4a.svg" alt="Help" />
          <h3>Help if you need it</h3>
        </div>
        <div>
          <img src="a7c590ac-242e-47eb-86cb-90db7712d44f.svg" alt="Community" />
          <h3>Community Guidelines</h3>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="faq">
      <h2>Frequently asked questions</h2>
      <div className="faq-item">Can I drive with Uber in my city?</div>
      <div className="faq-item">What are the requirements?</div>
      <div className="faq-item">Is Uber safe?</div>
      <div className="faq-item">Do I need my own car?</div>
    </section>
  )
}

function DriverApp() {
  return (
    <section className="driver-app">
      <div className="overlay">
        <h2>The Driver app</h2>
        <p>Easy to use and reliable. Shows everything drivers need.</p>
      </div>
    </section>
  )
}

function Download() {
  return (
    <section className="download">
      <h2>Drive your way in the app</h2>
      <div className="download-card">
        <img src="images/qr.png" alt="QR Code" />
        <div>
          <h3>Download the Driver app</h3>
          <p>Scan to download</p>
        </div>
      </div>
    </section>
  )
}

function StickyButton() {
  return <div className="sticky-btn">Sign up to drive</div>
}

export default function UberDrive() {
  return (
    <>
      <Navbar />
      <DriveNavbar />
      <Hero />
      <WhyDrive />
      <Requirements />
      <Safety />
      <FAQ />
      <DriverApp />
      <Download />
      <StickyButton />
    </>
  )
}