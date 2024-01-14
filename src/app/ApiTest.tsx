'use client'
import { type FormEvent, useState } from 'react'

export default function ApiTest (): React.ReactNode {
  const [scheduleRes, setScheduleRes] = useState('')
  const [history, setHistory] = useState('')
  const [discord, setDiscord] = useState('')

  const cleanUp = (): void => {
    setScheduleRes('')
    setHistory('')
    setDiscord('')
  }

  const Extend = (): React.ReactNode => {
    const requestExtendToken = async (): Promise<void> => {
      await fetch('/api/extend', {
        method: 'POST',
        headers: {}
      })
    }

    return (
      <div>
        <h3>POST /extend</h3>
        <button onClick={() => {
          requestExtendToken().catch(() => {})
        }}>test
        </button>
      </div>
    )
  }

  const Schedule = (): React.ReactNode => {
    const GetSchedule = (): React.ReactNode => {
      const requestGetSchedule = async (): Promise<void> => {
        const response = await fetch('/api/autopilot/schedule', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.text()
        setScheduleRes(data)
      }
      return (
        <div>
          <h3>GET /schedule</h3>
          <button onClick={() => {
            requestGetSchedule().catch(() => {})
          }}>test
          </button>
          <ResponseTextArea value={scheduleRes}/>
        </div>
      )
    }

    const PostSchedule = (): React.ReactNode => {
      const [url, setUrl] = useState('')
      const [name, setName] = useState('')
      const [schedule, setSchedule] = useState('')

      return (
        <div>
          <h3>POST /schedule</h3>
          <input type="text" placeholder="url" onInput={(e: FormEvent<HTMLInputElement>) => { setUrl(e.currentTarget.value) }}/>
          <input type="text" placeholder="name" onInput={(e: FormEvent<HTMLInputElement>) => { setName(e.currentTarget.value) }}/>
          <input type="text" placeholder="schedule" onInput={(e: FormEvent<HTMLInputElement>) => { setSchedule(e.currentTarget.value) }}/>
          <button onClick={() => {
            fetch('/api/autopilot/schedule', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                url,
                name,
                schedule
              })
            }).catch(() => {})
          }}>test
          </button>
        </div>
      )
    }

    const PutSchedule = (): React.ReactNode => {
      const [id, setId] = useState('')
      const [name, setName] = useState('')
      const [schedule, setSchedule] = useState('')

      return (
        <div>
          <h3>PUT /schedule</h3>
          <input type="text" placeholder="id" onInput={(e: FormEvent<HTMLInputElement>) => { setId(e.currentTarget.value) }}/>
          <input type="text" placeholder="name" onInput={(e: FormEvent<HTMLInputElement>) => { setName(e.currentTarget.value) }}/>
          <input type="text" placeholder="schedule" onInput={(e: FormEvent<HTMLInputElement>) => { setSchedule(e.currentTarget.value) }}/>
          <button onClick={() => {
            fetch('/api/autopilot/schedule', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id,
                name,
                schedule
              })
            }).catch(() => {})
          }}>test
          </button>
        </div>
      )
    }

    const DeleteSchedule = (): React.ReactNode => {
      const [id, setId] = useState('')

      return (
        <div>
          <h3>DELETE /schedule</h3>
          <input type="text" placeholder="id" onInput={(e: FormEvent<HTMLInputElement>) => { setId(e.currentTarget.value) }}/>
          <button onClick={() => {
            const searchParams = new URLSearchParams({
              id
            })
            fetch(`/api/autopilot/schedule?${searchParams.toString()}`, {
              method: 'DELETE'
            }).catch(() => {})
          }}>test
          </button>
        </div>
      )
    }

    return (
      <div>
        <GetSchedule />
        <PostSchedule />
        <PutSchedule />
        <DeleteSchedule />
      </div>
    )
  }

  const History = (): React.ReactNode => {
    const requestGetHistory = async (): Promise<void> => {
      const response = await fetch('/api/autopilot/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.text()
      setHistory(data)
    }

    return (
      <div>
        <h3>GET /history</h3>
        <button onClick={() => {
          requestGetHistory().catch(() => {})
        }}>test
        </button>
        <ResponseTextArea value={history} />
      </div>
    )
  }

  const Discord = (): React.ReactNode => {
    const GetDiscord = (): React.ReactNode => {
      const requestGetDiscord = async (): Promise<void> => {
        const response = await fetch('/api/autopilot/config/discord', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.text()
        setDiscord(data)
      }
      return (
        <div>
          <h3>GET /config/discord</h3>
          <button onClick={() => {
            requestGetDiscord().catch(() => {})
          }}>test
          </button>
          <ResponseTextArea value={discord} />
        </div>
      )
    }

    const PutDiscord = (): React.ReactNode => {
      const [discordWebHookUrl, setDiscordWebHookUrl] = useState('')

      return (
        <div>
          <h3>PUT /config/discord</h3>
          <input type="text" placeholder="discordHookUrl" onInput={(e: FormEvent<HTMLInputElement>) => { setDiscordWebHookUrl(e.currentTarget.value) }}/>
          <button onClick={() => {
            fetch('/api/autopilot/config/discord', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                discordWebHookUrl
              })
            }).catch(() => {})
          }}>test
          </button>
        </div>
      )
    }

    return (
      <div>
        <GetDiscord />
        <PutDiscord />
      </div>
    )
  }

  return (
    <div>
      <h2>ApiTest</h2>
      <button onClick={cleanUp}>clean up</button>
      <Extend />
      <Schedule />
      <History />
      <Discord />
    </div>
  )
}

function ResponseTextArea ({ value }: { value: string }): React.ReactNode {
  return (
    <div>
      <textarea defaultValue={value} style={{ width: '500px', height: '100px' }}/>
    </div>
  )
}
