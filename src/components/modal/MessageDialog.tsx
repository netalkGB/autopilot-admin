import styles from '@/components/modal/dialog.module.css'
import baseStyles from '@/components/modal/basemodal.module.css'
import Button from '@/components/button/Button'
import React, { type ForwardedRef, forwardRef, useImperativeHandle } from 'react'
import BaseDialog from '@/components/modal/BaseDialog'

export type MessageDialogType = 'confirm' | 'alert'

export type MessageDialogButton = 'ok' | 'cancel'

export interface MessageDialogChildComponentMethods {
  open: () => void
  close: () => void
}

interface MessageDialogProps {
  type?: MessageDialogType
  message: string
  onButtonClick: (button: MessageDialogButton) => void
}

const MessageDialog = forwardRef((props: MessageDialogProps, ref: ForwardedRef<MessageDialogChildComponentMethods>) => {
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
  return isOpen ? MessageDialogComponent(props) : (<></>)
})

function MessageDialogComponent ({ message, type = 'alert', onButtonClick }: MessageDialogProps): React.ReactNode {
  return (
    <div>
      <BaseDialog onClickOutside={() => {}}>
        <div className={`${styles.dialog} ${baseStyles.corner}`}>
          <div className={styles.message}>
            {message}
          </div>
          <div className={styles.buttonAreaContainer}>
            {createButtonArea(type)}
          </div>
        </div>
      </BaseDialog>
    </div>
  )

  function createButtonArea (type?: MessageDialogType): React.ReactNode {
    if (type === 'confirm') {
      return (
        <div className={styles.buttonArea}>
          <div><Button mode={'info'} label={'OK'} fontSize={'12px'} onClick={() => { handleButtonClick('ok') }}/></div>
          <div><Button mode={'info'} label={'Cancel'} fontSize={'12px'} onClick={() => { handleButtonClick('cancel') }}/></div>
        </div>
      )
    } else {
      return (
        <div>
          <Button mode={'info'} label={'OK'} fontSize={'12px'} onClick={() => {
            handleButtonClick('ok')
          }}/>
        </div>
      )
    }
  }

  function handleButtonClick (button: MessageDialogButton): void {
    onButtonClick(button)
  }
}

MessageDialog.displayName = 'MessageDialog'
export default MessageDialog
