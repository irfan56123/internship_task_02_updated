'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Menu, X, LayoutDashboard, User, CalendarCheck, Users, LogOut } from 'lucide-react';
import { Disclosure } from '@headlessui/react';
import LogoutButton from '../../components/logoutbutton';

const navigation = [
  { name: 'Dashboard', href: '/doctor/dashboard', icon: <LayoutDashboard className="w-5 h-5 mr-2" /> },
  { name: 'Profile', href: '/doctor/profile', icon: <User className="w-5 h-5 mr-2" /> },
  { name: 'Appointments', href: '/doctor/appointments', icon: <CalendarCheck className="w-5 h-5 mr-2" /> },
  { name: 'Patients', href: '/doctor/patients', icon: <Users className="w-5 h-5 mr-2" /> },
];

export default function DoctorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-blue-900 text-white min-h-screen px-6 py-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold">Dr. Portal</h2>
        </div>
        <nav className="flex flex-col gap-4 flex-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Nav */}
      <Disclosure as="nav" className="lg:hidden bg-blue-900 text-white px-4 py-3">
        {({ open }) => (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Dr. Portal</h2>
              <Disclosure.Button className="p-2 rounded-md focus:outline-none">
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Disclosure.Button>
            </div>

            <Disclosure.Panel className="mt-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 rounded-md hover:bg-blue-800"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <div className="px-4 py-2">
                <LogoutButton />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Page Content */}
      <main className="flex-1 bg-gray-50 px-4 py-6">{children}</main>
    </div>
  );
}




