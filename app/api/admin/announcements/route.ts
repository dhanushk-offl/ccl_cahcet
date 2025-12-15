import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(announcements)
  } catch (error) {
    console.error("[v0] Error fetching announcements:", error)
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const announcement = await prisma.announcement.create({ data })
    return NextResponse.json(announcement)
  } catch (error) {
    console.error("[v0] Error creating announcement:", error)
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 })
  }
}
