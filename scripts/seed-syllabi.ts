import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding syllabi...")

  // UG Syllabi
  const ugSyllabi = [
    {
      department: "CSE",
      year: "2021",
      pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.E.CSE.pdf",
      level: "UG",
    },
    {
      department: "IT",
      year: "2021",
      pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.Tech.IT.pdf",
      level: "UG",
    },
    {
      department: "AIDS",
      year: "2021",
      pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.Tech.AIDS.pdf",
      level: "UG",
    },
    {
      department: "Civil",
      year: "2021",
      pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/Civil/BE.Civil.pdf",
      level: "UG",
    },
    {
      department: "Mechanical",
      year: "2021",
      pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/Mech/B.E.Mech.pdf",
      level: "UG",
    },
    {
      department: "ECE",
      year: "2021",
      pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.E.ECE.pdf",
      level: "UG",
    },
    {
      department: "EEE",
      year: "2021",
      pdfLink: "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/EEE/B.E.%20EEE.pdf",
      level: "UG",
    },
  ]

  // PG Syllabi
  const pgSyllabi = [
    { department: "MCA", year: "2023-2024", pdfLink: "https://example.com/mca-syllabus-2023-2024.pdf", level: "PG" },
    { department: "MCA", year: "2022-2023", pdfLink: "https://example.com/mca-syllabus-2022-2023.pdf", level: "PG" },
    { department: "MBA", year: "2023-2024", pdfLink: "https://example.com/mba-syllabus-2023-2024.pdf", level: "PG" },
    { department: "MBA", year: "2022-2023", pdfLink: "https://example.com/mba-syllabus-2022-2023.pdf", level: "PG" },
  ]

  for (const syllabus of [...ugSyllabi, ...pgSyllabi]) {
    await prisma.syllabus.create({
      data: syllabus,
    })
  }

  console.log(`Seeded ${ugSyllabi.length + pgSyllabi.length} syllabi`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
