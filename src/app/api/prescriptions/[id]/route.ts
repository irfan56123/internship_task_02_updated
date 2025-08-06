import { NextRequest } from 'next/server';

const prescriptions = [
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
  },
];

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();

  const index = prescriptions.findIndex((p) => p.id === id);
  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Prescription not found' }), { status: 404 });
  }

  // Merge existing prescription with updated data
  prescriptions[index] = { ...prescriptions[index], ...body };

  return new Response(JSON.stringify(prescriptions[index]), { status: 200 });
}
