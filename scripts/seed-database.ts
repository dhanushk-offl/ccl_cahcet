import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting database seed...")

  // Create default admin user
  const hashedPassword = await bcrypt.hash("@ccl-admin", 10)

  await prisma.admin.upsert({
    where: { email: "admin@library.com" },
    update: {},
    create: {
      email: "ccl@cahcet.edu.in",
      password: hashedPassword,
      name: "Library Admin",
    },
  })

  console.log("Admin user created: ccl@cahcet.edu.in / @ccl-admin")

  // Site Information
  await prisma.siteInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "CAHCET Central Library",
      tagline: "Discover Knowledge, Explore Ideas",
      description: "A comprehensive library management system for college",
      logo: "/logo-ccl.png",
    },
  })

  // Statistics
  await prisma.statistics.upsert({
    where: { id: 1 },
    update: {},
    create: {
      totalBooks: 39402,
      totalJournals: 120,
      totalEBooks: 4000,
      dailyVisitors: 350,
      activeMembers: 1200,
    },
  })

  // Announcements
  const announcements = [
    {
      title: "Library Timings Extended During Exams",
      content: "The library will remain open until 10 PM during the examination period from May 15 to June 10.",
      date: "May 5, 2023",
    },
    {
      title: "New Database Subscription",
      content: "We are pleased to announce that our library has subscribed to the JSTOR Arts & Sciences Collection.",
      date: "April 20, 2023",
    },
    {
      title: "Book Donation Drive",
      content:
        "Donate your gently used books to help expand our collection. Collection boxes are available at the library entrance.",
      date: "March 15, 2023",
    },
  ]

  for (const announcement of announcements) {
    await prisma.announcement.create({ data: announcement })
  }

  // Library Hours
  const hours = [
    { day: "Monday - Friday", time: "8:00 AM - 8:00 PM", order: 1 },
    { day: "Saturday", time: "9:00 AM - 5:00 PM", order: 2 },
    { day: "Holidays", time: "10:00 AM - 2:00 PM", order: 3 },
  ]

  for (const hour of hours) {
    await prisma.libraryHour.create({ data: hour })
  }

  // Navigation Items
  const navigationItems = [
    { title: "Home", icon: "BookOpen", href: "/", order: 1 },
    { title: "About", icon: "Info", href: "/about", order: 2 },
    { title: "Rules & Regulations", icon: "ScrollText", href: "/rules", order: 3 },
    { title: "Library Policy", icon: "FileText", href: "/policy", order: 4 },
    { title: "Committee", icon: "Users", href: "/committee", order: 5 },
    { title: "Syllabi", icon: "FileText", href: "/syllabi", order: 6 },
    { title: "E-Resources", icon: "BookCopy", href: "/e-resources", order: 7 },
    { title: "Gallery", icon: "GalleryVerticalEnd", href: "/gallery", order: 8 },
    { title: "OPAC", icon: "Search", href: "/opac", order: 9 },
    { title: "E-Books", icon: "BookMarked", href: "/e-books", order: 10 },
    { title: "Journals", icon: "Newspaper", href: "/journals", order: 11 },
    { title: "Contact Us", icon: "Contact", href: "/contact", order: 12 },
  ]

  for (const item of navigationItems) {
    await prisma.navigationItem.create({ data: item })
  }

  // Committee Members
  const members = [
    { position: "Principal", role: "President", order: 1 },
    { position: "Librarian", role: "Secretary", order: 2 },
    { position: "All HODs of Department", role: "Members", order: 3 },
    { position: "Student Representatives (04)", role: "Members", order: 4 },
  ]

  for (const member of members) {
    await prisma.committeeMember.create({ data: member })
  }

  // Committee Functions
  const functions = [
    "Formulate the policy, rules, and regulations for the Library.",
    "Supervise and approval for Library Budget and allocation of funds under different expenditure heads.",
    "To advise the Librarian for development proposals.",
    "To take strategic decisions regarding acquisition of Library reading material/ resources.",
    "Make necessary provision for Library building, furniture, equipment, reading material and staff, etc. in the Library.",
    "To ensure good governance of the Library.",
    "Library Committee meeting will be held every three month (Starting and Mid of every semester).",
  ]

  for (let i = 0; i < functions.length; i++) {
    await prisma.committeeFunction.create({
      data: { content: functions[i], order: i + 1 },
    })
  }

  // About History
  const history = [
    "Our Central Library is a three storey building, built with greenhouse technology, with a total area of 1,588 sq. m. and is located in the heart of the campus. Our Central library incorporated KOHA-Integrated Library Management Software for day-to-day library activities. Our Central Library is well equipped with modern facilities and resources in the form of books, journals, e-resources (e-books, e-journals, NPTEL Videos), and other learning materials to support the academic and research needs of students and faculty. We follow open access system for the users to access the library resources.",
  ]

  for (let i = 0; i < history.length; i++) {
    await prisma.aboutHistory.create({
      data: { content: history[i], order: i + 1 },
    })
  }

  // About Activities
  const activities = [
    "Formulate the policy, rules, and regulations for the Library.",
    "Supervise and approval for Library Budget and allocation of funds under different expenditure heads.",
    "To advise the Librarian for development proposals.",
    "To take strategic decisions regarding acquisition of Library reading material/ resources.",
    "Make necessary provision for Library building, furniture, equipment, reading material and staff, etc. in the Library.",
    "To ensure good governance of the Library.",
    "Library committee metting will be held every three month (Starting and Mid of semester).",
  ]

  for (let i = 0; i < activities.length; i++) {
    await prisma.aboutActivity.create({
      data: { content: activities[i], order: i + 1 },
    })
  }

  // Staff
  const staff = [
    { name: "A. Fahim Sheriff", position: "Librarian", order: 1 },
    { name: "A.S. Abdul Khuddus", position: "Library Assistant", order: 2 },
    { name: "K.O. Anees Ahamed", position: "Library Assistant", order: 3 },
    { name: "T.M. Abdullah Basha", position: "Library Assistant", order: 4 },
  ]

  for (const member of staff) {
    await prisma.staff.create({ data: member })
  }

  // Facilities
  const facilities = [
    {
      name: "Reading Rooms",
      description:
        "Spacious reading areas with seating capacity for 200 students, equipped with comfortable furniture and proper lighting.",
      order: 1,
    },
    {
      name: "Digital Library",
      description: "20 computer workstations with internet access and essential software for accessing e-resources.",
      order: 2,
    },
    {
      name: "Multimedia Section",
      description: "Audio-visual resources and equipment for multimedia learning.",
      order: 3,
    },
    {
      name: "Periodicals/Journals Section",
      description: "Dedicated area for reading current journals and magazines.",
      order: 4,
    },
    {
      name: "Reference Section",
      description:
        "Comprehensive collection of reference materials including encyclopedias, dictionaries, handbooks and rare books.",
      order: 5,
    },
  ]

  for (const facility of facilities) {
    await prisma.facility.create({ data: facility })
  }

  // General Rules
  const generalRules = [
    "All the Student and Staff are member of Library.",
    "Students should examine the books thoroughly on receiving them for any damage and report to Librarian if any such damage is found, otherwise they will be held responsible for the same.",
    "Silence must be Strictly observed inside the Library.",
    "Members should leave their belongiongs at the entrance before entering the library.",
    "In case of loss of a student ID Card, they have to inform immediately to the Librarian and a written request must be made to the principal for the issue of a duplicate ID Card.",
  ]

  for (let i = 0; i < generalRules.length; i++) {
    await prisma.generalRule.create({
      data: { content: generalRules[i], order: i + 1 },
    })
  }

  // Borrowing Rules
  const borrowingRules = [
    "Borrowing materials without a valid identity card is prohibited.",
    "Not permitted to use another user Identity Card.",
    "Books borrowed from the library are not transferable",
    "Reference Books are meant for Reading in Library only.",
    "Journals will not be issued to students at any circumstances.",
    "The Librarian may recall any book at any time even if the permitted period has not expired.",
    "The Librarian may refuse to issue books to those who violate these rules.",
    "Reservation for the books in demand can be done in OPAC to a maximum of (3books) at a time.",
    "Renewal of books can be done in OPAC.",
  ]

  for (let i = 0; i < borrowingRules.length; i++) {
    await prisma.borrowingRule.create({
      data: { content: borrowingRules[i], order: i + 1 },
    })
  }

  // BookBank Rules
  const bookBankRules = [
    "Book Bank facility is available for SC/ST Students and they can borrow six books in their library account for current semester (6 months).",
  ]

  for (let i = 0; i < bookBankRules.length; i++) {
    await prisma.bookBankRule.create({
      data: { content: bookBankRules[i], order: i + 1 },
    })
  }

  // Practice Rules
  const practiceRules = [
    "Library User Orientation (Information Literacy Programme).",
    "Maintenance of Service Areas.",
    "Access to e-Resources.",
    "Best Library User Award.",
    "User Feedback Practice through Suggestion Register.",
  ]

  for (let i = 0; i < practiceRules.length; i++) {
    await prisma.practiceRule.create({
      data: { content: practiceRules[i], order: i + 1 },
    })
  }

  // E-Resources
  await prisma.eResource.create({
    data: {
      name: "DELNET",
      ipRange: "No IP Range Needed",
      url: "https://discovery.delnet.in",
      description:
        "DELNET provides access to a wide range of resources including books, journals, theses, and dissertations. Contact the librarian for access instructions.",
    },
  })

  // Access Instructions
  const accessInstructions = [
    "Connect to the college Wi-Fi network or use computers in the library.",
    "For DELNET and N-LIST, access is restricted to the college IP range.",
    "For remote access, use the VPN service provided by the college IT department.",
    "Log in with your college credentials when prompted.",
    "For assistance, contact the Digital Resources Specialist at the library.",
    "Training sessions on using e-resources are conducted monthly. Check the library notice board for schedules.",
  ]

  for (let i = 0; i < accessInstructions.length; i++) {
    await prisma.accessInstruction.create({
      data: { content: accessInstructions[i], order: i + 1 },
    })
  }

  // Gallery Images
  const galleryImages = [
    {
      title: "Library Entrance",
      description: "Main entrance to the library",
      imageUrl: "/entrance_lib.jpg",
      category: "Facilities",
      order: 1,
    },
    {
      title: "Issue & Return Counters",
      description: "Counters for issuing and returning books",
      imageUrl: "/issue.jpg",
      category: "Facilities",
      order: 2,
    },
    {
      title: "Digital Library",
      description: "Access to online e-books and e-resources, with advanced search capabilities",
      imageUrl: "/Digital Library.jpg",
      category: "Facilities",
      order: 3,
    },
    {
      title: "OPAC Access",
      description: "Online Public Access Catalog for searching library resources",
      imageUrl: "/opac_lib.jpg",
      category: "Facilities",
      order: 4,
    },
    {
      title: "Book Shelf Index",
      description: "Collection of 30,000+ books on various subjects, departments, and languages",
      imageUrl: "/bookshelf_index.jpg",
      category: "Facilities",
      order: 5,
    },
  ]

  for (const image of galleryImages) {
    await prisma.galleryImage.create({ data: image })
  }

  // Policy Vision
  const visionItems = [
    "The vision of Central Library is to provide a student - centred learning environment that facilitates transference of information and to cater to the needs of its users by providing well-equipped and functional physical spaces where students can pursue learning independently beyond the classroom and to become a Learning Resource Centre with a state-of-the art library.",
  ]

  for (let i = 0; i < visionItems.length; i++) {
    await prisma.policyVision.create({
      data: { content: visionItems[i], order: i + 1 },
    })
  }

  // Policy Mission
  const missionItems = [
    "The mission of Central Library is to provide access to the user community with high quality information resources in all forms.",
    "To develop reading habit in students.",
    "To use modern tools, techniques for collection, storage and dissemination of information.",
  ]

  for (let i = 0; i < missionItems.length; i++) {
    await prisma.policyMission.create({
      data: { content: missionItems[i], order: i + 1 },
    })
  }

  // Policy Objectives
  const objectives = [
    "To understand the research, teaching and learning needs of its users.",
    "To build collections and create tools to support research, teaching and learning.",
    "To provide access to and promote the discovery and use of local and external information resources.",
    "T0o ensure the preservation of long-lasting availability of library collections and resources.",
    "To bring our Library at par with the International Library Standard and to make it one of the best in the state of Tamilnadu.",
    "To conduct Orientation classes to create awareness among students.",
    "To encourage the User community to utilize E- resources, (E-journals, E-books, NPTEL videos) to its maximum to gain more knowledge of the recent developments in their respective fields.",
  ]

  for (let i = 0; i < objectives.length; i++) {
    await prisma.policyObjective.create({
      data: { content: objectives[i], order: i + 1 },
    })
  }

  // General Policy
  const generalPolicies = [
    "Students must take care of Library books and must not deface by underlining, writing or drawing or removing any part of them, or in any other way.",
    "Silence should be strictly observed in the library.",
    "Use of cell phones inside the library is prohibited.",
    "All books, files, notebooks etc. must be presented to the attendant at the checkpoint for inspection before leaving the library. There is no exception to this rule.",
    "Misbehavior in the library will lead to cancellation of membership and also lead to serious disciplinary action.",
    "Student should examine the books thoroughlyon receiving them for any damage and report to Librarian if any such damage is found, otherwise they will be held responsible for the same.",
  ]

  for (let i = 0; i < generalPolicies.length; i++) {
    await prisma.generalPolicy.create({
      data: { content: generalPolicies[i], order: i + 1 },
    })
  }

  // Fine Policy
  const finePolicies = [
    "Books can be retained for a maximum duration of one month with a renewal done at an interval of 15 days.",
    "Books can be retained for a maximum duration of six month for staffs with a renewal done at an interval of 3 months.",
    "The Cost of replacement with double amount along with the fine will be charged to the person for loss or damage the library books.",
    "Fine will be charged as given below if the books are not returned on orbefore the due date this is to ensure that all library Users get a fair chance to access the books.",
    "First Week - Rs. 1/- per day.",
    "Second Week - Rs. 2/- per day.",
    "Third Week - Rs. 10/- per day.",
  ]

  for (let i = 0; i < finePolicies.length; i++) {
    await prisma.finePolicy.create({
      data: { content: finePolicies[i], order: i + 1 },
    })
  }

  console.log("Seed completed successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
