import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const rules = await prisma.rules.findFirst()
    return NextResponse.json(rules)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch rules" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const existing = await prisma.rules.findFirst()

    if (existing) {
      const rules = await prisma.rules.update({
        where: { id: existing.id },
        data,
      })
      return NextResponse.json(rules)
    } else {
      const rules = await prisma.rules.create({ data })
      return NextResponse.json(rules)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update rules" }, { status: 500 })
  }
}
