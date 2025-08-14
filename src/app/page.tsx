"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white shadow-md">
        <h2 className="text-2xl font-bold">Patient & Doctor Portal</h2>
        <div className="flex gap-6">
          <Link href="/login" className="hover:text-blue-200 transition">
            Doctor Login
          </Link>
          <Link
            href="https://internship-patient-task-t33j.vercel.app/login"
            className="hover:text-blue-200 transition"
          >
            Patient Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-1 px-8 py-16 bg-white">
        {/* Text Content */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-blue-600">
            One Platform for Patients & Doctors
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            A secure and modern healthcare management system where patients can
            easily book appointments and manage their medical records, while
            doctors can handle schedules, patient details, salaries, and
            prescriptions — all in one place.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://internship-patient-task-t33j.vercel.app/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Patient Login
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Doctor Login
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="mt-8 md:mt-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Doctor Illustration"
            className="w-80 drop-shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-16 bg-blue-50">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-blue-100">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              Easy Appointment Booking
            </h3>
            <p className="text-gray-700">
              Patients can book, reschedule, or cancel appointments with just a
              few clicks. Doctors can manage their daily schedules efficiently.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-blue-100">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              Complete Patient Management
            </h3>
            <p className="text-gray-700">
              Doctors get access to full patient medical history, prescriptions,
              and visit records for better treatment decisions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-blue-100">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              Billing & Salary Tracking
            </h3>
            <p className="text-gray-700">
              Automated billing for patients and salary management for doctors,
              keeping finances transparent and hassle-free.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

