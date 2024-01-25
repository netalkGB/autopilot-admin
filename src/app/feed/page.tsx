'use client'

import 'modern-normalize'
import '../global.css'
import PlusIcon from '@/components/icon/PlusIcon'
import styles from './page.module.css'
import XIcon from '@/components/icon/XIcon'
import RotateIcon from '@/components/icon/RotateIcon'
import { useRef } from 'react'
import type Feed from '@/app/feed/Feed'
import FeedModalContainer, { type FeedModalContainerChildComponentMethods } from '@/app/feed/modal/FeedModalContainer'

const feeds: Feed[] = [
  {
    id: '1',
    name: 'test1',
    url: 'https://note.com/shirahota/rss',
    schedule: 'every30minutes'
  },
  {
    id: '2',
    name: 'test2',
    url: 'https://note.com/netalkgb/rss',
    schedule: 'every30minutes'
  },
  {
    id: '3',
    name: 'test3',
    url: 'https://note.com/shirahota/rss',
    schedule: 'every30minutes'
  },
  {
    id: '4',
    name: 'test4',
    url: 'https://note.com/netalkgb/rss',
    schedule: 'every1hour'
  },
  {
    id: '5',
    name: 'test5',
    url: 'https://note.com/shirahota/rss',
    schedule: 'every1hour'
  },
  {
    id: '6',
    name: 'test6',
    url: 'https://note.com/netalkgb/rss',
    schedule: 'every1hour'
  }
]

export default function Page (): React.ReactNode {
  const modalRef = useRef<FeedModalContainerChildComponentMethods>(null)

  return (
    <>
      <h2>Feed</h2>
      <hr/>
      <div className={styles.feedList}>
        <div className={styles.feedListAction}>
          <div>
            <ul>
              <li><a href='#'><RotateIcon width={'14px'} height={'14px'}/>Reload</a></li>
              <li><a href='#' onClick={
                (e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  modalRef.current?.open({ title: 'New Feed', feed: null })
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
              feeds.map((feed, index) => {
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
                  modalRef.current?.open({ title: 'Edit Feed', feed })
                }
              })
            }
            </tbody>
          </table>
        </div>
      </div>
      <FeedModalContainer onClose={ (data) => { console.log(data); modalRef.current?.close() } } onOk={ (data) => { console.log(data); modalRef.current?.close() } } onCancel={ (data) => { console.log(data); modalRef.current?.close() } } ref={modalRef} />
    </>
  )
}
