import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const statistics = await prisma.statistics.findFirst()
    const announcementsCount = await prisma.announcement.count()

    return NextResponse.json({
      totalBooks: statistics?.totalBooks || 0,
      totalJournals: statistics?.totalJournals || 0,
      totalEBooks: statistics?.totalEBooks || 0,
      announcements: announcementsCount,
    })
  } catch (error) {
    console.error("[v0] Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
