import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const hours = await prisma.libraryHour.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(hours)
  } catch (error) {
    console.error("[v0] Error fetching hours:", error)
    return NextResponse.json({ error: "Failed to fetch hours" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const hour = await prisma.libraryHour.create({ data })
    return NextResponse.json(hour)
  } catch (error) {
    console.error("[v0] Error creating hour:", error)
    return NextResponse.json({ error: "Failed to create hour" }, { status: 500 })
  }
}
