import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const statistics = await prisma.statistics.findFirst()
    return NextResponse.json(statistics || {})
  } catch (error) {
    console.error("[v0] Error fetching statistics:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const statistics = await prisma.statistics.upsert({
      where: { id: 1 },
      update: data,
      create: { ...data, id: 1 },
    })

    return NextResponse.json(statistics)
  } catch (error) {
    console.error("[v0] Error updating statistics:", error)
    return NextResponse.json({ error: "Failed to update statistics" }, { status: 500 })
  }
}
