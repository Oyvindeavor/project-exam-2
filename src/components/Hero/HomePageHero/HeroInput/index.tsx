'use client'

import Link from 'next/link'
import { useState, useId, KeyboardEvent } from 'react'
import styles from '../HomePageHero.module.scss'
import { Search as SearchIcon } from 'lucide-react'

export default function HeroInput() {
  const [searchInput, setSearchInput] = useState('')
  const searchInputId = useId()
  const trimmedInput = searchInput.trim()
  const searchHref = trimmedInput ? `/venues?q=${encodeURIComponent(trimmedInput)}` : '/venues'

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const searchButton = document.getElementById('heroSearchButton') as HTMLAnchorElement | null
      if (searchButton) {
        searchButton.click()
      }
    }
  }

  return (
    <div className={styles.heroInputContainer} role='search' aria-labelledby='hero-input-heading'>
      <h2 id='hero-input-heading' className='visually-hidden'>
        Venue Search
      </h2>
      <form
        className={`d-flex justify-content-center ${styles.heroInputForm}`}
        onSubmit={(e) => e.preventDefault()}
        role='presentation'
      >
        <div className={`input-group ${styles.heroInputGroup}`}>
          <div className='form-floating flex-grow-1'>
            <input
              type='search'
              id={searchInputId}
              className={`form-control ${styles.heroSearchInput}`}
              placeholder='E.g., "Oslo", "conference", "wedding"'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-describedby='search-instructions'
            />
            <label htmlFor={searchInputId}>Search for venues</label>
          </div>

          <Link
            id='heroSearchButton'
            href={searchHref}
            className={`btn btn-primary d-inline-flex align-items-center ${styles.heroSearchButton}`}
            role='button'
            aria-label='Search venues'
          >
            <SearchIcon className='ms-2' aria-hidden='true' size={22} />
          </Link>
        </div>

        <span id='search-instructions' className='visually-hidden'>
          Enter keywords to search for venues (e.g., location, type, or name) and press Enter or
          click the Search button.
        </span>
      </form>
    </div>
  )
}
