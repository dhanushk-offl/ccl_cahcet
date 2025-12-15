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

    const eresource = await prisma.eResource.findFirst()
    return NextResponse.json(eresource)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch e-resources" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const existing = await prisma.eResource.findFirst()

    if (existing) {
      const eresource = await prisma.eResource.update({
        where: { id: existing.id },
        data,
      })
      return NextResponse.json(eresource)
    } else {
      const eresource = await prisma.eResource.create({ data })
      return NextResponse.json(eresource)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update e-resources" }, { status: 500 })
  }
}
