'use client'

import styles from '@/components/button/button.module.css'
import { type CSSProperties } from 'react'

interface ButtonProps {
  mode: 'normal' | 'danger' | 'success' | 'warning' | 'info'
  label: React.ReactNode
  onClick?: () => void
  fontSize?: string
  disabled?: boolean
}
export default function Button ({ mode = 'normal', label = '', onClick = () => {}, fontSize, disabled = false }: ButtonProps): React.ReactNode {
  let style: CSSProperties = {}
  if (fontSize !== undefined) {
    style = { fontSize }
  }
  return (
    <>
      <button onClick={() => { onClick() }} style={style} className={`${styles.common} ${styles[mode]}`} disabled={disabled} >{ label }</button>
    </>
  )
}
