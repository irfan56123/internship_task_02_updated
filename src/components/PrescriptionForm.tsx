'use client';
import React, { useState } from 'react';

interface Prescription {
  id: string;
  patient: string;
  appointmentId: string;
  medicine: string;
  dosage: string;
  duration: string;
  notes: string;
}

interface Props {
  onAdd: (prescription: Prescription) => void;
}

export default function PrescriptionForm({ onAdd }: Props) {
  const [form, setForm] = useState<Omit<Prescription, 'id'>>({
    patient: '',
    appointmentId: '',
    medicine: '',
    dosage: '',
    duration: '',
    notes: '',
  });

  const handleSubmit = () => {
    const newPrescription: Prescription = {
      id: Date.now().toString(),
      ...form,
    };
    onAdd(newPrescription);
    setForm({
      patient: '',
      appointmentId: '',
      medicine: '',
      dosage: '',
      duration: '',
      notes: '',
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-2 shadow-xl rounded-xl overflow-hidden border border-blue-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-4">
        <h2 className="text-2xl font-bold">📝 Add New Prescription</h2>
        <p className="text-sm">Enter medication details for the patient</p>
      </div>

      {/* Form Body */}
      <div className="bg-white p-6 space-y-4">
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            type="text"
            placeholder={key[0].toUpperCase() + key.slice(1)}
            value={value}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          ➕ Add Prescription
        </button>
      </div>
    </div>
  );
}

