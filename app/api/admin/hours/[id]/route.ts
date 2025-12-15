import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const hour = await prisma.libraryHour.update({
      where: { id: Number.parseInt(params.id) },
      data,
    })
    return NextResponse.json(hour)
  } catch (error) {
    console.error("[v0] Error updating hour:", error)
    return NextResponse.json({ error: "Failed to update hour" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.libraryHour.delete({
      where: { id: Number.parseInt(params.id) },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting hour:", error)
    return NextResponse.json({ error: "Failed to delete hour" }, { status: 500 })
  }
}
