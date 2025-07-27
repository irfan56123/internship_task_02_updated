"use client";

import React, { useState } from "react";
import { CalendarDays, CheckCircle2, XCircle, PlusCircle } from "lucide-react";

type Props = {
  patientName: string;
  date: string;
  time: string;
  status: string;
   reason: string;
   
};

export default function AppointmentCard({ patientName, date, time, status,reason }: Props) {
  const [appointmentStatus, setAppointmentStatus] = useState(status);

  const handleConfirm = () => {
    setAppointmentStatus("confirmed");
  };

  const handleReject = () => {
    setAppointmentStatus("cancelled");
  };

  const handleCreateRequest = () => {
    alert("Create Appointment Request clicked");
    
  };

  const getStatusClass = () => {
    if (appointmentStatus === "confirmed") {
      return "bg-green-100 text-green-700 border-green-300";
    } else if (appointmentStatus === "cancelled") {
      return "bg-red-100 text-red-700 border-red-300";
    } else {
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  const getStatusIcon = () => {
    if (appointmentStatus === "confirmed") return <CheckCircle2 className="h-4 w-4 mr-1" />;
    if (appointmentStatus === "cancelled") return <XCircle className="h-4 w-4 mr-1" />;
    return <CalendarDays className="h-4 w-4 mr-1" />;
  };

  return (
    <div
      className="bg-white hover:shadow-lg transition-shadow rounded-2xl p-6 border cursor-pointer group"
      onClick={() => console.log("Clicked appointment:", patientName)}
    >
      <div className="flex justify-between items-start">
        <div>
         
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-blue-600">
            {patientName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {date} • {time}
          </p>
           <p className="text-sm text-gray-500 mt-1">
            {reason} 
          </p>
        </div>

        <span
          className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border ${getStatusClass()}`}
        >
          {getStatusIcon()}
          {appointmentStatus}
        </span>
      </div>

      {appointmentStatus === "pending" && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleConfirm();
            }}
            className="px-4 py-1.5 rounded-lg bg-green-500 text-white text-sm hover:bg-green-600 transition"
          >
            Accept
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReject();
            }}
            className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
          >
            Reject
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCreateRequest();
            }}
            className="px-4 py-1.5 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Create Request
          </button>
        </div>
      )}
    </div>
  );
}


