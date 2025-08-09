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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      if (remember) {
        localStorage.setItem("isLoggedIn", "true");
      }
      router.push("/doctor/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="flex w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-white">
        
        {/* Left Branding Section */}
        <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-600 to-blue-500 text-white p-10">
          <h1 className="text-4xl font-bold mb-4">Doctor Portal</h1>
          <p className="text-lg opacity-90 text-center">
            Manage appointments, view patient history, and stay connected.
          </p>
        </div>

        {/* Right Login Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Doctor Login</h2>

          {/* Demo credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-5 text-sm text-blue-700">
            <h4 className="font-semibold">Demo Credentials</h4>
            <p>Email: <code>irfan@gmail.com</code></p>
            <p>Password: <code>123456</code></p>
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="doctor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700">
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
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-2 rounded-md font-semibold shadow-md"
            >
              Login
            </button>
          </form>

          {/* Signup */}
          <p className="mt-6 text-sm text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

