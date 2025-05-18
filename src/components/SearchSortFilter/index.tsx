'use client'

import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './SearchSortFilter.module.scss'

import SearchInput from './SearchInput'
import SortOptions from './SortOptions'
import HeroSectionSkeleton from './Skeleton'

const availableSortFields = [
  { value: 'created', label: 'Date' },
  { value: 'name', label: 'Name' },
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
]

function HeroSectionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current values from URL parameters
  const currentQuery = searchParams.get('q') || ''
  const currentSortField = searchParams.get('sort') || 'created'
  const currentSortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'

  const updateUrlParams = (newParams: Record<string, string | undefined | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    params.set('page', '1')
    router.push(`/venues?${params.toString()}`)
  }

  const handleSearch = (query: string) => {
    updateUrlParams({ q: query })
  }

  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    updateUrlParams({ sort: field, sortOrder: order })
  }

  return (
    <section
      className={`${styles.heroSection} bg-primary rounded-3 shadow-lg border container-fluid text-center mb-5`}
    >
      <div className={styles.searchSortControls}>
        <SearchInput
          initialValue={currentQuery}
          onSearch={handleSearch}
          placeholder='Search venues by name, description...'
          ariaLabel='Search for venues'
        />
        <SortOptions
          initialSortField={currentSortField}
          initialSortOrder={currentSortOrder}
          onSortChange={handleSortChange}
          sortFields={availableSortFields}
        />
      </div>
    </section>
  )
}

export default function HeroSection() {
  return (
    <Suspense fallback={<HeroSectionSkeleton />}>
      {' '}
      {/* I need a skeleton here */}
      <HeroSectionContent />
    </Suspense>
  )
}
