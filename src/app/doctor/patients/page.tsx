'use client';

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const Tabs = ['All', 'Upcoming', 'Past'];

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  appointmentDate: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const today = dayjs().startOf('day');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch('/api/patients');
        const data = await res.json();
        setPatients(data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => {
      const aptDate = dayjs(p.appointmentDate);
      if (activeTab === 'Upcoming') return aptDate.isAfter(today);
      if (activeTab === 'Past') return aptDate.isBefore(today);
      return true;
    });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Details</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {Tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by patient name..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{patient.name}</h2>
                <span className="text-sm text-gray-500">{patient.gender}</span>
              </div>
              <p className="text-sm text-gray-600">Age: {patient.age}</p>
              <p className="text-sm text-gray-600">Contact: {patient.contact}</p>
              <p className="text-sm text-gray-600">
                Appointment:{' '}
                <span className="font-medium">
                  {dayjs(patient.appointmentDate).format('DD MMM YYYY')}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No patients found.</p>
        )}
      </div>
    </div>
  );
}

