'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { UrlObject } from 'url'

type NavLinkProps = {
  href: string | UrlObject
  children: React.ReactNode
  exact?: boolean // For the main profile tab to not match /profile/bookings
}

export default function NavLink({ href, children, exact = false }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href.toString())

  return (
    <Link href={href} className={`nav-link ${isActive ? 'active' : ''}`} passHref>
      {children}
    </Link>
  )
}
