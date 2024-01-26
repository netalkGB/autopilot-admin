'use client'

import 'modern-normalize'
import '../global.css'
import PlusIcon from '@/components/icon/PlusIcon'
import styles from './page.module.css'
import XIcon from '@/components/icon/XIcon'
import RotateIcon from '@/components/icon/RotateIcon'
import { type RefObject, useEffect, useRef, useState } from 'react'
import FeedModalContainer, {
  type FeedModalContainerChildComponentMethods,
  type FeedModalData
} from '@/app/feed/modal/FeedModalContainer'
import MessageDialog, {
  type MessageDialogButton,
  type MessageDialogChildComponentMethods
} from '@/components/modal/MessageDialog'
import Loading from '@/components/modal/Loading'
import type { Schedule } from '@/api/types/Schedule'
import type { Schedule as ScheduleUi } from '@/app/types/Schedule'

export default function Page (): React.ReactNode {
  const modalRef = useRef<FeedModalContainerChildComponentMethods>(null)
  const errorDialogRef = useRef<MessageDialogChildComponentMethods>(null)
  const editingConfirmDialogRef = useRef<MessageDialogChildComponentMethods>(null)
  const loadingRef = useRef<MessageDialogChildComponentMethods>(null)

  const [schedules, setSchedules] = useState<ScheduleUi[]>([])

  async function init (): Promise<void> {
    loadingRef.current?.open()
    const extendResponse = await fetch('/api/extend', {
      method: 'POST',
      headers: {}
    })
    if (extendResponse.status === 401) {
      location.href = '/api/login'
      return
    }
    if (!extendResponse.ok) {
      throw new Error('API error')
    }
    const scheduleResponse = await fetch('/api/autopilot/schedule', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!scheduleResponse.ok) {
      throw new Error('API error')
    }
    const uiSchedules = (await scheduleResponse.json() as Schedule[]).map((schedule) => ({
      id: schedule.id,
      name: schedule.name,
      url: schedule.url,
      schedule: schedule.schedule
    }))
    setSchedules(uiSchedules)
  }

  useEffect(() => {
    init().then(() => {
      loadingRef.current?.close()
    }).catch((e) => {
      loadingRef.current?.close()
      errorDialogRef.current?.open()
    })
  }, [])

  return (
    <>
      <h2>Feed</h2>
      <hr/>
      <div className={styles.feedList}>
        <div className={styles.feedListAction}>
          <div>
            <ul>
              <li><a href='#' onClick={
                (e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  init().then(() => {
                    loadingRef.current?.close()
                  }).catch((e) => {
                    loadingRef.current?.close()
                    errorDialogRef.current?.open()
                  })
                }
              }><RotateIcon width={'14px'} height={'14px'}/>Reload</a></li>
              <li><a href='#' onClick={
                (e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  modalRef.current?.open({ title: 'New Schedule', feed: null })
                }
              }><PlusIcon width={'14px'} height={'14px'}/>Add</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.feedTableContainer}>
          <table className={styles.feedTable}>
            <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Interval</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
              schedules.map((feed, index) => {
                return (
                  <tr key={index}>
                    <td><a href='#' onClick={onOpenDialog}>{feed.name}</a></td>
                    <td>{feed.url}</td>
                    <td>{feed.schedule === 'every30minutes' ? '30m' : '1h'}</td>
                    <td><a href='#' className={styles.delete}><XIcon width={'14px'} height={'14px'}/>Delete</a></td>
                  </tr>
                )
                function onOpenDialog (e: React.MouseEvent<HTMLAnchorElement>): void {
                  e.preventDefault()
                  modalRef.current?.open({ title: 'Edit Schedule', feed })
                }
              })
            }
            </tbody>
          </table>
        </div>
      </div>
      <FeedModalContainer onClose={ (originalData: FeedModalData, updatedData: FeedModalData) => { console.log(updatedData); console.log(originalData); modalRef.current?.close() } } onOk={ (originalData: FeedModalData, updatedData: FeedModalData) => { onModalOk(originalData, updatedData) } } onCancel={ (originalData: FeedModalData, updatedData: FeedModalData) => { console.log(updatedData); console.log(originalData); modalRef.current?.close() } } ref={modalRef} />

      <MessageDialog ref={errorDialogRef} message={'Error'} type={'alert'}
                     onButtonClick={(button: MessageDialogButton) => {
                       errorDialogRef.current?.close()
                     }}/>
      <MessageDialog ref={editingConfirmDialogRef} message={'Your current input will be discarded. Are you sure you want to proceed?'} type={'confirm'}
                     onButtonClick={(button: MessageDialogButton) => {
                       editingConfirmDialogRef.current?.close()
                     }}/>
      <Loading ref={loadingRef}/>
    </>
  )
  function onModalOk (originalData: FeedModalData | null, updatedData: FeedModalData): void {
    if (checkUpdate(originalData?.feed ?? null, updatedData.feed)) {
      console.log('updated')
    } else {
      console.log('not updated')
    }
    modalRef.current?.close()
  }
}

function checkUpdate (org: ScheduleUi | null, updated: ScheduleUi | null): boolean {
  if (org === null) {
    return true
  }
  if (org.name !== updated?.name) {
    return true
  }
  if (org.url !== updated?.url) {
    return true
  }
  if (org.schedule !== updated?.schedule) {
    return true
  }
  return false
}
