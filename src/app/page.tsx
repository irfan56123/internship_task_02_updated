"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white shadow-md">
        <h2 className="text-2xl font-bold">Doctor Onboarding</h2>
        <div className="flex gap-6">
          <Link href="/login" className="hover:text-blue-200 transition">
            Login
          </Link>
          <Link href="/signup" className="hover:text-blue-200 transition">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-1 px-8 py-16 bg-white">
        {/* Text Content */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-blue-600">
            Manage Your Practice Effortlessly
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            A secure and modern platform for doctors to manage appointments,
            patient records, and prescriptions — all in one place.
          </p>
          <div className="flex gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-xl shadow-md hover:bg-blue-50 transition"
            >
              Login
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
              Appointments
            </h3>
            <p className="text-gray-700">
              Schedule, track, and manage appointments effortlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-blue-100">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              Patients
            </h3>
            <p className="text-gray-700">
              Access complete patient history and medical records.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-blue-100">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              Prescriptions
            </h3>
            <p className="text-gray-700">
              Create, store, and manage prescriptions digitally.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-white bg-blue-600 ">
        © {new Date().getFullYear()} Doctor Onboarding Platform
      </footer>
    </div>
  );
}

