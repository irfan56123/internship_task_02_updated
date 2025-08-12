"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface HistoryEntry {
  date: string;
  diagnosis: string;
  prescription: string;
}

export default function MedicalHistoryPage() {
  const params = useParams();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [patientName, setPatientName] = useState("");
  const [stats, setStats] = useState({ totalAppointments: 0, totalPrescriptions: 0 });

  useEffect(() => {
    async function fetchHistory() {
      const res = await fetch(`/api/patients/${params.id}/medical-history`);
      const data = await res.json();
      setHistory(data.history);
      setPatientName(data.name);
      setStats({
        totalAppointments: data.totalAppointments,
        totalPrescriptions: data.totalPrescriptions
      });
    }
    fetchHistory();
  }, [params.id]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Medical History - ${patientName}`, 14, 15);

    doc.setFontSize(12);
    doc.text(`Total Appointments: ${stats.totalAppointments}`, 14, 25);
    doc.text(`Total Prescriptions: ${stats.totalPrescriptions}`, 14, 32);

    const tableData = history.map(entry => [
      entry.date,
      entry.diagnosis,
      entry.prescription
    ]);

    autoTable(doc, {
      startY: 40,
      head: [["Date", "Diagnosis", "Prescription"]],
      body: tableData
    });

    doc.save(`${patientName}_Medical_History.pdf`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          🩺 Medical History: <span className="text-blue-600">{patientName}</span>
        </h1>
        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition-all duration-300"
        >
          📄 Download as PDF
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 rounded-xl shadow hover:shadow-lg transition-all">
          <p className="text-gray-700 font-semibold text-lg">Appointments</p>
          <p className="text-3xl font-bold text-blue-700">{stats.totalAppointments}</p>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-5 rounded-xl shadow hover:shadow-lg transition-all">
          <p className="text-gray-700 font-semibold text-lg">Prescriptions</p>
          <p className="text-3xl font-bold text-green-700">{stats.totalPrescriptions}</p>
        </div>
      </div>

   {/* History List */}
<div className="space-y-6">
  {history.length === 0 ? (
    <p className="text-center text-gray-500 italic">No medical history found.</p>
  ) : (
    history.map((entry, index) => (
      <div
        key={index}
        className="bg-gradient-to-r from-white via-blue-50 to-blue-100 border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        {/* Date */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 flex items-center gap-2">
            📅 <span>{entry.date}</span>
          </span>
          <span className="text-xs bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-medium">
            Record #{index + 1}
          </span>
        </div>

        {/* Diagnosis */}
        <div className="mb-3">
          <p className="text-gray-700 font-semibold flex items-center gap-2">
            🩺 Diagnosis:
          </p>
          <p className="text-gray-800 bg-white/70 p-3 mt-1 rounded-lg shadow-sm">
            {entry.diagnosis}
          </p>
        </div>

        {/* Prescription */}
        <div>
          <p className="text-gray-700 font-semibold flex items-center gap-2">
            💊 Prescription:
          </p>
          <p className="text-gray-800 bg-white/70 p-3 mt-1 rounded-lg shadow-sm">
            {entry.prescription}
          </p>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
}
