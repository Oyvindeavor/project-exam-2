'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { UrlObject } from 'url'
import { type ReactNode } from 'react'

type NavLinkProps = {
  href: string | UrlObject
  children: ReactNode
  exact?: boolean
  className?: string
}

export default function NavLink({ href, children, exact = false, className = '' }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href.toString() : pathname.startsWith(href.toString())

  return (
    <Link href={href} className={`nav-link ${isActive ? 'active' : ''} ${className}`.trim()}>
      {children}
    </Link>
  )
}
