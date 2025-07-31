'use client';

import { useEffect, useState } from 'react';
import AppointmentCard from './appointmentCard';

interface Appointment {
  id: string;
  patientName: string;
  patientImage: string;
  date: string;
  time: string;
  status: string;
  reason: string;
}

const AppointmentList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch('/api/appointments');
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {appointments.map((apt) => (
        <AppointmentCard key={apt.id} {...apt} />
      ))}
    </div>
  );
};

export default AppointmentList;

