"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, BookText, Library, Users, FileText, ImageIcon } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalJournals: 0,
    totalEBooks: 0,
    announcements: 0,
  })

  useEffect(() => {
    fetch("/api/admin/dashboard-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
  }, [])

  const sections = [
    {
      title: "Statistics",
      description: "Update library statistics",
      href: "/admin/dashboard/statistics",
      icon: BookOpen,
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Announcements",
      description: "Manage library announcements",
      href: "/admin/dashboard/announcements",
      icon: BookText,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Library Hours",
      description: "Update operating hours",
      href: "/admin/dashboard/hours",
      icon: Library,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Committee",
      description: "Manage committee members & functions",
      href: "/admin/dashboard/committee",
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "About",
      description: "Update about, staff & facilities",
      href: "/admin/dashboard/about",
      icon: FileText,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Rules & Regulations",
      description: "Manage library rules",
      href: "/admin/dashboard/rules",
      icon: FileText,
      color: "from-red-500 to-red-600",
    },
    {
      title: "E-Resources",
      description: "Manage e-resources and access",
      href: "/admin/dashboard/eresources",
      icon: Library,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Gallery",
      description: "Manage gallery images",
      href: "/admin/dashboard/gallery",
      icon: ImageIcon,
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Policy",
      description: "Update library policies",
      href: "/admin/dashboard/policy",
      icon: FileText,
      color: "from-lime-500 to-lime-600",
    },
    {
      title: "Journals",
      description: "Manage journals and departments",
      href: "/admin/dashboard/journals",
      icon: BookText,
      color: "from-rose-500 to-rose-600",
    },
    {
      title: "Syllabi",
      description: "Manage syllabi for departments",
      href: "/admin/dashboard/syllabi",
      icon: FileText,
      color: "from-violet-500 to-violet-600",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your library website content</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBooks.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Journals</CardTitle>
            <BookText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJournals.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total E-Books</CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEBooks.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.announcements}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link key={section.href} href={section.href}>
              <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader>
                  <div
                    className={`h-12 w-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-2`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
