// src/app/api/appointments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  const { id } = params

  console.log(`Updating appointment ${id}`, body)

  return NextResponse.json({ message: 'Appointment updated (mock)', body })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  console.log(`Deleting appointment ${id}`)

  return NextResponse.json({ message: 'Appointment deleted (mock)' })
}
