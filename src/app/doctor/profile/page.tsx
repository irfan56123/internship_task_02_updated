'use client';

import Image from 'next/image';
import { FaEnvelope, FaPhone, FaUserMd, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';

export default function DoctorProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left: Profile Photo */}
          <div className="md:w-1/3 bg-blue-600 flex justify-center items-center p-6">
            <Image
              src="/doctor.jpg"
              alt="Doctor Profile"
              width={150}
              height={150}
              className="rounded-full object-cover border-4 border-white shadow-md w-50"
            />
          </div>

          {/* Right: Doctor Info */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-1">Dr. Irfan Ahmad</h2>
            <p className="text-blue-600 flex items-center gap-2 text-sm font-medium">
              <FaUserMd /> Cardiologist
            </p>

            <div className="mt-4 space-y-3 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <FaGraduationCap className="text-blue-500" />
                <strong>Education:</strong> MBBS, MD (Cardiology)
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                <strong>Experience:</strong> 12+ years
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                <strong>Email:</strong> sameer.verma@example.com
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-blue-500" />
                <strong>Phone:</strong> +91-9876543210
              </p>
            </div>

            <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

