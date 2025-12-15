import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const announcement = await prisma.announcement.update({
      where: { id: Number.parseInt(params.id) },
      data,
    })
    return NextResponse.json(announcement)
  } catch (error) {
    console.error("[v0] Error updating announcement:", error)
    return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.announcement.delete({
      where: { id: Number.parseInt(params.id) },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting announcement:", error)
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 })
  }
}
