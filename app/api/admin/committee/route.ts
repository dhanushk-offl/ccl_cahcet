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

    const committee = await prisma.committee.findFirst()
    return NextResponse.json(committee)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch committee" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const existing = await prisma.committee.findFirst()

    if (existing) {
      const committee = await prisma.committee.update({
        where: { id: existing.id },
        data,
      })
      return NextResponse.json(committee)
    } else {
      const committee = await prisma.committee.create({ data })
      return NextResponse.json(committee)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update committee" }, { status: 500 })
  }
}
