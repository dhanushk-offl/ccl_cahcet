import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const syllabi = await prisma.syllabus.findMany({
      orderBy: [{ level: "asc" }, { department: "asc" }],
    })
    return NextResponse.json(syllabi)
  } catch (error) {
    console.error("[v0] Error fetching syllabi:", error)
    return NextResponse.json({ error: "Failed to fetch syllabi" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const syllabus = await prisma.syllabus.create({ data })
    return NextResponse.json(syllabus)
  } catch (error) {
    console.error("[v0] Error creating syllabus:", error)
    return NextResponse.json({ error: "Failed to create syllabus" }, { status: 500 })
  }
}
