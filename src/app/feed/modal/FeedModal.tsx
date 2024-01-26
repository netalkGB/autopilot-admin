import type { Schedule } from '@/app/types/Schedule'
import Button from '@/components/button/Button'
import { type ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
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

  const [isActiveOk, setIsActiveOk] = useState<boolean>(false)

  function validate (): void {
    setIsActiveOk(
      nameRef.current?.value !== '' &&
      (urlRef.current?.value !== '' && (urlRef.current?.value ?? '').startsWith('https://')) &&
      scheduleRef.current?.value !== ''
    )
  }

  function onInput (): void {
    validate()
  }

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

  useEffect(() => {
    validate()
  }, [])

  return (
    <div>
      <div className={styles.item}>
        <label htmlFor='name'>Name:&nbsp;</label>
        <input ref={nameRef} id='name' type='text' defaultValue={activeFeed?.name} onInput={(e) => { onInput() }}/>
      </div>
      <div className={styles.item}>
        <label htmlFor='url'>URL:&nbsp;</label>
        <input ref={urlRef} id='url' type='text' defaultValue={activeFeed?.url} disabled={activeFeed?.id !== undefined} onInput={(e) => { onInput() }}/>
      </div>
      <div className={styles.item}>
        <label htmlFor='schedule'>Interval:&nbsp;</label>
        <select ref={scheduleRef} id='schedule' defaultValue={activeFeed?.schedule} onChange={(e) => { onInput() }}>
          <option value='every30minutes'>30m</option>
          <option value='every1hour'>1h</option>
        </select>
      </div>
      <div className={styles.buttonArea}>
        <Button disabled={!isActiveOk} mode={'normal'} label={'Save'} onClick={() => {
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
