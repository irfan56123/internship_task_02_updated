// src/app/api/dashboard-appointments/route.ts
import { NextResponse } from 'next/server';

const dashboardAppointments = [
  {
    patientName: 'John Doe',
    reason: 'General checkup',
    date: '2025-07-27',
    time: '10:30 AM',
    status: 'pending',
  },
  {
    patientName: 'Jane Smith',
    reason: 'General checkup',
    date: '2025-07-28',
    time: '12:00 PM',
    status: 'confirmed',
  },
  {
    patientName: 'Alex Roy',
    reason: 'General checkup',
    date: '2025-07-29',
    time: '2:00 PM',
    status: 'cancelled',
  },
  {
    patientName: 'Suraj Roy',
    reason: 'General checkup',
    date: '2025-07-26',
    time: '2:00 PM',
    status: 'cancelled',
  },
];

export async function GET() {
  return NextResponse.json(dashboardAppointments);
}
