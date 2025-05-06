import React, { useState, useEffect } from 'react'

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

  // Debounce Logic
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query !== initialValue) {
        onSearch(query)
      }
    }, debounceDelay)

    return () => {
      clearTimeout(timerId)
    }
  }, [query, initialValue, debounceDelay, onSearch])
  // End Debounce Logic

  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  // Handle Enter key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()

      if (query !== initialValue) {
        onSearch(query)
      }
    }
  }

  return (
    <div className='mb-3 mb-md-0 me-md-2 flex-grow-1'>
      <input
        type='text'
        className='form-control form-control-lg'
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
