import Link from 'next/link'
import { isUserLoggedIn } from '@/utils/auth/isUserLoggedIn'

interface BookNowProps {
  id: string
}

export default async function BookNow({ id }: BookNowProps) {
  const isLoggedIn = await isUserLoggedIn()
  return (
    <div className='row'>
      <div className='col-12'>
        <div className='card bg-primary text-white shadow'>
          <div className='card-body p-4 text-center'>
            <h3 className='mb-3'>Ready to book this venue?</h3>
            {isLoggedIn ? (
              <Link href={`/venue/${id}/book`} className='btn btn-light btn-lg px-4'>
                Book Now
              </Link>
            ) : (
              <Link href='/auth/login' className='btn btn-light btn-lg px-4'>
                Log in to book
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
