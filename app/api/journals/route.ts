import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [journals, departments] = await Promise.all([
      prisma.journal.findMany({
        orderBy: { department: "asc" },
      }),
      prisma.department.findMany({
        orderBy: { name: "asc" },
      }),
    ])

    return NextResponse.json({
      journals,
      departments: departments.map((d) => d.name),
    })
  } catch (error) {
    console.error("[v0] Error fetching journals:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
