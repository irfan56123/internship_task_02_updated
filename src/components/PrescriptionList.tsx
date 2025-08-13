'use client';

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFormPatient, setActiveFormPatient] = useState<string | null>(null);
  const [activeEditPrescription, setActiveEditPrescription] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Prescription>>({});

  useEffect(() => {
    setPrescriptions([
      // { id: '1', patient: 'Ayesha Khan ', appointmentId: 'A1', medicine: 'Paracetamol', dosage: '500mg', duration: '5 days', notes: 'After meals' },
      // { id: '2', patient: 'Ayesha Khan', appointmentId: 'A2', medicine: 'Vitamin C', dosage: '1000mg', duration: '10 days', notes: 'Morning' },
      { id: '3', patient: 'Rahul Verma', appointmentId: 'A3', medicine: 'Ibuprofen', dosage: '200mg', duration: '3 days', notes: 'Before sleep' },
      { id: '4', patient: 'Rahul Verma', appointmentId: 'A4', medicine: 'Paracetamol', dosage: '500mg', duration: '5 days', notes: 'After meals' },
      { id: '5', patient: 'Sana Sheikh', appointmentId: 'A5', medicine: 'Vitamin C', dosage: '1000mg', duration: '10 days', notes: 'Morning' },
      { id: '6', patient: 'Sana Sheikh', appointmentId: 'A6', medicine: 'Ibuprofen', dosage: '200mg', duration: '3 days', notes: 'Before sleep' },
      //   { id: '7', patient: 'Aman Patel ', appointmentId: 'A7', medicine: 'Paracetamol', dosage: '500mg', duration: '5 days', notes: 'After meals' },
      // { id: '8', patient: 'Aman Patel', appointmentId: 'A8', medicine: 'Vitamin C', dosage: '1000mg', duration: '10 days', notes: 'Morning' },
      { id: '9', patient: 'Rahul singh', appointmentId: 'A9', medicine: 'Ibuprofen', dosage: '200mg', duration: '3 days', notes: 'Before sleep' },
      { id: '10', patient: 'Rahul singh', appointmentId: 'A10', medicine: 'Paracetamol', dosage: '500mg', duration: '5 days', notes: 'After meals' },
      { id: '11', patient: 'Iqra Khan', appointmentId: 'A11', medicine: 'Vitamin C', dosage: '1000mg', duration: '10 days', notes: 'Morning' },
      { id: '12', patient: 'Suraj Kumar', appointmentId: 'A12', medicine: 'Ibuprofen', dosage: '200mg', duration: '3 days', notes: 'Before sleep' },
    ]);
  }, []);

  // Group prescriptions by patient name
  const groupedPrescriptions = prescriptions.reduce((acc, p) => {
    if (!acc[p.patient]) acc[p.patient] = [];
    acc[p.patient].push(p);
    return acc;
  }, {} as Record<string, Prescription[]>);

  const handleAdd = (patientName: string) => {
    if (!formData.medicine || !formData.dosage) return;
    setPrescriptions((prev) => [
      ...prev,
      {
        id: uuidv4(),
        patient: patientName,
        appointmentId: formData.appointmentId || '',
        medicine: formData.medicine || '',
        dosage: formData.dosage || '',
        duration: formData.duration || '',
        notes: formData.notes || '',
      },
    ]);
    setFormData({});
    setActiveFormPatient(null);
  };

  const handleEditSave = (id: string) => {
    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...formData } : p
      )
    );
    setFormData({});
    setActiveEditPrescription(null);
  };

  const deletePrescription = (id: string) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Prescription Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by patient name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-md shadow-sm mb-6"
      />

      {/* Patient Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.keys(groupedPrescriptions)
          .filter((patient) =>
            patient.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((patient) => (
            <div
              key={patient}
              className="bg-white rounded-xl p-5 border border-blue-100 shadow-md hover:shadow-lg transition duration-200"
            >
              <h2 className="text-xl font-bold text-blue-700 mb-3">{patient}</h2>

              {/* Prescriptions for this patient */}
              {groupedPrescriptions[patient].map((p) => (
                <div
                  key={p.id}
                  className="p-3 border border-gray-200 rounded mb-3 bg-gray-50"
                >
                  {activeEditPrescription === p.id ? (
                    <>
                      <input
                        type="text"
                        placeholder="Medicine"
                        value={formData.medicine || ''}
                        onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
                        className="border p-2 w-full mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Dosage"
                        value={formData.dosage || ''}
                        onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                        className="border p-2 w-full mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Duration"
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="border p-2 w-full mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Notes"
                        value={formData.notes || ''}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="border p-2 w-full mb-2"
                      />
                      <button
                        onClick={() => handleEditSave(p.id)}
                        className="bg-blue-600 text-white px-4 py-1 rounded mr-2"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={() => setActiveEditPrescription(null)}
                        className="bg-gray-400 text-white px-4 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <p><strong>Medicine:</strong> {p.medicine}</p>
                      <p><strong>Dosage:</strong> {p.dosage}</p>
                      <p><strong>Duration:</strong> {p.duration}</p>
                      <p><strong>Notes:</strong> {p.notes}</p>
                      <button
                        onClick={() => {
                          setActiveEditPrescription(p.id);
                          setFormData(p);
                        }}
                        className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
                      >
                         Edit
                      </button>
                      <button
                        onClick={() => deletePrescription(p.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              ))}

              {/* Add Prescription Button */}
              {activeFormPatient === patient ? (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-semibold mb-2">Add New Prescription</h4>
                  <input
                    type="text"
                    placeholder="Medicine"
                    value={formData.medicine || ''}
                    onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Dosage"
                    value={formData.dosage || ''}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Notes"
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="border p-2 w-full mb-2"
                  />
                  <button
                    onClick={() => handleAdd(patient)}
                    className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                  >
                    ➕ Add
                  </button>
                  <button
                    onClick={() => setActiveFormPatient(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setActiveFormPatient(patient);
                    setFormData({});
                  }}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  ➕ Add Prescription
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

