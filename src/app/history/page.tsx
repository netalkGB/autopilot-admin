'use client'

import 'modern-normalize'
import '../global.css'
import styles from './page.module.css'
import RotateIcon from '@/components/icon/RotateIcon'
import MessageDialog, {
  type MessageDialogButton,
  type MessageDialogChildComponentMethods
} from '@/components/modal/MessageDialog'
import Loading from '@/components/modal/Loading'
import { useEffect, useRef, useState } from 'react'
import type History from '@/app/types/History'
import type { History as History2 } from '@/api/types/History'
import type { Schedule } from '@/api/types/Schedule'

export default function Page (): React.ReactNode {
  const errorDialogRef = useRef<MessageDialogChildComponentMethods>(null)
  const loadingRef = useRef<MessageDialogChildComponentMethods>(null)

  const [histories, setHistories] = useState<History[]>([])

  async function init (): Promise<void> {
    setHistories([])

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
    const histories = await historyResponse.json() as History2[]

    const reverseHistories = histories.reverse()

    let uiHistories: History[] = []

    const nameMap = new Map<string, string>()
    schedules.forEach((schedule) => {
      nameMap.set(schedule.id, schedule.name)
    })
    reverseHistories.forEach((history) => {
      const name = nameMap.get(history.scheduleId) ?? history.scheduleId
      uiHistories = [...uiHistories, {
        name,
        date: history.date,
        result: history.result
      }]
    })

    setHistories(uiHistories)
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
      <h2>History</h2>
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
            {
              histories.map((history, index) => {
                return (
                  <tr key={index}>
                    <td>{history.name}</td>
                    <td>{history.date.toString()}</td>
                    <td><span className={history.result === 'success' ? styles.success : styles.failed}>{history.result === 'success' ? 'Success' : 'Failed'}</span></td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
      </div>
      <MessageDialog ref={errorDialogRef} message={'Error'} type={'alert'}
                     onButtonClick={(button: MessageDialogButton) => {
                       errorDialogRef.current?.close()
                     }}/>
      <Loading ref={loadingRef}/>
    </>
  )
}
