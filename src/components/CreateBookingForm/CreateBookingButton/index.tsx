import { useFormStatus } from 'react-dom'

export default function CreateBookingButton() {
  const { pending } = useFormStatus()

  return (
    <button type='submit' className='btn btn-primary w-100' disabled={pending}>
      {pending ? 'Creating Booking…' : 'Create Booking'}
    </button>
  )
}
