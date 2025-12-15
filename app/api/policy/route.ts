import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [vision, mission, objectives, generalPolicy, finePolicy] = await Promise.all([
      prisma.policyVision.findMany({ orderBy: { order: "asc" } }),
      prisma.policyMission.findMany({ orderBy: { order: "asc" } }),
      prisma.policyObjective.findMany({ orderBy: { order: "asc" } }),
      prisma.generalPolicy.findMany({ orderBy: { order: "asc" } }),
      prisma.finePolicy.findMany({ orderBy: { order: "asc" } }),
    ])

    return NextResponse.json({
      vision: vision.map((v) => v.content),
      mission: mission.map((m) => m.content),
      objectives: objectives.map((o) => o.content),
      generalPolicy: generalPolicy.map((g) => g.content),
      finePolicy: finePolicy.map((f) => f.content),
    })
  } catch (error) {
    console.error("[v0] Error fetching policy:", error)
    return NextResponse.json({ error: "Failed to fetch policy" }, { status: 500 })
  }
}
