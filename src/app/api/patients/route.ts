// src/app/api/patients/route.ts
import { NextResponse } from 'next/server';

const patients = [
  {
    id: 1,
    name: 'Ayesha Khan',
    age: 28,
    gender: 'Female',
    contact: '9876543210',
    appointmentDate: '2025-07-28',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    age: 35,
    gender: 'Male',
    contact: '9123456780',
    appointmentDate: '2025-07-24',
  },
  {
    id: 3,
    name: 'Sana Sheikh',
    age: 41,
    gender: 'Female',
    contact: '9988776655',
    appointmentDate: '2025-08-02',
  },
  {
    id: 4,
    name: 'Aman Patel',
    age: 30,
    gender: 'Male',
    contact: '9876541230',
    appointmentDate: '2025-07-20',
  },
];

export async function GET() {
  return NextResponse.json(patients);
}
