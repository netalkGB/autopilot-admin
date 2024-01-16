import BaseModal from '@/components/modal/BaseModal'
import baseStyles from '@/components/modal/basemodal.module.css'
import React, { type ForwardedRef, forwardRef, useImperativeHandle } from 'react'

export interface LoadingChildComponentMethods {
  open: () => void
  close: () => void
}

const Loading = forwardRef((_props, ref: ForwardedRef<LoadingChildComponentMethods>) => {
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
  return isOpen ? LoadingComponent() : (<></>)
})

function LoadingComponent (): React.ReactNode {
  return (
    <div>
      <BaseModal onClickOutside={() => {}}>
        <div style={{ backgroundColor: '#ffffff', padding: '8px' }} className={baseStyles.corner}>
          Loading...
        </div>
      </BaseModal>
    </div>
  )
}

Loading.displayName = 'Loading'
export default Loading
