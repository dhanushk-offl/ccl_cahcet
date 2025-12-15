import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [history, activities, staff, facilities] = await Promise.all([
      prisma.aboutHistory.findMany({ orderBy: { order: "asc" } }),
      prisma.aboutActivity.findMany({ orderBy: { order: "asc" } }),
      prisma.staff.findMany({ orderBy: { order: "asc" } }),
      prisma.facility.findMany({ orderBy: { order: "asc" } }),
    ])

    return NextResponse.json({
      history: history.map((h) => h.content),
      activities: activities.map((a) => a.content),
      staff,
      facilities,
    })
  } catch (error) {
    console.error("[v0] Error fetching about data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
