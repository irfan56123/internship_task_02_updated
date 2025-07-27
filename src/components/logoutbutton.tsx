'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any stored auth tokens (if any)
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctorInfo');

    // Redirect to login page
    router.push('/login');
  };

  return (
    <button
  onClick={() => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  }}
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  Logout
</button>

  );
};

export default LogoutButton;
