import { NextRequest, NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: NextRequest, context: any) {
  const { params } = context
  const body = await req.json()

  console.log(`Updating appointment ${params.id}`, body)

  return NextResponse.json({ message: 'Appointment updated (mock)', body })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: NextRequest, context: any) {
  const { params } = context

  console.log(`Deleting appointment ${params.id}`)

  return NextResponse.json({ message: 'Appointment deleted (mock)' })
}
