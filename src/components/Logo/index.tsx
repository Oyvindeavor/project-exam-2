import Link from 'next/link'
import styles from './Logo.module.scss'
export default function Logo() {
  return (
    <Link
      href='/'
      className='navbar-brand d-flex align-items-center gap-2 text-decoration-none'
      aria-label='Homepage - Holidaze'
    >
      <img
        src='/holidaze_logo5.svg'
        alt='Holidaze Logo - 2 circles on top of each other with a small house in the middle'
        className='logo'
        width={30}
        height={30}
      />
      <span className={`${styles.logoFont} fw-bold`}>Holidaze</span>
    </Link>
  )
}
