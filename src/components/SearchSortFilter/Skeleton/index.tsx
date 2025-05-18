import React from 'react'
import styles from '../SearchSortFilter.module.scss'

const HeroSectionSkeleton = () => {
  return (
    <section
      className={`${styles.heroSection} bg-primary rounded-3 shadow-lg border container-fluid text-center mb-5 placeholder-glow`}
      aria-hidden='true'
    >
      <div className={styles.searchSortControls}>
        <div className={`${styles.searchInput || ''} form-floating mb-3 mb-md-0`}>
          <div className='form-control form-control-lg placeholder shadow-sm'></div>
        </div>

        <div className='d-flex flex-column flex-sm-row gap-2 align-items-center'>
          <div className={`${styles.sortOptions || ''} d-flex gap-2`}>
            <div className='form-select placeholder shadow-sm'></div>
            <div className='form-select placeholder shadow-sm'></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSectionSkeleton
