import { Link } from 'react-router-dom'
import UberHeader from '../components/UberHeader'
import UberFooter from '../components/UberFooter'

export default function About() {
  return (
    <div className="bg-white text-black antialiased" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <UberHeader activeLink="about" />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        <section className="space-y-8">
          <div className="relative h-[480px] w-full rounded-lg overflow-hidden bg-gray-900">
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1600" alt="People laughing together" className="w-full h-full object-cover object-center opacity-85" />
            <div className="absolute bottom-12 left-12">
              <h1 className="text-white text-5xl font-bold tracking-tight">About us</h1>
            </div>
          </div>
          <div className="max-w-3xl space-y-4 pt-4">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 leading-tight">We reimagine the way the world moves for the better</h2>
            <p className="text-gray-600 leading-relaxed text-base">Movement is what we power. It's our lifeblood. It runs through our veins. It's what gets us out of bed each morning. It pushes us to constantly reimagine how we can move better. For you. For all the places you want to go. For all the things you want to get. For all the ways you want to earn. Across the entire world. In real time. At the incredible speed of now.</p>
          </div>
        </section>

        <section className="relative rounded-lg overflow-hidden bg-gray-900 h-[420px] flex items-center">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200" alt="Dara Khosrowshahi CEO" className="absolute inset-0 w-full h-full object-cover object-top opacity-80" />
          <div className="relative z-10 max-w-md ml-12 text-white space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">A letter from our CEO</h3>
            <p className="text-sm opacity-90 leading-relaxed">Read about our team's commitment to provide everyone on our global platform with the technology that can help them move ahead.</p>
            <a href="#" className="inline-block bg-black text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-gray-900 transition">Read Dara's letter</a>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="h-[320px] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
            <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800" alt="Aerial view of green park space" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">Sustainability</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Uber is committing to becoming a fully electric, zero-emission platform by 2040, with 100% of rides taking place in zero-emission vehicles, on public transit, or with micromobility. It is our responsibility as the largest mobility platform in the world to more aggressively tackle the challenge of climate change. We will do this by offering riders more ways to ride green, helping drivers go electric, making transparency a priority and partnering with NGOs and the private sector to help expedite a clean and just energy transition.</p>
            <a href="#" className="inline-block border-b border-black font-semibold text-sm pb-1 hover:text-gray-600 hover:border-gray-600 transition">Learn more</a>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">Rides and beyond</h3>
            <p className="text-gray-600 text-sm leading-relaxed">In addition to helping riders find a way to go from point A to point B, we're helping people order food quickly and affordably, removing barriers to healthcare, creating new freight-booking solutions, and helping companies provide a seamless employee travel experience. And always helping drivers and couriers earn.</p>
            <div className="flex flex-wrap gap-6 pt-2">
              <a href="#" className="border-b border-black font-semibold text-sm pb-1 hover:text-gray-600 transition">How to use the Uber app</a>
              <Link to="/offering" className="border-b border-black font-semibold text-sm pb-1 hover:text-gray-600 transition">Our offerings</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">Your safety drives us</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Whether you're in the back seat or behind the wheel, your safety is essential. We are committed to doing our part, and technology is at the heart of our approach. We partner with safety advocates and develop new technologies and systems to help improve safety and help make it easier for everyone to get around.</p>
            <a href="#" className="inline-block border-b border-black font-semibold text-sm pb-1 hover:text-gray-600 transition pt-2">Learn more</a>
          </div>
        </section>

        <hr className="border-gray-200" />

        <section className="space-y-8">
          <h3 className="text-2xl font-bold tracking-tight">Company info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600', title: "Who's driving Uber", text: "We're building a culture within Uber that emphasizes doing the right thing, period, for riders, drivers, and employees. Find out more about the team that's leading the way.", link: 'See our leadership' },
              { img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600', title: 'Acting with integrity', text: "Uber's Ethics & Compliance Program Charter outlines our commitment to integrity at the highest levels within the company. Transparency is critical to an ethical culture; we achieve this through our Integrity Helpline.", link: 'Learn more' }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="h-48 rounded-lg overflow-hidden bg-gray-100">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-bold tracking-tight">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                <a href="#" className="inline-block border-b border-black text-sm font-semibold pb-1 hover:text-gray-600 transition">{item.link}</a>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h3 className="text-2xl font-bold tracking-tight">Keep up with the latest</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400', title: 'Newsroom', text: 'Get announcements about partnerships, app updates, initiatives, and more near you and around the world.', link: 'Go to Newsroom', to: '/newsroom' },
              { img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400', title: 'Blog', text: 'Find new places to explore and learn about Uber products, partnerships, and more.', link: 'Read our posts', to: '/blog' },
              { img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400', title: 'Investor relations', text: 'Download financial reports, see next-quarter plans, and read about our corporate responsibility initiatives.', link: 'Learn more', to: '/invester' }
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <div className="h-40 rounded-lg overflow-hidden bg-gray-100 mb-2">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-bold tracking-tight">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                <Link to={item.to} className="inline-block border-b border-black text-sm font-semibold pb-1 hover:text-gray-600 transition">{item.link}</Link>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 pt-4">
          <h3 className="text-3xl font-bold tracking-tight">Come reimagine with us</h3>
          <Link to="/career" className="inline-block bg-black text-white text-sm font-semibold px-6 py-3.5 rounded-md hover:bg-gray-800 transition">Search open roles</Link>
        </section>
      </main>

      <UberFooter />
    </div>
  )
}
