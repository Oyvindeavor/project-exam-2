import Link from 'next/link'
import { Contact } from 'lucide-react'

export default function ContactUs() {
  return (
    <section className='about-section py-5 px-5 px-3 rounded-4' aria-labelledby='about-us-heading'>
      <hr className='my-4' />

      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-md-5 '>
            <div className={` text-center`}>
              <Contact size={200} color='#0b6e66' />
            </div>
          </div>
          <div className='col-md-7'>
            <h2 id='about-us-heading' className='section-title fw-bold mb-3'>
              Contact Us
            </h2>
            <p className='lead text-muted mb-4'>
              Here at Holidaze We’re dedicated to helping you find the perfect venue — no matter the
              occasion we make venue booking simple, stylish, and stress-free.
            </p>

            <Link href='/contact' className='btn btn-outline-primary fw-bold px-4 py-2'>
              Contact Us
            </Link>
          </div>
        </div>
        <hr className='my-4' />
      </div>
    </section>
  )
}
