import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const journals = await prisma.journal.findMany({
      orderBy: { department: "asc" },
    })
    return NextResponse.json(journals)
  } catch (error) {
    console.error("[v0] Error fetching journals:", error)
    return NextResponse.json({ error: "Failed to fetch journals" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const journal = await prisma.journal.create({ data })
    return NextResponse.json(journal)
  } catch (error) {
    console.error("[v0] Error creating journal:", error)
    return NextResponse.json({ error: "Failed to create journal" }, { status: 500 })
  }
}
