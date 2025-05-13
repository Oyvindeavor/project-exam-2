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
    <div className='card border-0 shadow-sm mb-4'>
      <div className='card-body d-flex align-items-center'>
        {owner ? (
          <>
            <div className='flex-shrink-0'>
              {owner.avatar?.url ? (
                <img
                  src={owner.avatar.url}
                  alt={owner.avatar.alt || `${owner.name}'s avatar`}
                  className={`${styles.hostAvatar} rounded-circle border`}
                />
              ) : (
                <div className='bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white'>
                  <User size={24} />
                </div>
              )}
            </div>
            <div className='flex-grow-1 ms-3'>
              <h5 className='mb-0'>Hosted by {owner.name}</h5>
            </div>
          </>
        ) : (
          <p className='mb-0 text-muted'>Host information not available</p>
        )}
      </div>
    </div>
  )
}
