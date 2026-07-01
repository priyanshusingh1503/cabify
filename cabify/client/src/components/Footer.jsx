import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#000', color: '#fff', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: 1150, margin: 'auto' }}>
        <div style={{ marginBottom: 70 }}>
          <h2 style={{ fontSize: 36, fontWeight: 400, marginBottom: 25 }}>Uber</h2>
          <Link to="#" style={{ color: '#fff', textDecoration: 'none', fontSize: 16 }}>Visit Help Center</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 60, marginBottom: 70 }}>
          {[{ title:'Company', links:[{text:'About us',to:'/about'},{text:'Our offerings',to:'/offerings'},{text:'Newsroom',to:'/Newsroom'},{text:'Investors',to:'#'},{text:'Blog',to:'#'},{text:'Careers',to:'/Careers'},{text:'Uber One',to:'/Uber-one'}] },
            { title:'Products', links:[{text:'Ride',to:'/ride'},{text:'Drive',to:'/drive'},{text:'Eat',to:'/eat'},{text:'Uber for Business',to:'/business'},{text:'Uber Freight',to:'#'},{text:'Gift cards',to:'#'},{text:'Uber Health',to:'#'},{text:'Uber Advertising',to:'#'}] },
            { title:'Global citizenship', links:[{text:'Safety',to:'/safety'},{text:'Sustainability',to:'/sustainability'}] },
            { title:'Travel', links:[{text:'Reserve',to:'#'},{text:'Airports',to:'/airports'},{text:'Cities',to:'/cities'}] }
          ].map(col => (
            <div key={col.title}>
              <h3 style={{ fontSize: 22, marginBottom: 25 }}>{col.title}</h3>
              {col.links.map(l => <Link key={l.text} to={l.to} style={{ display:'block', color:'#fff', textDecoration:'none', marginBottom:16, fontSize:15 }}>{l.text}</Link>)}
            </div>
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:50 }}>
          <div style={{ display:'flex', gap:28 }}>
            {['linkedin','youtube','instagram','x-twitter'].map(s => (
              <Link key={s} to="#" style={{ color:'#fff', fontSize:20 }}><i className={`fab fa-${s}`}></i></Link>
            ))}
          </div>
          <div style={{ display:'flex', gap:30 }}>
            <Link to="#" style={{ color:'#fff', textDecoration:'none', fontSize:15 }}>🌐 English</Link>
            <Link to="#" style={{ color:'#fff', textDecoration:'none', fontSize:15 }}>📍 Bhopal</Link>
          </div>
        </div>
        <div style={{ display:'flex', gap:15, marginBottom:50 }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ height:42 }} />
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" style={{ height:42 }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid rgba(255,255,255,0.15)', paddingTop:30 }}>
          <p style={{ color:'#bdbdbd', fontSize:13 }}>&copy; 2026 Uber Technologies Inc.</p>
          <div style={{ display:'flex', gap:30 }}>
            <Link to="#" style={{ color:'#bdbdbd', textDecoration:'none', fontSize:13 }}>Privacy</Link>
            <Link to="#" style={{ color:'#bdbdbd', textDecoration:'none', fontSize:13 }}>Accessibility</Link>
            <Link to="#" style={{ color:'#bdbdbd', textDecoration:'none', fontSize:13 }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
