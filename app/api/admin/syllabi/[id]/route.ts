import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const syllabus = await prisma.syllabus.update({
      where: { id: Number.parseInt(params.id) },
      data,
    })
    return NextResponse.json(syllabus)
  } catch (error) {
    console.error("[v0] Error updating syllabus:", error)
    return NextResponse.json({ error: "Failed to update syllabus" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.syllabus.delete({
      where: { id: Number.parseInt(params.id) },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting syllabus:", error)
    return NextResponse.json({ error: "Failed to delete syllabus" }, { status: 500 })
  }
}
