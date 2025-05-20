import { Gauge, Home, ShieldCheck, Smartphone } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <div className='features-section py-5'>
      <div className='container'>
        <hr className='divider' />
        <div className='row'>
          {/* Feature Cards */}
          {[
            {
              title: 'Fast & Easy Bookings',
              desc: 'Find and book the perfect venue in minutes with a simple, user-friendly interface.',
              icon: <Gauge color='#0b6e66' size={28} />,
            },
            {
              title: 'Manage Your Listings',
              desc: 'Venue managers can create, edit, and track their venue listings with ease — all from one dashboard.',
              icon: <Home color='#f59e0b' size={28} />,
            },
            {
              title: 'Secure Payments',
              desc: 'All transactions are processed securely, giving peace of mind to both guests and hosts.',
              icon: <ShieldCheck color='#10b981' size={28} />,
            },
            {
              title: 'Mobile Friendly',
              desc: 'Browse and book venues from any device — mobile, tablet, or desktop — without hassle.',
              icon: <Smartphone color='#6366f1' size={28} />,
            },
          ].map((item, idx) => (
            <div key={idx} className='col-md-6 col-lg-3 mb-4'>
              <div className='card card-shadow border-0 h-100'>
                <div className='card-body d-flex gap-3 align-items-start'>
                  <div className='icon-box'>{item.icon}</div>
                  <div>
                    <h2 className='h5 font-weight-bold mb-2'>{item.title}</h2>
                    <p className='text-muted mb-0'>{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className='divider' />
      </div>
    </div>
  )
}
