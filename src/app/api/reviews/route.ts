import { NextResponse } from "next/server";

const reviews = [
  {
    patientName: "Rohit Sharma",
    rating: 5,
    comment: "Dr. Smith is an amazing doctor! Very patient and kind."
  },
  {
    patientName: "Priya Verma",
    rating: 4,
    comment: "Good consultation, explained everything clearly."
  },
  {
    patientName: "Aman Gupta",
    rating: 5,
    comment: "Very professional and caring. Highly recommended!"
  }
];

export async function GET() {
  return NextResponse.json(reviews);
}
