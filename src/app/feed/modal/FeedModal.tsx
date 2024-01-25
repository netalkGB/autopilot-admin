import type { Schedule } from '@/app/types/Schedule'
import Button from '@/components/button/Button'
import { type ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react'
import styles from './feedmodal.module.css'

export interface FeedModalChildComponentMethods {
  getForm: () => Schedule | null
}

export interface FeedModalProps {
  activeFeed: Schedule | null
  onOk: (feed: Schedule | null) => void
  onCancel: (feed: Schedule | null) => void
}

const FeedModal = forwardRef(({ activeFeed, onOk, onCancel }: FeedModalProps, ref: ForwardedRef<FeedModalChildComponentMethods>) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)
  const scheduleRef = useRef<HTMLSelectElement>(null)
  function createFeed (): Schedule | null {
    return {
      id: activeFeed?.id,
      name: nameRef.current?.value ?? '',
      url: urlRef.current?.value ?? '',
      schedule: scheduleRef.current?.value === 'every30minutes' ? 'every30minutes' : 'every1hour'
    }
  }

  useImperativeHandle(ref, () => ({
    getForm: createFeed
  }))

  return (
    <div>
      <div className={styles.item}>
        <label htmlFor='name'>Name:&nbsp;</label>
        <input ref={nameRef} id='name' type='text' defaultValue={activeFeed?.name}/>
      </div>
      <div className={styles.item}>
        <label htmlFor='url'>URL:&nbsp;</label>
        <input ref={urlRef} id='url' type='text' defaultValue={activeFeed?.url}/>
      </div>
      <div className={styles.item}>
        <label htmlFor='schedule'>Interval:&nbsp;</label>
        <select ref={scheduleRef} id='schedule' defaultValue={activeFeed?.schedule}>
          <option value='every30minutes'>30m</option>
          <option value='every1hour'>1h</option>
        </select>
      </div>
      <div className={styles.buttonArea}>
        <Button mode={'normal'} label={'Save'} onClick={() => {
          onOk(createFeed())
        }}/>
        <Button mode={'info'} label={'Cancel'} onClick={() => {
          onCancel(createFeed())
        }}/>
      </div>
    </div>
  )
})

FeedModal.displayName = 'FeedModal'

export default FeedModal
