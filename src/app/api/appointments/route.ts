// src/app/api/appointments/route.ts
import { NextResponse } from 'next/server';

const appointments = [
  {
    id: 'apt1',
    patientName: 'Rohit Sharma',
    patientImage: '/avatar1.png',
    date: '2025-08-01',
    time: '10:30 AM',
    status: 'Upcoming',
    reason: 'General Checkup',
  },
  {
    id: 'apt2',
    patientName: 'Pooja Verma',
    patientImage: '/avatar2.png',
    date: '2025-08-02',
    time: '11:45 AM',
    status: 'Completed',
    reason: 'Dental Pain',
  },
  {
    id: 'apt3',
    patientName: 'Aaliya Bhatt',
    patientImage: '/avatar2.png',
    date: '2025-08-02',
    time: '11:45 AM',
    status: 'Completed',
    reason: 'Dental Pain',
  },
  {
    id: 'apt4',
    patientName: 'Aayesha Ahmad',
    patientImage: '/avatar2.png',
    date: '2025-08-02',
    time: '11:45 AM',
    status: 'Completed',
    reason: 'Dental Pain',
  },
  {
    id: 'apt5',
    patientName: 'Bebika Singhaniya',
    patientImage: '/avatar2.png',
    date: '2025-08-02',
    time: '11:45 AM',
    status: 'Completed',
    reason: 'Dental Pain',
  },
  {
    id: 'apt6',
    patientName: 'Sweta Singh',
    patientImage: '/avatar2.png',
    date: '2025-08-02',
    time: '11:45 AM',
    status: 'Completed',
    reason: 'Dental Pain',
  },
];

export async function GET() {
  return NextResponse.json(appointments);
}
