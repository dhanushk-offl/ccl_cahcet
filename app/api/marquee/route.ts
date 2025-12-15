import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [statistics, latestAnnouncement, hours] = await Promise.all([
      prisma.statistic.findFirst(),
      prisma.announcement.findFirst({ orderBy: { createdAt: "desc" } }),
      prisma.libraryHour.findFirst(),
    ])

    return NextResponse.json({
      statistics,
      latestAnnouncement,
      hours,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch marquee data" }, { status: 500 })
  }
}
