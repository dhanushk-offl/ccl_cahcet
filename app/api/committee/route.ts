import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [members, functions] = await Promise.all([
      prisma.committeeMember.findMany({ orderBy: { order: "asc" } }),
      prisma.committeeFunction.findMany({ orderBy: { order: "asc" } }),
    ])

    return NextResponse.json({
      members,
      functions: functions.map((f) => f.content),
    })
  } catch (error) {
    console.error("[v0] Error fetching committee data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
