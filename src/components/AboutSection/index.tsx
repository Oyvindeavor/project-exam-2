import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
export default function AboutSection() {
  return (
    <section className='py-5 bg-light'>
      <div className='container'>
        {/* Main About Content */}
        <div className='row align-items-center mb-5'>
          {/* Left Column - Icon */}
          <div className='col-lg-5 text-center mb-4 mb-lg-0'>
            <div className='bg-white p-4 rounded-3 shadow-sm d-inline-block'>
              <img
                src='/holidaze_logo5.svg'
                alt='About Holidaze'
                className='img-fluid rounded-3 shadow-sm bg-primary'
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className='col-lg-7'>
            <h2 className='display-5 fw-bold text-dark mb-3'>
              About <span className='text-primary'>Holidaze</span>
            </h2>
            <div className='bg-primary mb-4'></div>

            <p className='lead text-muted mb-3'>
              We&apos;re dedicated to helping you find the perfect venue — no matter the occasion.
              We make venue booking simple, stylish, and stress-free.
            </p>

            <p className='text-muted mb-4'>
              Whether you&apos;re planning a wedding, corporate event, birthday celebration, or any
              special gathering, our curated selection of premium venues ensures your event will be
              unforgettable.
            </p>

            <Link href='/about' className='btn btn-primary btn-lg fw-semibold px-4'>
              Learn More About Us
              <ArrowRightIcon className='ms-2' size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
