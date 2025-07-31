// src/app/api/doctor-profile/route.ts
import { NextResponse } from 'next/server';

const doctorProfile = {
  name: 'Dr. Irfan Ahmad',
  specialization: 'Cardiologist',
  education: 'MBBS, MD (Cardiology)',
  experience: '12+ years',
  email: 'sameer.verma@example.com',
  phone: '+91-9876543210',
  image: '/doctor.jpg',
};

export async function GET() {
  return NextResponse.json(doctorProfile);
}
