'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogout = async () => {
    setIsLoading(true) // Set loading true
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/auth/login')
        router.refresh()
      } else {
        console.error('Logout failed')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Logout error:', err)
      setIsLoading(false)
    }
  }

  return (
    <button className='btn btn-danger' onClick={handleLogout} disabled={isLoading}>
      {isLoading ? 'Logging out...' : 'Logout'}
      <LogOut className='ms-2' />
    </button>
  )
}
