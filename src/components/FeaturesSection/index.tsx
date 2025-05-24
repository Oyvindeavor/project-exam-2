import { Gauge, Home, ShieldCheck, Smartphone } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <div className='bg-light py-5'>
      <div className='container'>
        {/* Section Header */}
        <div className='row mb-5'>
          <div className='col-12 text-center'>
            <h2 className='display-6 fw-bold text-dark mb-3'>Why Choose Holidaze?</h2>
            <p className='lead text-muted'>Everything you need for seamless venue booking</p>
            <div className='bg-primary mx-auto mb-4' style={{ width: '60px', height: '3px' }}></div>
          </div>
        </div>

        <div className='row g-4'>
          {/* Feature Cards */}
          {[
            {
              title: 'Fast & Easy Bookings',
              desc: 'Find and book the perfect venue in minutes with a simple, user-friendly interface.',
              icon: <Gauge size={32} />,
              color: 'primary',
            },
            {
              title: 'Manage Your Listings',
              desc: 'Venue managers can create, edit, and track their venue listings with ease — all from one dashboard.',
              icon: <Home size={32} />,
              color: 'warning',
            },
            {
              title: 'Secure Payments',
              desc: 'All transactions are processed securely, giving peace of mind to both guests and hosts.',
              icon: <ShieldCheck size={32} />,
              color: 'success',
            },
            {
              title: 'Mobile Friendly',
              desc: 'Browse and book venues from any device — mobile, tablet, or desktop — without hassle.',
              icon: <Smartphone size={32} />,
              color: 'info',
            },
          ].map((item, idx) => (
            <div key={idx} className='col-md-6 col-xl-3 mb-3'>
              <div className='card border-0 shadow-sm h-100 bg-white'>
                <div className='card-body p-4'>
                  <div className='d-flex align-items-start mb-3'>
                    <div
                      className={`bg-${item.color} bg-opacity-10 rounded-3 p-3 me-3 flex-shrink-0`}
                    >
                      <div className={`text-${item.color}`}>{item.icon}</div>
                    </div>
                  </div>
                  <h3 className='h5 fw-bold text-dark mb-3'>{item.title}</h3>
                  <p className='text-muted mb-0 lh-base'>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
