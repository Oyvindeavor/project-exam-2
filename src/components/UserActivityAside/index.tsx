import { Profile } from '@/types/NoroffApi/profileTypes'
import { Briefcase, Building } from 'lucide-react'
import styles from './UserActivity.module.scss'

interface UserActivityAsideProps {
  profile: Profile
  isManager: boolean
}

export default function UserActivityAside({ profile, isManager }: UserActivityAsideProps) {
  return (
    <aside className='col-12 col-lg-5' aria-labelledby='userActivityHeading'>
      <div className={`card shadow-sm h-100`}>
        <div className='card-header bg-light border-bottom'>
          <h3 id='userActivityHeading' className='mb-0 h5 text-dark fw-semibold'>
            Your Activity
          </h3>
        </div>
        <div className='card-body p-4'>
          <div className='d-flex align-items-center mb-3 pb-3 border-bottom'>
            <div
              className={`${styles.iconDiv} me-3 p-2 d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle`}
              aria-hidden='true'
            >
              <Briefcase />
            </div>
            <div>
              <h4 className='h6 mb-0 text-dark fw-semibold'>Bookings</h4>
              <p className='fw-bold text-dark mb-0'>{profile._count.bookings}</p>
            </div>
          </div>

          {isManager && (
            <div className='d-flex align-items-center'>
              <div
                className={`${styles.iconDiv} me-3 p-2 d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle`}
                aria-hidden='true'
              >
                <Building />
              </div>
              <div>
                <h4 className='h6 mb-0 text-dark fw-semibold'>Venues Managed</h4>
                <p className='fw-bold text-dark mb-0'>{profile._count.venues}</p>
              </div>
            </div>
          )}
          {!isManager && profile._count.bookings === 0 && (
            <div className='text-center text-muted p-3'>
              <p className='mb-0'>No activity to show yet.</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
