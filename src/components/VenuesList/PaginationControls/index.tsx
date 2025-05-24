import React from 'react'
import Link from 'next/link'
import type { Meta } from '@/types/NoroffApi/shared'

interface PaginationControlsProps {
  metaData: Meta | null
  searchParams: {
    q?: string
    sort?: string
    sortOrder?: 'asc' | 'desc'
    limit?: string
    page?: string
    _owner?: string
    _bookings?: string
  }
}

function generatePageLink(
  basePath: string,
  currentParamsObj: PaginationControlsProps['searchParams'],
  targetPage: number
): string {
  const newParams = new URLSearchParams()
  // Rebuild params, preserving existing ones
  if (currentParamsObj.q) newParams.set('q', currentParamsObj.q)
  if (currentParamsObj.sort) newParams.set('sort', currentParamsObj.sort)
  if (currentParamsObj.sortOrder) newParams.set('sortOrder', currentParamsObj.sortOrder)
  if (currentParamsObj.limit) newParams.set('limit', currentParamsObj.limit)
  if (currentParamsObj._owner) newParams.set('_owner', currentParamsObj._owner)
  if (currentParamsObj._bookings) newParams.set('_bookings', currentParamsObj._bookings)
  newParams.set('page', String(targetPage))
  return `${basePath}?${newParams.toString()}`
}

export default function PaginationControls({ metaData, searchParams }: PaginationControlsProps) {
  if (!metaData || (!metaData.previousPage && !metaData.nextPage)) {
    return null
  }

  return (
    <nav aria-label='Venue navigation' className='d-flex justify-content-center mt-5'>
      <ul className='pagination'>
        {/* Previous Button */}
        <li className={`page-item ${!metaData.previousPage ? 'disabled' : ''}`}>
          {metaData.previousPage ? (
            <Link
              href={generatePageLink('/venues', searchParams, metaData.previousPage)}
              className='page-link'
              aria-label='Previous'
              scroll={true}
              prefetch={false}
            >
              <span aria-hidden='true'>&laquo;</span> Previous
            </Link>
          ) : (
            <span className='page-link' aria-hidden='true'>
              &laquo; Previous
            </span>
          )}
        </li>

        {/* Current Page Info */}
        <li className='page-item active' aria-current='page'>
          <span className='page-link'>
            Page {metaData.currentPage}
            {metaData.pageCount ? ` of ${metaData.pageCount}` : ''}
          </span>
        </li>

        {/* Next Button */}
        <li className={`page-item ${!metaData.nextPage ? 'disabled' : ''}`}>
          {metaData.nextPage ? (
            <Link
              href={generatePageLink('/venues', searchParams, metaData.nextPage)}
              className='page-link'
              aria-label='Next'
              scroll={true}
              prefetch={false}
            >
              Next <span aria-hidden='true'>&raquo;</span>
            </Link>
          ) : (
            <span className='page-link' aria-hidden='true'>
              Next &raquo;
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}
