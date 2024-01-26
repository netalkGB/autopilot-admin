'use client'

import 'modern-normalize'
import '../global.css'
import PlusIcon from '@/components/icon/PlusIcon'
import styles from './page.module.css'
import XIcon from '@/components/icon/XIcon'
import RotateIcon from '@/components/icon/RotateIcon'
import { useEffect, useRef, useState } from 'react'
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
  const deleteConfirmDialogRef = useRef<MessageDialogChildComponentMethods>(null)
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
                  <tr key={feed.id}>
                    <td><a href='#' onClick={onOpenDialog}>{feed.name}</a></td>
                    <td>{feed.url}</td>
                    <td>{feed.schedule === 'every30minutes' ? '30m' : '1h'}</td>
                    <td><a href='#' onClick={onDelete} className={styles.delete}><XIcon width={'14px'} height={'14px'}/>Delete</a></td>
                  </tr>
                )
                function onOpenDialog (e: React.MouseEvent<HTMLAnchorElement>): void {
                  e.preventDefault()
                  modalRef.current?.open({ title: 'Edit Schedule', feed })
                }
                function onDelete (e: React.MouseEvent<HTMLAnchorElement>): void {
                  e.preventDefault()
                  deleteConfirmDialogRef.current?.open(feed)
                }
              })
            }
            </tbody>
          </table>
        </div>
      </div>
      <FeedModalContainer onClose={ onModalClose } onOk={ onModalOk } onCancel={ onModalCancel } ref={modalRef} />

      <MessageDialog ref={errorDialogRef} message={'Error'} type={'alert'}
                     onButtonClick={(button: MessageDialogButton) => {
                       errorDialogRef.current?.close()
                     }}/>
      <MessageDialog ref={editingConfirmDialogRef} message={<>Your current input will be discarded.<br />Are you sure you want to proceed?</>} type={'confirm'}
                     onButtonClick={(button: MessageDialogButton) => {
                       if (button === 'ok') {
                         modalRef.current?.close()
                         editingConfirmDialogRef.current?.close()
                       } else {
                         editingConfirmDialogRef.current?.close()
                       }
                     }}/>
      <MessageDialog ref={deleteConfirmDialogRef} message={<>Are you sure?</>} type={'confirm'}
                     onButtonClick={(button: MessageDialogButton, data) => {
                       if (button === 'ok') {
                         const feedUi = data as ScheduleUi
                         deleteFeedItem(feedUi).catch((e) => {
                           console.log(e)
                           errorDialogRef.current?.open()
                         }).finally(() => {
                           loadingRef.current?.close()
                           deleteConfirmDialogRef.current?.close()
                         })
                       } else {
                         deleteConfirmDialogRef.current?.close()
                       }
                     }}/>
      <Loading ref={loadingRef}/>
    </>
  )
  function onModalOk (originalData: FeedModalData | null, updatedData: FeedModalData): void {
    if (!checkUpdate(originalData?.feed ?? null, updatedData.feed)) {
      modalRef.current?.close()
      return
    }
    modalRef.current?.close()

    update().catch((e) => { errorDialogRef.current?.open() }).finally(() => { loadingRef.current?.close() })

    async function update (): Promise<void> {
      // extend request
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
      const isNew = originalData?.feed === null
      if (isNew) {
        // do post
        const response = await fetch('/api/autopilot/schedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData.feed)
        })
        if (!response.ok) {
          throw new Error('API error')
        }
      } else {
        // do put
        const response = await fetch('/api/autopilot/schedule', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData.feed)
        })
        if (!response.ok) {
          throw new Error('API error')
        }
      }

      await init()
    }
  }
  function onModalClose (originalData: FeedModalData | null, updatedData: FeedModalData): void {
    onModalCancel(originalData, updatedData)
  }

  function onModalCancel (originalData: FeedModalData | null, updatedData: FeedModalData): void {
    if (checkUpdate(originalData?.feed ?? null, updatedData.feed)) {
      editingConfirmDialogRef.current?.open()
    } else {
      modalRef.current?.close()
    }
  }

  async function deleteFeedItem (feed: ScheduleUi): Promise<void> {
    loadingRef.current?.open()
    // delete request
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
    const params = new URLSearchParams()
    params.append('id', feed.id ?? '')
    const response = await fetch(`/api/autopilot/schedule?${params.toString()}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('API error')
    }
    await init()
  }
}

function checkUpdate (org: ScheduleUi | null, updated: ScheduleUi | null): boolean {
  if (org === null) {
    if (updated?.name !== '') {
      return true
    }
    if (updated?.url !== '') {
      return true
    }
    if (updated?.schedule !== 'every30minutes') {
      return true
    }
    return false
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
