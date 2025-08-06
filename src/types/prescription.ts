export interface Prescription {
  id: string;
  patientId: string;
  appointmentId: string;
  medicine: string;
  dosage: string;
  duration: string;
  notes: string;
}
