import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Holidaze',
  description:
    'Learn more about Holidaze and our mission to connect you with unforgettable venues.',
}

export default function AboutUsPage() {
  return (
    <div className='container py-5'>
      <div className='text-center mb-5'>
        <h1 className='fw-bold display-5 mb-3'>About Us</h1>
        <p className='lead text-muted'>
          Your ultimate destination for unforgettable experiences and extraordinary venues.
        </p>
      </div>

      <div className='row justify-content-center'>
        <div className='col-lg-8'>
          <div className='bg-light p-4 p-md-5 rounded shadow-sm'>
            <p className='mb-4 fs-5'>
              Welcome to <strong>Holidaze</strong> — we&apos;re passionate about helping you create
              lasting memories through a curated selection of unique venues and experiences.
            </p>
            <p className='mb-0 fs-5'>
              Whether you&apos;re planning a wedding, corporate event, or family gathering, our
              mission is simple: connect you with unforgettable places that turn any occasion into
              something special. We believe every moment deserves to be celebrated in style — and
              we’re here to make that happen.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
