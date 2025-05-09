import styles from './VenueHostProfile.module.scss'
import { User } from 'lucide-react'

interface Owner {
  name: string
  avatar?: { url: string; alt: string }
}

interface VenueHostProfileProps {
  owner: Owner | undefined
}

export default function VenueHostProfile({ owner }: VenueHostProfileProps) {
  return (
    <div className='mb-4 mt-4 shadow-sm'>
      <div className='card-body'>
        {owner ? (
          <div className='d-flex align-items-center'>
            <div className='flex-shrink-0'>
              {owner.avatar?.url ? (
                <img
                  src={owner.avatar.url}
                  alt={`${owner.avatar.alt} User Avatar`}
                  className={`${styles.hostAvatar} rounded-circle`}
                />
              ) : (
                <div className='bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white'>
                  <User className='fs-4' />
                </div>
              )}
            </div>
            <div className='flex-grow-1 ms-3'>
              <h4 className='h6 mb-1'>{owner.name}</h4>
            </div>
          </div>
        ) : (
          <p className='mb-0 text-muted'>Host information not available</p>
        )}
      </div>
    </div>
  )
}
