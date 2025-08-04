// src/app/api/appointments/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  req: NextRequest,
  context: any // ✅ IMPORTANT: Use `any` here for Vercel compatibility
) {
  const { params } = context
  const body = await req.json()

  console.log(`Updating appointment ${params.id}`, body)

  return NextResponse.json({ message: 'Appointment updated (mock)', body })
}

export async function DELETE(
  req: NextRequest,
  context: any // ✅ Use `any` here too
) {
  const { params } = context

  console.log(`Deleting appointment ${params.id}`)

  return NextResponse.json({ message: 'Appointment deleted (mock)' })
}
