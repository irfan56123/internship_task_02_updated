'use client'

import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

interface Appointment {
  id: string
  patientName: string
  reason: string
  date: string // e.g., '2025-08-01'
  time: string // e.g., '10:30 AM'
  status: string
}

export default function DoctorCalendar() {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/appointments')
      .then((res) => res.json())
      .then((data: Appointment[]) => {
        const formatted = data.map((apt) => {
          const start = new Date(`${apt.date} ${apt.time}`)
          const end = new Date(start.getTime() + 30 * 60000) // 30-min default duration
          return {
            id: apt.id,
            title: `${apt.patientName} - ${apt.reason}`,
            start,
            end,
          }
        })
        setEvents(formatted)
      })
  }, [])

  const moveEvent = async ({ event, start, end }: any) => {
    const updated = { ...event, start, end }
    setEvents((prev) => prev.map((e) => (e.id === event.id ? updated : e)))

    // Send updated date/time to backend (mock update for now)
    await fetch(`/api/appointments/${event.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: event.id,
        date: moment(start).format('YYYY-MM-DD'),
        time: moment(start).format('hh:mm A'),
      }),
    })
  }

  const handleCancel = async (id: string) => {
    const confirm = window.confirm('Cancel this appointment?')
    if (!confirm) return
    setEvents((prev) => prev.filter((e) => e.id !== id))
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' })
  }

  const EventComponent = ({ event }: any) => (
    <span>
      {event.title}
      <button
        onClick={() => handleCancel(event.id)}
        style={{
          marginLeft: 10,
          background: 'transparent',
          border: 'none',
          color: 'red',
          cursor: 'pointer',
        }}
      >
        ❌
      </button>
    </span>
  )

  return (
    <div style={{ height: '600px', marginTop: '30px' }}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        onEventDrop={moveEvent}
        resizable
        defaultView="week"
        views={['week', 'day', 'agenda']}
        components={{ event: EventComponent }}
      />
    </div>
  )
}
