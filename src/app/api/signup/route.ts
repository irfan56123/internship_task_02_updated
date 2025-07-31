import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, specialization, experience } = body;

    //  Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    //  Simulate already registered email
    if (email === "already@demo.com") {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    //  Simulate successful signup
    return NextResponse.json(
      { message: "Signup successful", doctorId: "mock-doctor-id-123" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Mock Signup Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
