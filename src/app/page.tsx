'use client'

import 'modern-normalize'
import './global.css'
import { useRef } from 'react'
import MessageDialog, { type MessageDialogChildComponentMethods, type MessageDialogButton } from '@/components/modal/MessageDialog'
import PlusIcon from '@/components/icon/PlusIcon'
import Button from '@/components/button/Button'
import XIcon from '@/components/icon/XIcon'
import CheckIcon from '@/components/icon/CheckIcon'
import EditIcon from '@/components/icon/EditIcon'
import Modal, { type ModalChildComponentMethods } from '@/components/modal/Modal'
import Loading from '@/components/modal/Loading'
import styles from './index.module.css'
import RotateIcon from '@/components/icon/RotateIcon'

export default function Home (): React.ReactNode {
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
                <li><a href='#'><RotateIcon width={'14px'} height={'14px'}/>Reload</a></li>
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
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.failed}>Failed</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ContentChild (): React.ReactNode {
  const messageDialogRef = useRef<MessageDialogChildComponentMethods>(null)
  const messageDialogRef2 = useRef<MessageDialogChildComponentMethods>(null)
  const modalRef = useRef<ModalChildComponentMethods>(null)
  const loadingRef = useRef<MessageDialogChildComponentMethods>(null)
  return (
    <>
      <h2>Title</h2>
      <hr/>
      <h3>Title</h3>
      <hr/>
      <h4>Title</h4>
      <hr/>
      <h5>Title</h5>
      <hr/>
      <h6>Title</h6>
      <hr/>
      <p>test<br/><a href='#'>Link</a></p>
      <a href='#'><PlusIcon/>Add</a>

      <table>
        <thead>
        <tr>
          <th>Column1</th>
          <th>Column2</th>
          <th>Column3</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>test</td>
          <td>test</td>
          <td>test</td>
        </tr>
        <tr>
          <td>test</td>
          <td>test</td>
          <td>test</td>
        </tr>
        </tbody>
      </table>
      <p>
        <button>Button</button>
        <input type='button' value={'test'}/>
      </p>
      <p>
        <label htmlFor={'label'}>label:</label>
        <input id={'label'} type='text' placeholder={'textbox1'}/>
      </p>
      <Button mode={'normal'} label={'normal'} onClick={() => {
        messageDialogRef.current?.open()
      }}/>
      <Button mode={'danger'} label={'danger'} onClick={() => {
        messageDialogRef2.current?.open()
      }}/>
      <Button mode={'success'} label={'success'} onClick={() => {
        modalRef.current?.open()
      }}/>
      <Button mode={'warning'} label={'warning'} onClick={() => {
        loadingRef.current?.open()
      }}/>
      <Button mode={'info'} label={'info'}/>
      <p>
        <label htmlFor={'select'}>select:</label>
        <select id={'select'}>
          <option value={'option1'}>option1</option>
          <option value={'option2'}>option2</option>
          <option value={'option3'}>option3</option>
        </select>
      </p>
      <p>
        <Button mode={'info'} label={<XIcon height={'12px'} width={'12px'}/>}/>
        <Button mode={'info'} label={<CheckIcon height={'12px'} width={'12px'}/>}/>
        <a href={'#'}><EditIcon/>&nbsp;Edit</a>
      </p>
      <p>
        <input type={'checkbox'} id={'checkbox1'}/>
        <label htmlFor={'checkbox1'}>checkbox1</label>
      </p>
      <p>
        <input type={'radio'} id={'radio1'} name={'radio'}/>
        <label htmlFor={'radio1'}>radio1</label>
        <input type={'radio'} id={'radio2'} name={'radio'}/>
        <label htmlFor={'radio2'}>radio2</label>
      </p>
      <MessageDialog ref={messageDialogRef} message={'test'} type={'alert'}
                     onButtonClick={(button: MessageDialogButton) => {
                       console.log(button)
                       messageDialogRef.current?.close()
                     }}/>
      <MessageDialog ref={messageDialogRef2} message={'test'} type={'confirm'}
                     onButtonClick={(button: MessageDialogButton) => {
                       console.log(button)
                       messageDialogRef2.current?.close()
                     }}/>
      <Modal ref={modalRef} onClose={() => {
        console.log('modal')
        modalRef.current?.close()
      }} title={'test'}>test</Modal>
      <Loading ref={loadingRef}/>
    </>
  )
}
