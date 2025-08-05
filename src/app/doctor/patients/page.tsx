'use client';

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { UserCircle2, CalendarDays } from 'lucide-react';

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
        if (!res.ok) throw new Error('Mocking fallback data...');
        const data = await res.json();
        setPatients(data);
      } catch (error) {
        // fallback mock data
        setPatients([
          {
            id: 1,
            name: 'John Doe',
            age: 30,
            gender: 'Male',
            contact: '9876543210',
            appointmentDate: dayjs().add(1, 'day').toISOString(),
          },
          {
            id: 2,
            name: 'Aisha Khan',
            age: 27,
            gender: 'Female',
            contact: '9087654321',
            appointmentDate: dayjs().subtract(2, 'day').toISOString(),
          },
          {
            id: 3,
            name: 'Ravi Sharma',
            age: 45,
            gender: 'Male',
            contact: '9123456789',
            appointmentDate: dayjs().add(5, 'day').toISOString(),
          },
          {
            id: 4,
            name: 'Priya Verma',
            age: 33,
            gender: 'Female',
            contact: '9000000000',
            appointmentDate: dayjs().subtract(1, 'day').toISOString(),
          },
            {
            id: 5,
            name: 'John Doe',
            age: 30,
            gender: 'Male',
            contact: '9876543210',
            appointmentDate: dayjs().add(1, 'day').toISOString(),
          },
          {
            id: 6,
            name: 'Aisha Khan',
            age: 27,
            gender: 'Female',
            contact: '9087654321',
            appointmentDate: dayjs().subtract(2, 'day').toISOString(),
          },
          {
            id: 7,
            name: 'Ravi Sharma',
            age: 45,
            gender: 'Male',
            contact: '9123456789',
            appointmentDate: dayjs().add(5, 'day').toISOString(),
          },
          {
            id: 8,
            name: 'Priya Verma',
            age: 33,
            gender: 'Female',
            contact: '9000000000',
            appointmentDate: dayjs().subtract(1, 'day').toISOString(),
          },
        ]);
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
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📋 Patient Records</h1>

      {/* Tabs */}
      <div className="flex space-x-3 mb-5">
        {Tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search by patient name..."
        className="w-full max-w-md px-4 py-2 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => {
            const isUpcoming = dayjs(patient.appointmentDate).isAfter(today);
            return (
              <div
                key={patient.id}
                className="bg-white border hover:shadow-lg rounded-2xl p-5 transition-all duration-200 group relative"
              >
                <div className="flex items-center gap-3 mb-3">
                  <UserCircle2 className="h-8 w-8 text-blue-500" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                      {patient.name}
                    </h2>
                    <p className="text-sm text-gray-500">{patient.gender} • Age {patient.age}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-1">📞 {patient.contact}</p>

                <div className="flex items-center text-sm gap-2 mt-3">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  <span
                    className={`font-medium ${
                      isUpcoming ? 'text-green-600' : 'text-blue-600'
                    }`}
                  >
                    {isUpcoming ? 'Upcoming' : 'Past'}: {dayjs(patient.appointmentDate).format('DD MMM YYYY')}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">No patients found.</p>
        )}
      </div>
    </div>
  );
}


