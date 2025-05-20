'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function FaqPage() {
  useEffect(() => {
    import('bootstrap/js/dist/collapse')
  }, [])

  return (
    <div className='container mt-5 mb-5'>
      <h1 className='text-center mb-4 fw-bold'>Frequently Asked Questions</h1>
      <p className='text-center text-muted mb-5 lead'>
        Find answers to common questions about our platform. Still need help? Don’t hesitate to
        <Link href='/contact' className='text-decoration-none'>
          <span className='text-primary'> contact us</span>
        </Link>
      </p>

      <div className='accordion shadow rounded' id='faqAccordion'>
        {/* Q1 */}
        <div className='accordion-item border-0'>
          <h2 className='accordion-header' id='headingOne'>
            <button
              className='accordion-button fw-semibold rounded-top'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
              aria-expanded='true'
              aria-controls='collapseOne'
            >
              What is Holidaze?
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse collapse show'
            aria-labelledby='headingOne'
            data-bs-parent='#faqAccordion'
          >
            <div className='accordion-body bg-light rounded-bottom'>
              <p className='mb-0'>
                Holidaze is a platform where you can find and book unique holiday accommodations,
                ranging from cozy cabins to extraordinary event venues.
              </p>
            </div>
          </div>
        </div>

        {/* Q2 */}
        <div className='accordion-item border-0'>
          <h2 className='accordion-header' id='headingTwo'>
            <button
              className='accordion-button collapsed fw-semibold rounded-top'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseTwo'
              aria-expanded='false'
              aria-controls='collapseTwo'
            >
              Who can use Holidaze?
            </button>
          </h2>
          <div
            id='collapseTwo'
            className='accordion-collapse collapse'
            aria-labelledby='headingTwo'
            data-bs-parent='#faqAccordion'
          >
            <div className='accordion-body bg-light rounded-bottom'>
              <p className='mb-0'>
                Holidaze is for two types of users: venue managers and regular customers.
                <br />
                <strong>Venue managers</strong> can list and manage their venues and view bookings
                made by others, but they cannot book venues themselves.
                <br />
                <strong>Customers</strong> can register, browse venues, make bookings, and manage or
                delete their reservations.
              </p>
            </div>
          </div>
        </div>

        {/* Q3 */}
        <div className='accordion-item border-0'>
          <h2 className='accordion-header' id='headingThree'>
            <button
              className='accordion-button collapsed fw-semibold rounded-top'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseThree'
              aria-expanded='false'
              aria-controls='collapseThree'
            >
              Can venue managers book venues?
            </button>
          </h2>
          <div
            id='collapseThree'
            className='accordion-collapse collapse'
            aria-labelledby='headingThree'
            data-bs-parent='#faqAccordion'
          >
            <div className='accordion-body bg-light rounded-bottom'>
              <p className='mb-0'>
                No. Venue managers can only create, edit, and manage their listed venues and view
                bookings made by customers. They do not have access to the booking features.
              </p>
            </div>
          </div>
        </div>

        {/* Q4 */}
        <div className='accordion-item border-0'>
          <h2 className='accordion-header' id='headingFour'>
            <button
              className='accordion-button collapsed fw-semibold rounded-top'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseFour'
              aria-expanded='false'
              aria-controls='collapseFour'
            >
              How do i register as a venue manager?
            </button>
          </h2>
          <div
            id='collapseFour'
            className='accordion-collapse collapse'
            aria-labelledby='headingFour'
            data-bs-parent='#faqAccordion'
          >
            <div className='accordion-body bg-light rounded-bottom'>
              <p className='mb-0'>
                To register as a venue manager, check the &quot;venue manager&quot; option on the
                registration form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
