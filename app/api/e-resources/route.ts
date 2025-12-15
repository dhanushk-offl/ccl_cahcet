import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const eresource = await prisma.eResource.findFirst()
    return NextResponse.json(eresource)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch e-resources" }, { status: 500 })
  }
}
