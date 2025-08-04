'use client';

import React, { useEffect, useState } from 'react';
import {
  Calendar,
  momentLocalizer,
  Views,
  Event as RBCEvent,
} from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop<CalendarEvent>(Calendar);

interface Appointment {
  id: string;
  patientName: string;
  reason: string;
  date: string;
  time: string;
  status: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export default function DoctorCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentView, setCurrentView] = useState<Views>('week');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    fetch('/api/appointments')
      .then((res) => res.json())
      .then((data: Appointment[]) => {
        const formatted = data.map((apt) => {
          const start = new Date(`${apt.date} ${apt.time}`);
          const end = new Date(start.getTime() + 30 * 60000);
          return {
            id: apt.id,
            title: `${apt.patientName} - ${apt.reason}`,
            start,
            end,
          };
        });
        setEvents(formatted);
      });
  }, []);

  const moveEvent = async (args: EventInteractionArgs<CalendarEvent>) => {
    const { event, start, end } = args;
    const updatedEvent = { ...event, start: new Date(start), end: new Date(end) };

    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? updatedEvent : e))
    );

    await fetch(`/api/appointments/${event.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: event.id,
        date: moment(start).format('YYYY-MM-DD'),
        time: moment(start).format('hh:mm A'),
      }),
    });
  };

  const handleCancel = async (id: string) => {
    const confirm = window.confirm('Cancel this appointment?');
    if (!confirm) return;

    setEvents((prev) => prev.filter((e) => e.id !== id));

    await fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
    });
  };

  const EventComponent = ({ event }: { event: CalendarEvent }) => (
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
  );

  // Tab views
  const viewTabs = ['day', 'week', 'month'] as Views[];

  // Back and Next navigation
  const handleNavigate = (action: 'NEXT' | 'PREV') => {
    const newDate = moment(currentDate);
    if (currentView === 'day') {
      newDate.add(action === 'NEXT' ? 1 : -1, 'days');
    } else if (currentView === 'week') {
      newDate.add(action === 'NEXT' ? 1 : -1, 'weeks');
    } else if (currentView === 'month') {
      newDate.add(action === 'NEXT' ? 1 : -1, 'months');
    }
    setCurrentDate(newDate.toDate());
  };

  return (
    <div style={{ marginTop: '30px' }}>
      {/* View Tabs and Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {viewTabs.map((view) => (
          <button
            key={view}
            onClick={() => setCurrentView(view)}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: currentView === view ? '#007bff' : '#e0e0e0',
              color: currentView === view ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
        <button
          onClick={() => handleNavigate('PREV')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#ff7043',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ⬅️ Back
        </button>
        <button
          onClick={() => handleNavigate('NEXT')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#66bb6a',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Next ➡️
        </button>
      </div>

      {/* Calendar */}
      <div style={{ height: '600px' }}>
        <DnDCalendar
          localizer={localizer}
          events={events}
          onEventDrop={moveEvent}
          resizable
          view={currentView}
          onView={setCurrentView}
          views={['day', 'week', 'month']}
          components={{ event: EventComponent }}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
        />
      </div>
    </div>
  );
}


