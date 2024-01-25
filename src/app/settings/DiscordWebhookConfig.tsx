'use client'

import { useState } from 'react'
import Button from '@/components/button/Button'
import XIcon from '@/components/icon/XIcon'
import CheckIcon from '@/components/icon/CheckIcon'
import EditIcon from '@/components/icon/EditIcon'

interface DiscordWebhookConfigProps {
  configured: boolean
  onOk: (webhookUrl: string) => void
}

export default function DiscordWebhookConfig ({ configured, onOk }: DiscordWebhookConfigProps): React.ReactNode {
  const [editing, setEditing] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState('')

  return (
    <>
      <label htmlFor={'webhook'}>Webhook URL:&nbsp;</label>
      {
        ((): React.ReactNode => {
          if (editing) {
            return (
              <>
                <input id={'label'} type='text' placeholder={'Webhook URL'} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setWebhookUrl(e.target.value) }}/>
                <Button mode={'info'} label={<XIcon height={'12px'} width={'12px'}/>} onClick={handleEditCancelClicked}/>
                <Button mode={'info'} label={<CheckIcon height={'12px'} width={'12px'}/>} onClick={handleEditOkClicked}/>
              </>
            )
          } else {
            if (configured) {
              return (
                <>
                  Configured<a onClick={handleEditClicked} href={'#'}>&nbsp;<EditIcon height={'12px'} width={'12px'}/>&nbsp;Edit</a>
                </>
              )
            } else {
              return (
                <>
                  Unconfigured<a onClick={handleEditClicked} href={'#'}>&nbsp;<EditIcon height={'12px'} width={'12px'}/>&nbsp;Edit</a>
                </>
              )
            }
          }
        })()
      }
    </>
  )

  function handleEditClicked (e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault()
    setWebhookUrl('')
    setEditing(true)
  }

  function handleEditCancelClicked (): void {
    setEditing(false)
  }

  function handleEditOkClicked (): void {
    setEditing(false)
    onOk(webhookUrl)
  }
}
