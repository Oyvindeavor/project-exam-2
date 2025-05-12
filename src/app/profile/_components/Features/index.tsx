import { HandCoins } from 'lucide-react'
import fetchVenuesByProfileName from '@/utils/api/profiles/fetchVenuesByProfileName'

interface Props {
  name: string
}

export default async function Features({ name }: Props) {
  const { venues } = await fetchVenuesByProfileName(name)

  return (
    <div className='container card mb-4 shadow-sm'>
      <div className='col d-flex align-items-start'>
        <div>
          <HandCoins className='mb-3' />
          <h3 className='fw-bold mb-0 fs-4 text-body-emphasis'>Total bookings</h3>
          {venues?.map((venue) => (
            <p key={venue.id} className='text-muted'>
              {venue._count.bookings} bookings
            </p>
          ))}
        </div>
      </div>

      <div className='col d-flex align-items-start'>
        <div>
          <HandCoins className='mb-3' />
          <h3 className='fw-bold mb-0 fs-4 text-body-emphasis'>Expected revenue</h3>
          <p className='text-muted'>$Maneys</p>
        </div>
      </div>
    </div>
  )
}
