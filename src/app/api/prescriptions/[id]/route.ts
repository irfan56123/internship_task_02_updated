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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = await req.json();

  const index = prescriptions.findIndex((p) => p.id === id);
  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Prescription not found' }), { status: 404 });
  }

  // Merge old + new
  prescriptions[index] = { ...prescriptions[index], ...body };

  return new Response(JSON.stringify(prescriptions[index]), { status: 200 });
}
