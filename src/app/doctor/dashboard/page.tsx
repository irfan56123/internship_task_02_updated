'use client';

import React, { useEffect, useState } from 'react';
import AppointmentCard from '../../../components/appointmentCard';
import DoctorCalendar from '../../../components/DoctorCalendar';
import { CalendarDays, CreditCard, AlarmClock, ClipboardList } from 'lucide-react';

interface Appointment {
  patientName: string;
  reason: string;
  date: string;
  time: string;
  status: string;
}

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch('/api/dashboard-appointments');
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching dashboard appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Heading */}
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800">👨‍⚕️ Doctor Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your appointments, earnings, and more</p>
      </div>

      <main className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4">
          <AlarmClock className="w-10 h-10 text-blue-600" />
          <div>
            <h3 className="text-md font-medium text-gray-500">Today's Appointments</h3>
            <p className="text-2xl font-bold text-blue-600">5</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4">
          <CalendarDays className="w-10 h-10 text-blue-600" />
          <div>
            <h3 className="text-md font-medium text-gray-500">Upcoming Appointments</h3>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4">
          <ClipboardList className="w-10 h-10 text-blue-600" />
          <div>
            <h3 className="text-md font-medium text-gray-500">Pending Requests</h3>
            <p className="text-2xl font-bold text-blue-600">3</p>
          </div>
        </div>
             </main>
      {/* Calendar Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📆 Calendar View</h2>
        <DoctorCalendar />
      </div>
        {/* Appointments Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 Upcoming Appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map((appt, index) => (
                <AppointmentCard key={index} {...appt} />
              ))}
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="text-purple-600 w-6 h-6" />
            <h2 className="text-xl font-semibold text-gray-800">💳 Payment Details</h2>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between"><span>Last Payment</span><span>24 July 2025</span></div>
            <div className="flex justify-between"><span>Total Earnings</span><span className="font-semibold text-green-600">₹12,500</span></div>
            <div className="flex justify-between"><span>Pending Amount</span><span className="font-semibold text-red-500">₹2,000</span></div>
            <div className="flex justify-between"><span>Payment Method</span><span>Bank Transfer</span></div>
            <div className="flex justify-between"><span>Next Payout</span><span>31 July 2025</span></div>
            <div className="flex justify-between"><span>Paid Appointments</span><span>28</span></div>
            <div className="flex justify-between"><span>Bank Account</span><span>****5678</span></div>
            <div className="flex justify-between"><span>Tax Deducted</span><span className="text-yellow-600">₹1,200</span></div>
          </div>
        </div>
 

     
    </div>
  );
}


