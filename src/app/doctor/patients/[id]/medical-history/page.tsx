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

  // ✅ Function to download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Medical History - ${patientName}`, 14, 15);

    doc.setFontSize(12);
    doc.text(`Total Appointments: ${stats.totalAppointments}`, 14, 25);
    doc.text(`Total Prescriptions: ${stats.totalPrescriptions}`, 14, 32);

    // Table data
    const tableData = history.map(entry => [
      entry.date,
      entry.diagnosis,
      entry.prescription
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['Date', 'Diagnosis', 'Prescription']],
      body: tableData,
    });

    doc.save(`${patientName}_Medical_History.pdf`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Medical History: {patientName}</h1>
        <button
          onClick={downloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          📄 Download as PDF
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mb-6">
        <div className="bg-blue-100 p-4 rounded-xl">Appointments: {stats.totalAppointments}</div>
        <div className="bg-green-100 p-4 rounded-xl">Prescriptions: {stats.totalPrescriptions}</div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {history.map((entry, index) => (
          <div key={index} className="border p-4 rounded-xl shadow-sm bg-white">
            <p className="font-semibold">{entry.date}</p>
            <p><strong>Diagnosis:</strong> {entry.diagnosis}</p>
            <p><strong>Prescription:</strong> {entry.prescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
