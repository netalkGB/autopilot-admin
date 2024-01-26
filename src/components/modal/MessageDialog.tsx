import styles from '@/components/modal/dialog.module.css'
import baseStyles from '@/components/modal/basemodal.module.css'
import Button from '@/components/button/Button'
import React, { type ForwardedRef, forwardRef, useImperativeHandle } from 'react'
import BaseDialog from '@/components/modal/BaseDialog'

export type MessageDialogType = 'confirm' | 'alert'

export type MessageDialogButton = 'ok' | 'cancel'

export interface MessageDialogChildComponentMethods {
  open: (data?: any) => void
  close: () => void
}

interface MessageDialogProps {
  type?: MessageDialogType
  message: React.ReactNode
  data?: any
  onButtonClick: (button: MessageDialogButton, data?: any) => void
}

const MessageDialog = forwardRef((props: MessageDialogProps, ref: ForwardedRef<MessageDialogChildComponentMethods>) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [data, setData] = React.useState<any>(props)
  const open = (data = undefined): void => {
    if (data !== undefined) {
      setData(data)
    }
    setIsOpen(true)
  }

  const close = (): void => {
    setIsOpen(false)
  }

  useImperativeHandle(ref, () => ({
    open,
    close
  }))
  return isOpen ? MessageDialogComponent({ ...props, data }) : (<></>)
})

function MessageDialogComponent ({ message, type = 'alert', onButtonClick, data = undefined }: MessageDialogProps): React.ReactNode {
  return (
    <div>
      <BaseDialog onClickOutside={() => {}}>
        <div className={`${styles.dialog} ${baseStyles.corner}`}>
          <div className={styles.message}>
            {message}
          </div>
          <div className={styles.buttonAreaContainer}>
            {createButtonArea(type, data)}
          </div>
        </div>
      </BaseDialog>
    </div>
  )

  function createButtonArea (type?: MessageDialogType, data?: any): React.ReactNode {
    if (type === 'confirm') {
      return (
        <div className={styles.buttonArea}>
          <div><Button mode={'info'} label={'OK'} fontSize={'12px'} onClick={() => { handleButtonClick('ok', data) }}/></div>
          <div><Button mode={'info'} label={'Cancel'} fontSize={'12px'} onClick={() => { handleButtonClick('cancel', data) }}/></div>
        </div>
      )
    } else {
      return (
        <div>
          <Button mode={'info'} label={'OK'} fontSize={'12px'} onClick={() => {
            handleButtonClick('ok', data)
          }}/>
        </div>
      )
    }
  }

  function handleButtonClick (button: MessageDialogButton, data: any): void {
    onButtonClick(button, data)
  }
}

MessageDialog.displayName = 'MessageDialog'
export default MessageDialog
