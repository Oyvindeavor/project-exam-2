'use client'

import Link from 'next/link'
import { useState, useId, KeyboardEvent } from 'react'

export default function HeroInput() {
  const [searchInput, setSearchInput] = useState('')
  const searchId = useId()
  const trimmedInput = searchInput.trim()
  const searchHref = trimmedInput ? `/venues?q=${encodeURIComponent(trimmedInput)}` : '/venues'

  // Handle keyboard navigation for better accessibility
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const searchButton = document.querySelector(`a[href="${searchHref}"]`) as HTMLAnchorElement
      if (searchButton) {
        searchButton.click()
      }
    }
  }

  return (
    <div className='mb-4' role='search' aria-label='Venue search'>
      <form className='d-flex justify-content-center' onSubmit={(e) => e.preventDefault()}>
        <div className='input-group'>
          <label htmlFor={searchId} className='visually-hidden'>
            Search for venues
          </label>
          <input
            type='search'
            id={searchId}
            className='form-control me-2'
            placeholder='Search for venues...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-describedby='search-description'
          />
          <span id='search-description' className='visually-hidden'>
            Enter keywords to search for venues and press Enter or click the Search button
          </span>
          <Link
            href={searchHref}
            className='btn btn-primary'
            role='button'
            aria-label='Search venues'
          >
            Search
          </Link>
        </div>
      </form>
    </div>
  )
}
