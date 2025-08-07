'use client';

import React, { useState, useEffect } from 'react';
import PrescriptionForm from './PrescriptionForm';

interface Prescription {
  id: string;
  patient: string;
  appointmentId: string;
  medicine: string;
  dosage: string;
  duration: string;
  notes: string;
}

export default function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Prescription>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPrescriptions([
      {
        id: '1',
        patient: 'John Doe',
        appointmentId: 'A1',
        medicine: 'Paracetamol',
        dosage: '500mg',
        duration: '5 days',
        notes: 'After meals',
      },
      {
        id: '2',
        patient: 'Jane Smith',
        appointmentId: 'A2',
        medicine: 'Ibuprofen',
        dosage: '200mg',
        duration: '3 days',
        notes: 'Before sleep',
      },
        {
        id: '3',
        patient: 'Rohit Shethi',
        appointmentId: 'A3',
        medicine: 'Paracetamol',
        dosage: '500mg',
        duration: '5 days',
        notes: 'After meals',
      },
      {
        id: '4',
        patient: 'Neha singh',
        appointmentId: 'A4',
        medicine: 'Ibuprofen',
        dosage: '200mg',
        duration: '3 days',
        notes: 'Before sleep',
      },
        {
        id: '5',
        patient: 'Haniya Aamir',
        appointmentId: 'A5',
        medicine: 'Paracetamol',
        dosage: '500mg',
        duration: '5 days',
        notes: 'After meals',
      },
      {
        id: '6',
        patient: 'Sidharth malohtra',
        appointmentId: 'A6',
        medicine: 'Ibuprofen',
        dosage: '200mg',
        duration: '3 days',
        notes: 'Before sleep',
      },
        {
        id: '7',
        patient: 'Khoosboo sidiquie',
        appointmentId: 'A7',
        medicine: 'Paracetamol',
        dosage: '500mg',
        duration: '5 days',
        notes: 'After meals',
      },
      {
        id: '8',
        patient: 'Soniya sekhawat',
        appointmentId: 'A8',
        medicine: 'Ibuprofen',
        dosage: '200mg',
        duration: '3 days',
        notes: 'Before sleep',
      },
        {
        id: '9',
        patient: 'Mohan mane',
        appointmentId: 'A9',
        medicine: 'Paracetamol',
        dosage: '500mg',
        duration: '5 days',
        notes: 'After meals',
      },
    
    ]);
  }, []);

  const deletePrescription = (id: string) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
  };

  const startEdit = (p: Prescription) => {
    setEditingId(p.id);
    setEditForm(p);
  };

  const updatePrescription = () => {
    if (!editingId) return;
    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === editingId ? { ...p, ...editForm } as Prescription : p
      )
    );
    setEditingId(null);
    setEditForm({});
  };

  const filteredPrescriptions = prescriptions.filter(p =>
    p.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Prescription Management </h1>
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md shadow-sm"
        />
      </div>

     

      {/* Prescriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {filteredPrescriptions.length === 0 && (
          <p className="text-gray-500">No prescriptions found.</p>
        )}

        {filteredPrescriptions.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl p-5 border border-blue-100 shadow-md hover:shadow-lg transition duration-200"
          >
            {editingId === p.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.medicine || ''}
                  placeholder="Medicine"
                  onChange={(e) => setEditForm({ ...editForm, medicine: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.dosage || ''}
                  placeholder="Dosage"
                  onChange={(e) => setEditForm({ ...editForm, dosage: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.duration || ''}
                  placeholder="Duration"
                  onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.notes || ''}
                  placeholder="Notes"
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                />
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={updatePrescription}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                  >
                    💾 Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-blue-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-1">{p.patient}</h3>
                <p><strong>Medicine:</strong> {p.medicine}</p>
                <p><strong>Dosage:</strong> {p.dosage}</p>
                <p><strong>Duration:</strong> {p.duration}</p>
                <p><strong>Notes:</strong> {p.notes}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded shadow"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deletePrescription(p.id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded shadow"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
       {/* Form */}
       <div>
        <PrescriptionForm onAdd={(newP) => setPrescriptions([...prescriptions, newP])} />
      </div>
    </div>
  );
}

