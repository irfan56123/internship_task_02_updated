"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/doctor/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validEmail = "irfan@gmail.com";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {
      if (remember) {
        localStorage.setItem("isLoggedIn", "true");
      }
      router.push("/doctor/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-6 px-4">
          <h2 className="text-3xl font-bold mb-1">Doctor Login</h2>
          <p className="text-sm">Access your doctor dashboard securely</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Demo credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-5 text-sm text-blue-700">
            <h4 className="font-semibold">Demo Credentials</h4>
            <p>Email: <code>irfan@gmail.com</code></p>
            <p>Password: <code>123456</code></p>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="doctor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center text-gray-700 gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-blue-600"
              />
              Remember Me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md font-semibold"
          >
            Login
          </button>

          {/* Signup prompt */}
          <p className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <a className="text-blue-600 underline" href="/signup">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

