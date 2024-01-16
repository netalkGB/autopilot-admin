'use client'

import { createPortal } from 'react-dom'
import { type ReactPortal } from 'react'

const ModalPortal = ({ children }: { children: React.ReactNode }): ReactPortal | null => {
  if (typeof document === 'undefined') {
    return null
  }
  const el = document?.getElementById('modal')
  if (el === null) {
    return null
  }
  return createPortal(children, el)
}

export default ModalPortal
