'use client'

import 'modern-normalize'
import '../global.css'
import styles from './settings.module.css'
import DiscordWebhookConfig from '@/app/settings/DiscordWebhookConfig'
import { useEffect, useRef, useState } from 'react'
import MessageDialog, {
  type MessageDialogButton,
  type MessageDialogChildComponentMethods
} from '@/components/modal/MessageDialog'
import Loading from '@/components/modal/Loading'
import { type DiscordConfigStatus } from '@/api/types/DiscordConfigStatus'
import { type DiscordConfig as DiscordConfig2 } from '@/app/types/DiscordConfig'
import { type DiscordConfig } from '@/api/types/DiscordConfig'

export default function Page (): React.ReactNode {
  const errorDialogRef = useRef<MessageDialogChildComponentMethods>(null)
  const loadingRef = useRef<MessageDialogChildComponentMethods>(null)

  const [discordConfig, setDiscordConfig] = useState<DiscordConfig2 | null>(null)

  async function load (): Promise<void> {
    setDiscordConfig(null)

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

    const discordConfigResponse = await fetch('/api/autopilot/config/discord', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!discordConfigResponse.ok) {
      throw new Error('API error')
    }
    const discordConfig = await discordConfigResponse.json() as DiscordConfigStatus
    const discordConfigUi: DiscordConfig2 = {
      configured: discordConfig.configured
    }
    setDiscordConfig(discordConfigUi)
  }

  useEffect(() => {
    load().then(() => {
      loadingRef.current?.close()
    }).catch((e) => {
      loadingRef.current?.close()
      errorDialogRef.current?.open()
    })
  }, [])
  return (
    <>
      <h2>Settings</h2>
      <hr/>
      <div>
        <h3>Discord</h3>
        <hr/>
        <div className={styles.settingItem}>
          <DiscordWebhookConfig configured={discordConfig?.configured ?? false} onOk={handleDiscordWebhookConfigOk}/>
        </div>
      </div>
      <MessageDialog ref={errorDialogRef} message={'Error'} type={'alert'}
                     onButtonClick={(button: MessageDialogButton) => {
                       errorDialogRef.current?.close()
                     }}/>
      <Loading ref={loadingRef}/>
    </>
  )
  function handleDiscordWebhookConfigOk (webhookUrl: string): void {
    save().then(() => {
      loadingRef.current?.close()
    }).catch((e) => {
      console.log(e)
      loadingRef.current?.close()
      errorDialogRef.current?.open()
    })

    async function save (): Promise<void> {
      loadingRef.current?.open()

      const discordConfig: DiscordConfig = {
        discordWebHookUrl: webhookUrl
      }
      const response = await fetch('/api/autopilot/config/discord', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...discordConfig
        })
      })
      if (!response.ok) {
        throw new Error('API error')
      }
      await load()
    }
  }
}
