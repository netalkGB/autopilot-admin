'use client'

import styles from '@/components/modal/basemodal.module.css'

interface ModalProps {
  children?: React.ReactNode
  onClickOutside?: () => void
}
export default function BaseModal ({ children = (<></>), onClickOutside = (): void => {} }: ModalProps): React.ReactNode {
  return (
    <div className={styles.container} onClick={onClickOutside}>
      <div className={`${styles.modal} ${styles.corner}`} onClick={(event) => { event.stopPropagation() }}>
        {children}
      </div>
    </div>
  )
}
