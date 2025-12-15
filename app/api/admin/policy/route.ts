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

    const policy = await prisma.policy.findFirst()
    return NextResponse.json(policy)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch policy" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const existingPolicy = await prisma.policy.findFirst()

    if (existingPolicy) {
      const policy = await prisma.policy.update({
        where: { id: existingPolicy.id },
        data,
      })
      return NextResponse.json(policy)
    } else {
      const policy = await prisma.policy.create({ data })
      return NextResponse.json(policy)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update policy" }, { status: 500 })
  }
}
