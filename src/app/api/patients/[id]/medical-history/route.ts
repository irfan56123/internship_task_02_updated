// src/app/api/patients/[id]/medical-history/route.ts
import { NextResponse } from "next/server";

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

// Medical histories for different patients (at least 3 records each)
const medicalHistories: Record<number, { date: string; diagnosis: string; prescription: string }[]> = {
  1: [
    { date: "2025-08-01", diagnosis: "Flu", prescription: "Paracetamol 500mg, 3 times daily" },
    { date: "2025-07-15", diagnosis: "Migraine", prescription: "Ibuprofen 400mg as needed" },
    { date: "2025-06-20", diagnosis: "Allergic Rhinitis", prescription: "Cetirizine 10mg once daily" },
  ],
  2: [
    { date: "2025-08-05", diagnosis: "Back Pain", prescription: "Diclofenac 50mg twice daily" },
    { date: "2025-07-12", diagnosis: "Fever", prescription: "Acetaminophen 500mg, 3 times daily" },
    { date: "2025-06-25", diagnosis: "Skin Rash", prescription: "Hydrocortisone cream twice daily" },
  ],
  3: [
    { date: "2025-08-03", diagnosis: "Asthma", prescription: "Salbutamol Inhaler as prescribed" },
    { date: "2025-07-20", diagnosis: "Seasonal Allergy", prescription: "Loratadine 10mg once daily" },
    { date: "2025-06-30", diagnosis: "Mild Pneumonia", prescription: "Azithromycin 500mg once daily for 3 days" },
  ],
  4: [
    { date: "2025-08-06", diagnosis: "Diabetes Checkup", prescription: "Continue Metformin 500mg twice daily" },
    { date: "2025-07-10", diagnosis: "Hypertension", prescription: "Amlodipine 5mg daily" },
    { date: "2025-06-15", diagnosis: "Vitamin D Deficiency", prescription: "Vitamin D3 supplements weekly" },
  ],
  5: [
    { date: "2025-08-04", diagnosis: "Sprained Ankle", prescription: "Rest, Ice, Compression, Elevation" },
    { date: "2025-07-16", diagnosis: "Muscle Strain", prescription: "Ibuprofen 400mg twice daily" },
    { date: "2025-06-05", diagnosis: "Flu", prescription: "Paracetamol 500mg, 3 times daily" },
  ],
  6: [
    { date: "2025-08-02", diagnosis: "Cold & Cough", prescription: "Cough syrup, steam inhalation" },
    { date: "2025-07-18", diagnosis: "Sore Throat", prescription: "Warm saline gargles twice daily" },
    { date: "2025-06-22", diagnosis: "Mild Fever", prescription: "Acetaminophen 500mg as needed" },
  ],
  7: [
    { date: "2025-08-07", diagnosis: "Hypertension", prescription: "Amlodipine 5mg daily" },
    { date: "2025-07-14", diagnosis: "Acid Reflux", prescription: "Omeprazole 20mg before breakfast" },
    { date: "2025-06-10", diagnosis: "Headache", prescription: "Paracetamol 500mg as needed" },
  ],
  8: [
    { date: "2025-08-01", diagnosis: "Gastritis", prescription: "Omeprazole 20mg before breakfast" },
    { date: "2025-07-19", diagnosis: "Indigestion", prescription: "Antacid syrup after meals" },
    { date: "2025-06-08", diagnosis: "Mild Constipation", prescription: "Isabgol husk with warm water" },
  ],
};

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const patientId = Number(id);

  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const history = medicalHistories[patientId] || [];

  return NextResponse.json({
    patientId: patient.id,
    name: patient.name,
    totalAppointments: history.length,
    totalPrescriptions: history.length,
    history,
  });
}
