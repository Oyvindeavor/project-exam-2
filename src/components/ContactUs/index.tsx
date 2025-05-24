import Link from 'next/link'
import { Contact } from 'lucide-react'

export default function ContactUs() {
  return (
    <section className='py-5 bg-light'>
      <div className='container'>
        {/* Main Contact Content */}
        <div className='row align-items-center mb-5'>
          {/* Left Column - Icon */}
          <div className='col-lg-5 text-center mb-4 mb-lg-0'>
            <div className='bg-white p-4 rounded-3 shadow-sm d-inline-block'>
              <Contact size={180} color='#0b6e66' />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className='col-lg-7'>
            <h2 className='display-5 fw-bold text-dark mb-3'>Contact</h2>
            <div className='bg-primary mb-4'></div>

            <p className='lead text-muted mb-3'>
              We are here to help you with any questions or concerns you may have. Our team is
              dedicated to providing you with the best support possible. Please feel free to reach
              out to us at any time.
            </p>

            <Link href='/contact' className='btn btn-primary btn-lg fw-semibold px-4'>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
