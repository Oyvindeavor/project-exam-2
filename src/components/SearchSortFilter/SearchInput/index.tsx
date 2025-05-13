import React, { useState, useEffect } from 'react'
import styles from '../SearchSortFilter.module.scss'

interface SearchInputProps {
  initialValue?: string
  onSearch: (query: string) => void
  placeholder?: string
  ariaLabel?: string
  debounceDelay?: number
}

export default function SearchInput({
  initialValue = '',
  onSearch,
  placeholder = 'Search...',
  ariaLabel = 'Search input',
  debounceDelay = 500,
}: SearchInputProps) {
  const [query, setQuery] = useState(initialValue)
  const inputId = 'searchInput'

  // Debounce Logic
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query !== initialValue) {
        onSearch(query)
      }
    }, debounceDelay)

    return () => clearTimeout(timerId)
  }, [query, initialValue, debounceDelay, onSearch])

  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (query !== initialValue) {
        onSearch(query)
      }
    }
  }

  return (
    <div className={`${styles.searchInput} form-floating mb-3 mb-md-0`}>
      <input
        id={inputId}
        type='text'
        className='form-control form-control-lg shadow-sm'
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor={inputId}>{placeholder}</label>
    </div>
  )
}
