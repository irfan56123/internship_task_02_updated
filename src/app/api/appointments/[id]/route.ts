// src/app/api/appointments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()

  console.log(`Updating appointment ${params.id}`, body)

  return NextResponse.json({ message: 'Appointment updated (mock)', body })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  console.log(`Deleting appointment ${params.id}`)

  return NextResponse.json({ message: 'Appointment deleted (mock)' })
}
