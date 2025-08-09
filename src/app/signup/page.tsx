"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  specialization: string;
  experience: number;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  specialization: Yup.string().required("Specialization is required"),
  experience: Yup.number()
    .typeError("Experience must be a number")
    .min(0)
    .required("Experience is required"),
});

export default function DoctorSignupPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setServerError("");
    try {
      console.log("Submitted Data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setServerError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white flex flex-col justify-center items-start p-12 relative overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

        <h1 className="text-5xl font-bold z-10 leading-snug">
          Join Our <span className="text-yellow-300">Doctor Network</span>
        </h1>
        <p className="mt-4 text-lg text-blue-100 z-10 max-w-md">
          Connect with patients, manage appointments, and grow your practice —
          all in one secure onboarding platform.
        </p>

        {/* Highlights */}
        <div className="mt-8 space-y-4 z-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-white/20 flex items-center justify-center rounded-full">
              ✅
            </span>
            <span>Easy onboarding process</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-white/20 flex items-center justify-center rounded-full">
              🔒
            </span>
            <span>Secure & private data handling</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-white/20 flex items-center justify-center rounded-full">
              📅
            </span>
            <span>Manage your appointments</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex justify-center items-center p-8 bg-gradient-to-br from-blue-50 to-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100 transform transition hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Doctor Signup
          </h2>

          {serverError && (
            <p className="text-red-500 text-sm text-center">{serverError}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm text-center">
              {successMessage}
            </p>
          )}

          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Specialization", name: "specialization", type: "text" },
            { label: "Experience (in years)", name: "experience", type: "number" },
          ].map((field, idx) => (
            <div key={idx} className="mt-4">
              <label className="block mb-1 font-medium text-gray-700">
                {field.label}
              </label>
              <input
                {...register(field.name as keyof SignupFormData)}
                type={field.type}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors[field.name as keyof SignupFormData] && (
                <p className="text-red-500 text-sm">
                  {
                    errors[field.name as keyof SignupFormData]
                      ?.message as string
                  }
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Sign Up
          </button>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              className="text-blue-600 hover:underline font-medium"
              href="/login"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
