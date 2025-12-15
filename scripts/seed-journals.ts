import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding journals and departments...")

  // Department names
  const departments = [
    "ARTIFICIAL INTELLIGENCE",
    "CIVIL ENGINEERING",
    "COMPUTER SCIENCE ENGINEERING",
    "ELECTRICAL AND ELECTRONICS ENGINEERING",
    "ELECTRONICS AND COMMUNICATION ENGINEERING",
    "INFORMATION TECHNOLOGY",
    "MECHANICAL ENGINEERING",
    "MASTER OF COMPUTER APPLICATION",
    "MASTER OF BUSINESS ADMINISTRATION",
    "MASTER OF APPLIED ELECTRONICS",
  ]

  // Create departments
  for (const dept of departments) {
    await prisma.department.upsert({
      where: { name: dept },
      update: {},
      create: { name: dept },
    })
  }

  // Journal data - I'll include a representative sample
  const journals = [
    // AI Journals
    {
      name: "JOURNAL OF INTELLIGENT COMPUTING AND APPLICATION(JICA)",
      type: "National",
      department: "ARTIFICIAL INTELLIGENCE",
    },
    { name: "JOURNAL OF INTELLIGENT SYSTEM RESEARCH(JISR)", type: "National", department: "ARTIFICIAL INTELLIGENCE" },
    {
      name: "INTERNATIONAL JOURNAL OF ARTIFICIAL INTELLIGENCE AND COMPUTATIONAL RESEARCH (IJAICR)",
      type: "International",
      department: "ARTIFICIAL INTELLIGENCE",
    },

    // Civil Engineering
    { name: "JOURNAL OF CIVIL AND CONSTRUCTION ENGINEERING", type: "National", department: "CIVIL ENGINEERING" },
    {
      name: "INTERNATIONAL JOURNAL OF GEOTECHNIQUES AND ENVIRONMENT",
      type: "International",
      department: "CIVIL ENGINEERING",
    },

    // CSE
    { name: "JOURNAL OF DATA MINING AND MANAGEMENT", type: "National", department: "COMPUTER SCIENCE ENGINEERING" },
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTER ENGINEERING",
      type: "International",
      department: "COMPUTER SCIENCE ENGINEERING",
    },

    // EEE
    {
      name: "JOURNAL OF CONTROL AND INSTRUMENTATION ENGINEERING",
      type: "National",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING",
    },
    {
      name: "INTERNATIONAL JOURNAL OF ELECTRIC POWER SYSTEM AND ENERGY CONVERSION",
      type: "International",
      department: "ELECTRICAL AND ELECTRONICS ENGINEERING",
    },

    // ECE
    {
      name: "JOURNAL OF ELECTRONICS AND TELECOMMUNICATION SYSTEM ENGINEERING",
      type: "National",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING",
    },
    {
      name: "INTERNATIONAL JOURNAL OF ANALOG CIRCUITS, VLSI AND BIOELECTRONICS",
      type: "International",
      department: "ELECTRONICS AND COMMUNICATION ENGINEERING",
    },

    // IT
    { name: "JOURNAL OF NETWORK SECURITY COMPUTER NETWORKS", type: "National", department: "INFORMATION TECHNOLOGY" },
    {
      name: "INTERNATIONAL JOURNAL OF INFORMATION TECHNOLOGY AND HIGH PERFORMANCE COMPUTING",
      type: "International",
      department: "INFORMATION TECHNOLOGY",
    },

    // Mechanical
    { name: "JOURNAL OF MECHANICAL AND MECHANICS ENGINEERING", type: "National", department: "MECHANICAL ENGINEERING" },
    {
      name: "INTERNATIONAL JOURNAL OF MECHANICAL ENGINEERING AND MATERIALS SCIENCES",
      type: "International",
      department: "MECHANICAL ENGINEERING",
    },

    // MCA
    { name: "JOURNAL OF CYBERNETICS AND SYSTEMS", type: "National", department: "MASTER OF COMPUTER APPLICATION" },
    {
      name: "INTERNATIONAL JOURNAL OF COMPUTATIONAL INTELLIGENCE RESEARCH AND APPLICATIONS",
      type: "International",
      department: "MASTER OF COMPUTER APPLICATION",
    },

    // MBA
    { name: "INDIAN JOURNAL OF FINANCE", type: "National", department: "MASTER OF BUSINESS ADMINISTRATION" },
    {
      name: "INTERNATIONAL JOURNAL OF HUMAN RESOURCE AND BUSINESS MANAGEMENT",
      type: "International",
      department: "MASTER OF BUSINESS ADMINISTRATION",
    },

    // Applied Electronics
    {
      name: "JOURNAL OF ELECTRONIC DESIGN AND TECHNOLOGY",
      type: "National",
      department: "MASTER OF APPLIED ELECTRONICS",
    },
    {
      name: "INTERNATIONAL JOURNAL OF MULTIMEDIA, COMPUTER VISION AND MACHINE LEARNING",
      type: "International",
      department: "MASTER OF APPLIED ELECTRONICS",
    },
  ]

  for (const journal of journals) {
    await prisma.journal.create({
      data: journal,
    })
  }

  console.log(`Seeded ${journals.length} journals and ${departments.length} departments`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
