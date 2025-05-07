import styles from './AvatarSkeleton.module.scss'

export default function AvatarSkeleton() {
  return <div className={styles.skeleton} aria-label='Loading avatar' />
}
