'use client'
import { useEffect, useState } from 'react'

export function UserName (): React.ReactNode {
  const [userName, setUserName] = useState<string>('-')
  useEffect(() => {
    getUserName().then(() => {}).catch(() => {})
  }, [])

  async function getUserName (): Promise<void> {
    const extendResponse = await fetch('/api/extend', {
      method: 'POST',
      headers: {}
    })
    if (extendResponse.status === 401) {
      location.href = '/api/login'
      return
    }
    const userInfoResponse = await fetch('/api/autopilot/userinfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (userInfoResponse.ok) {
      const userInfo = await userInfoResponse.json()
      setUserName((userInfo?.sub) as string ?? '')
    }
  }
  return <>{userName}</>
}
