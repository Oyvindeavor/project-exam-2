'use client'

import React, { useState } from 'react'

export default function ContactUsForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    setTimeout(() => {
      setStatus('submitted')
    }, 500) // Simulate network delay
  }

  return (
    <div className='container py-5'>
      <div className='text-center mb-5'>
        <h1 className='fw-bold display-5 mb-3'>Contact Us</h1>
        <p className='lead text-muted'>
          We&apos;d love to hear from you. Whether you have a question, suggestion, or just want to
          say hello — drop us a message below.
        </p>
      </div>

      <div className='row justify-content-center'>
        <div className='col-lg-8'>
          <div className='p-4 p-md-5 bg-light rounded shadow-sm'>
            {status === 'submitted' ? (
              <div className='alert alert-success text-center fw-semibold'>
                ✅ Thank you for your message! We&apos;ll get back to you shortly.
              </div>
            ) : (
              <form className='row g-4' onSubmit={handleSubmit}>
                <div className='col-md-6'>
                  <label htmlFor='name' className='form-label fw-semibold'>
                    Name
                  </label>
                  <input type='text' className='form-control' id='name' required />
                </div>
                <div className='col-md-6'>
                  <label htmlFor='email' className='form-label fw-semibold'>
                    Email
                  </label>
                  <input type='email' className='form-control' id='email' required />
                </div>
                <div className='col-12'>
                  <label htmlFor='message' className='form-label fw-semibold'>
                    Message
                  </label>
                  <textarea className='form-control' id='message' rows={5} required></textarea>
                </div>
                <div className='col-12 text-center'>
                  <button
                    type='submit'
                    className='btn btn-primary px-5 py-2 fw-bold'
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
