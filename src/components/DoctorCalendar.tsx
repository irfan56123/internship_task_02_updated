'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Event as CalendarEvent } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop<AppointmentEvent>(Calendar);

interface AppointmentEvent extends CalendarEvent {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: string;
}

const initialAppointments: AppointmentEvent[] = [
  {
    id: 'apt1',
    title: 'Rohit Sharma',
    start: new Date(2025, 7, 5, 10, 0),
    end: new Date(2025, 7, 5, 10, 30),
    patientName: 'Rohit Sharma',
    date: '2025-08-05',
    time: '10:00 AM',
    status: 'pending',
  },
  {
    id: 'apt2',
    title: 'Virat Kohli',
    start: new Date(2025, 7, 6, 11, 0),
    end: new Date(2025, 7, 6, 11, 30),
    patientName: 'Virat Kohli',
    date: '2025-08-06',
    time: '11:00 AM',
    status: 'pending',
  },
];

export default function DoctorCalendar() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedEvent, setSelectedEvent] = useState<AppointmentEvent | null>(null);

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  const openModal = (event: AppointmentEvent) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleAction = (action: 'accept' | 'reject' | 'reschedule') => {
    if (!selectedEvent) return;

    const updated = appointments.map((apt) =>
      apt.id === selectedEvent.id ? { ...apt, status: action } : apt
    );

    setAppointments(updated);
    closeModal();
  };

  const moveEvent = ({ event, start, end }: { event: AppointmentEvent; start: Date; end: Date }) => {
    const updated = appointments.map((apt) =>
      apt.id === event.id ? { ...apt, start, end } : apt
    );
    setAppointments(updated);
  };

  return (
    <div className="p-4">
      <DnDCalendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => openModal(event as AppointmentEvent)}
        onEventDrop={moveEvent}
        draggableAccessor={() => true}
        eventPropGetter={(event) => {
          let backgroundColor = '#3182ce'; // default blue
          if (event.status === 'accept') backgroundColor = 'green';
          if (event.status === 'reject') backgroundColor = 'red';
          if (event.status === 'reschedule') backgroundColor = 'orange';

          return { style: { backgroundColor, color: 'white', borderRadius: '4px', padding: '4px' } };
        }}
      />

      {/* Modal Popup */}
      <Modal
        isOpen={!!selectedEvent}
        onRequestClose={closeModal}
        contentLabel="Appointment Modal"
        className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-6 outline-none relative z-50"
        overlayClassName="fixed inset-0  bg-opacity-50 flex items-center justify-center z-40"
      >
        {selectedEvent && (
          <div>
            <h2 className="text-xl font-bold mb-4">Appointment with {selectedEvent.patientName}</h2>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Status:</strong> {selectedEvent.status}</p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => handleAction('accept')}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => handleAction('reschedule')}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Reschedule
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}




