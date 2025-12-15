import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const journal = await prisma.journal.update({
      where: { id: Number.parseInt(params.id) },
      data,
    })
    return NextResponse.json(journal)
  } catch (error) {
    console.error("[v0] Error updating journal:", error)
    return NextResponse.json({ error: "Failed to update journal" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.journal.delete({
      where: { id: Number.parseInt(params.id) },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting journal:", error)
    return NextResponse.json({ error: "Failed to delete journal" }, { status: 500 })
  }
}
