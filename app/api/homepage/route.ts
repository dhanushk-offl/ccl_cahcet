import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [statistics, announcements, hours] = await Promise.all([
      prisma.statistics.findFirst(),
      prisma.announcement.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      prisma.libraryHour.findMany({
        orderBy: { order: "asc" },
      }),
    ])

    return NextResponse.json({
      statistics: statistics || {
        totalBooks: 0,
        totalJournals: 0,
        totalEBooks: 0,
        dailyVisitors: 0,
        activeMembers: 0,
      },
      announcements: announcements || [],
      hours: hours || [],
    })
  } catch (error) {
    console.error("[v0] Error fetching homepage data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
