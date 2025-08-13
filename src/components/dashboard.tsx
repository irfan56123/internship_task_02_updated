'use client';


import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import LogoutButton from './logoutbutton';



export default function DashboardLayout({
    
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showLogout = pathname.startsWith('/doctor'); // or '/dashboard'

  return (
    <>
 
      {showLogout && (
        <div className="w-full bg-blue-800 shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold text-white">Doctor Dashboard</h1>
         
            <div className="flex items-center space-x-3">
    <img
      src="/doctor.jpg"
      alt="Doctor Avatar"
      className="w-10 h-10 rounded-full border"
    />
    <div className="text-right">
      <p className="text-sm font-medium text-white">Dr. Anil Kumar Gupta</p>
      <p className="text-xs text-white">Cardiologist</p>
    </div>
  
 <LogoutButton/>

  </div>
        </div>
      )}
      <main className="p-4">{children}</main>
    </>
  );
}
