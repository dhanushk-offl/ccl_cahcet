import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [general, borrowing, bookbank, practice] = await Promise.all([
      prisma.generalRule.findMany({ orderBy: { order: "asc" } }),
      prisma.borrowingRule.findMany({ orderBy: { order: "asc" } }),
      prisma.bookBankRule.findMany({ orderBy: { order: "asc" } }),
      prisma.practiceRule.findMany({ orderBy: { order: "asc" } }),
    ])

    return NextResponse.json({
      general: general.map((r) => r.content),
      borrowing: borrowing.map((r) => r.content),
      bookbank: bookbank.map((r) => r.content),
      practice: practice.map((r) => r.content),
    })
  } catch (error) {
    console.error("[v0] Error fetching rules:", error)
    return NextResponse.json({ error: "Failed to fetch rules" }, { status: 500 })
  }
}
