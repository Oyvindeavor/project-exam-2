import { BookKey } from 'lucide-react'

export default async function Home() {
  return (
    <div>
      <p>Welcome to Next.js!</p>

      <button type='button' className='btn btn-primary btn-lg'>
        Large button
        <BookKey />
      </button>
    </div>
  )
}
