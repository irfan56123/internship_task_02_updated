// src/app/api/patients/[id]/medical-history/route.ts
import { NextResponse } from 'next/server';

// Patients dummy data
const patients = [
  { id: 1, name: 'Ayesha Khan', age: 28, gender: 'Female', contact: '9876543210', appointmentDate: '2025-07-28' },
  { id: 2, name: 'Rahul Verma', age: 35, gender: 'Male', contact: '9123456780', appointmentDate: '2025-07-24' },
  { id: 3, name: 'Sana Sheikh', age: 41, gender: 'Female', contact: '9988776655', appointmentDate: '2025-08-02' },
  { id: 4, name: 'Aman Patel', age: 30, gender: 'Male', contact: '9876541230', appointmentDate: '2025-07-20' },
  { id: 5, name: 'Ayesha Khan', age: 28, gender: 'Female', contact: '9876543210', appointmentDate: '2025-07-28' },
  { id: 6, name: 'Rahul Singh', age: 35, gender: 'Male', contact: '9123456780', appointmentDate: '2025-07-24' },
  { id: 7, name: 'Iqra Khan', age: 41, gender: 'Female', contact: '9988776655', appointmentDate: '2025-08-02' },
  { id: 8, name: 'Suraj Kumar', age: 30, gender: 'Male', contact: '9876541230', appointmentDate: '2025-07-20' },
  { id: 9, name: 'Shivam Kumar', age: 30, gender: 'Male', contact: '9876541230', appointmentDate: '2025-07-20' },
];

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const patient = patients.find((p) => p.id === Number(id));

  if (!patient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
  }

  const history = [
    {
      date: '2025-08-01',
      diagnosis: 'Flu',
      prescription: 'Paracetamol 500mg, 3 times daily',
    },
    {
      date: '2025-07-15',
      diagnosis: 'Migraine',
      prescription: 'Ibuprofen 400mg as needed',
    },
  ];

  return NextResponse.json({
    patientId: patient.id,
    name: patient.name,
    totalAppointments: history.length,
    totalPrescriptions: history.length,
    history,
  });
}
