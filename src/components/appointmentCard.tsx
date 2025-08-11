"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  PlusCircle,
} from "lucide-react";

type Props = {
  patientName: string;
  date: string;
  time: string;
  status: string;
  reason: string;
};

export default function AppointmentCard({
  patientName,
  date,
  time,
  status,
  reason,
}: Props) {
  const [appointmentStatus, setAppointmentStatus] = useState(status);

  const handleConfirm = () => setAppointmentStatus("confirmed");
  const handleReject = () => setAppointmentStatus("cancelled");
  const handleCreateRequest = () =>
    alert("Reschedule/Request Appointment clicked");

  const getStatusClass = () => {
    if (appointmentStatus === "confirmed")
      return "bg-green-100 text-green-700 border-green-300 animate-pulse";
    if (appointmentStatus === "cancelled")
      return "bg-red-100 text-red-700 border-red-300";
    return "bg-yellow-100 text-yellow-700 border-yellow-300";
  };

  const getStatusIcon = () => {
    if (appointmentStatus === "confirmed")
      return <CheckCircle2 className="h-4 w-4 mr-1" />;
    if (appointmentStatus === "cancelled")
      return <XCircle className="h-4 w-4 mr-1" />;
    return <CalendarDays className="h-4 w-4 mr-1" />;
  };

  return (
    <div
      className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 cursor-pointer group"
      onClick={() => console.log("Clicked appointment:", patientName)}
    >
      <div className="flex justify-between items-start">
        
        <div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">
            {patientName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {date} • {time}
          </p>
          <p className="text-sm text-gray-500 mt-1 italic">{reason}</p>
        </div>

        <span
          className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border ${getStatusClass()} transition-all`}
        >
          {getStatusIcon()}
          {appointmentStatus}
        </span>
      </div>

      {appointmentStatus === "pending" && (
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleConfirm();
            }}
            className="flex-1 min-w-[90px] px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition"
          >
            Accept
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReject();
            }}
            className="flex-1 min-w-[90px] px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
          >
            Reject
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCreateRequest();
            }}
            className="flex-1 min-w-[130px] px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition flex items-center justify-center"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Reschedule
          </button>
        </div>
      )}
    </div>
  );
}


