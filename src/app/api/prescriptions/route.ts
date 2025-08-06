// File: src/app/api/prescriptions/route.ts
import { NextRequest, NextResponse } from 'next/server';

let prescriptions = [
  {
    id: '1',
    patient: 'John Doe',
    appointmentId: '101',
    medicine: 'Paracetamol',
    dosage: '500mg',
    duration: '5 days',
    notes: 'After meals',
  },
  {
    id: '2',
    patient: 'Rohit Sharma',
    appointmentId: '102',
    medicine: 'Amoxicillin',
    dosage: '250mg',
    duration: '7 days',
    notes: 'Twice a day',
  }
];

// GET - Fetch all prescriptions
export async function GET(req: NextRequest) {
  return NextResponse.json(prescriptions);
}

// POST - Create a new prescription (optional for your case)
export async function POST(req: NextRequest) {
  const newPrescription = await req.json();
  newPrescription.id = Date.now().toString(); // simple unique ID
  prescriptions.push(newPrescription);
  return NextResponse.json(newPrescription, { status: 201 });
}

