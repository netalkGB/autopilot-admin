'use client'

import 'modern-normalize'
import './global.css'
import styles from './index.module.css'
import RotateIcon from '@/components/icon/RotateIcon'
import { useEffect, useRef, useState } from 'react'
import MessageDialog, {
  type MessageDialogButton,
  type MessageDialogChildComponentMethods
} from '@/components/modal/MessageDialog'
import type { Schedule } from '@/api/types/Schedule'
import Loading from '@/components/modal/Loading'
import type { History } from '@/api/types/History'
import type Status from '@/app/types/Status'

export default function Home (): React.ReactNode {
  const apiErrorDialogRef = useRef<MessageDialogChildComponentMethods>(null)
  const errorDialogRef = useRef<MessageDialogChildComponentMethods>(null)
  const loadingRef = useRef<MessageDialogChildComponentMethods>(null)

  const [statuses, setStatuses] = useState<Status[]>([])

  async function init (): Promise<void> {
    setStatuses([])

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

    const [scheduleResponse, historyResponse] = await Promise.all([
      fetch('/api/autopilot/schedule', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      fetch('/api/autopilot/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    ])
    if (!scheduleResponse.ok) {
      throw new Error('API error')
    }
    if (!historyResponse.ok) {
      throw new Error('API error')
    }
    const schedules = await scheduleResponse.json() as Schedule[]
    const histories = await historyResponse.json() as History[]

    const reverseHistories = histories.reverse()

    let statuses: Status[] = []

    for (const schedule of schedules) {
      const history = reverseHistories.find((history) => history.scheduleId === schedule.id)
      if (history === undefined) continue
      const status: Status = {
        name: schedule.name,
        date: history?.date,
        result: history?.result
      }
      statuses = [...statuses, status]
    }
    setStatuses(statuses)
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
       <h2>Home</h2>
       <hr/>

       <h3>Recent status</h3>
       <hr/>
       <div className={styles.historyList}>
        <div className={styles.historyTableContainer}>
          <div className={styles.historyListAction}>
            <div>
              <ul>
                <li><a href='#' onClick={(e: React.MouseEvent<HTMLAnchorElement>): void => {
                  e.preventDefault()
                  init().then(() => {
                    loadingRef.current?.close()
                  }).catch((e) => {
                    loadingRef.current?.close()
                    errorDialogRef.current?.open()
                  })
                }}><RotateIcon width={'14px'} height={'14px'}/>Reload</a></li>
              </ul>
            </div>
          </div>
          <table className={styles.historyTable}>
            <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Result</th>

            </tr>
            </thead>
            <tbody>
            {statuses.map((status: Status, index: number) => {
              return (
                <tr key={index}>
                  <td>{status.name}</td>
                  <td>{status.date.toString()}</td>
                  <td>{status.result === 'success'
                    ? <span className={styles.success}>Success</span>
                    : <span className={styles.failed}>Failed</span>}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </div>
      <MessageDialog ref={apiErrorDialogRef} message={'API error'} type={'alert'}
                     onButtonClick={(button: MessageDialogButton) => {
                       apiErrorDialogRef.current?.close()
                     }}/>
      <MessageDialog ref={errorDialogRef} message={'Error'} type={'alert'}
                     onButtonClick={(button: MessageDialogButton) => {
                       errorDialogRef.current?.close()
                     }}/>
      <Loading ref={loadingRef}/>
    </>
  )
}
