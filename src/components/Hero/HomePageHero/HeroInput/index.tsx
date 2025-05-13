'use client'

import Link from 'next/link'
import { useState, useId, KeyboardEvent } from 'react'
import styles from '../HomePageHero.module.scss'
import { Search } from 'lucide-react'

export default function HeroInput() {
  const [searchInput, setSearchInput] = useState('')
  const searchId = useId()
  const trimmedInput = searchInput.trim()

  const searchHref = trimmedInput ? `/venues?q=${encodeURIComponent(trimmedInput)}` : '/venues'

  // Handle keyboard navigation for better accessibility
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const searchButton = document.getElementById('heroSearchButton') as HTMLAnchorElement
      if (searchButton) {
        searchButton.click()
      }
    }
  }

  return (
    <div className={styles.heroInputContainer} role='search' aria-label='Venue search'>
      <form
        className={`d-flex justify-content-center ${styles.heroInputForm}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={`input-group ${styles.heroInputGroup}`}>
          <label htmlFor={searchId} className='visually-hidden'>
            Search for venues
          </label>
          <input
            type='search'
            id={searchId}
            className={`form-control ${styles.heroSearchInput}`}
            placeholder='E.g., "Garden" or "wedding"'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-describedby='search-description'
          />
          <Link
            id='heroSearchButton'
            href={searchHref}
            className={`btn btn-primary ${styles.heroSearchButton}`}
            role='button'
            aria-label='Search venues'
          >
            Search
            <Search className='ms-2' />
          </Link>
        </div>
        <span id='search-description' className='visually-hidden'>
          Enter keywords to search for venues and press Enter or click the Search button.
        </span>
      </form>
    </div>
  )
}
