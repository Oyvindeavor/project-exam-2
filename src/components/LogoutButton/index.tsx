'use client'

import { useRouter } from 'next/navigation'
export default function LogoutButton() {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/auth/login')
      } else {
        console.error('Logout failed')
      }
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <button className='btn btn-danger' onClick={handleLogout}>
      Logout
    </button>
  )
}
