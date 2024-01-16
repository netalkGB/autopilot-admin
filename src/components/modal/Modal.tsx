import BaseModal from '@/components/modal/BaseModal'
import styles from '@/components/modal/modal.module.css'
import baseStyles from '@/components/modal/basemodal.module.css'
import React, { type ForwardedRef, forwardRef, useImperativeHandle } from 'react'
import XIcon from '@/components/icon/XIcon'

export interface ModalChildComponentMethods {
  open: () => void
  close: () => void
}

interface ModalProps {
  title?: string
  children?: React.ReactNode
  onClose: () => void
}

const Modal = forwardRef((props: ModalProps, ref: ForwardedRef<ModalChildComponentMethods>) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = (): void => {
    setIsOpen(true)
  }

  const close = (): void => {
    setIsOpen(false)
  }

  useImperativeHandle(ref, () => ({
    open,
    close
  }))
  return isOpen ? ModalComponent(props) : (<></>)
})

function ModalComponent ({ title, onClose, children }: ModalProps): React.ReactNode {
  return (
    <div>
      <BaseModal onClickOutside={() => { onClose() }}>
        <div className={`${styles.modal} ${baseStyles.corner}`}>
          <div className={styles.titleArea}>
            <div className={styles.titleDispArea}>
              <h2>{title}</h2>
            </div>
            <div className={styles.modalControlArea}>
              <div className={styles.button} onClick={() => {
                onClose()
              }}>
                <XIcon height={'20px'} width={'20px'} />
              </div>
            </div>
          </div>
          <hr/>
          <div className={styles.contentArea}>
            {children}
          </div>
        </div>
      </BaseModal>
    </div>
  )
}

Modal.displayName = 'Modal'
export default Modal
