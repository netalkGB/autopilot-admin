'use client'

import 'modern-normalize'
import '../global.css'
import styles from './settings.module.css'
import DiscordWebhookConfig from '@/app/settings/DiscordWebhookConfig'

export default function Page (): React.ReactNode {
  return (
    <>
      <h2>Settings</h2>
      <hr/>
      <div>
        <h3>Discord</h3>
        <hr/>
        <div className={styles.settingItem}>
          <DiscordWebhookConfig configured={false} onOk={(webhookUrl: string) => { console.log(webhookUrl) }}/>
        </div>
      </div>
    </>
  )
}
