import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const syllabi = await prisma.syllabus.findMany({
      orderBy: [{ level: "asc" }, { department: "asc" }],
    })

    const ugSyllabi = syllabi.filter((s) => s.level === "UG")
    const pgSyllabi = syllabi.filter((s) => s.level === "PG")

    // Group by department
    const formatSyllabi = (items: typeof syllabi) => {
      const grouped = items.reduce(
        (acc, item) => {
          if (!acc[item.department]) {
            acc[item.department] = {
              department: item.department,
              academicYears: [],
            }
          }
          acc[item.department].academicYears.push({
            year: item.year,
            pdfLink: item.pdfLink,
          })
          return acc
        },
        {} as Record<string, { department: string; academicYears: { year: string; pdfLink: string }[] }>,
      )
      return Object.values(grouped)
    }

    return NextResponse.json({
      undergraduate: formatSyllabi(ugSyllabi),
      postgraduate: formatSyllabi(pgSyllabi),
    })
  } catch (error) {
    console.error("[v0] Error fetching syllabi:", error)
    return NextResponse.json({ error: "Failed to fetch syllabi" }, { status: 500 })
  }
}
