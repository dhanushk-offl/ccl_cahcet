"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function StatisticsPage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalJournals: 0,
    totalEBooks: 0,
    dailyVisitors: 0,
    activeMembers: 0,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/statistics")
      .then((res) => res.json())
      .then((data) => setStats(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/admin/statistics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      })

      if (response.ok) {
        setMessage("Statistics updated successfully!")
      } else {
        setMessage("Failed to update statistics")
      }
    } catch (error) {
      setMessage("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Statistics</h1>
          <p className="text-muted-foreground">Update library statistics</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Library Statistics</CardTitle>
          <CardDescription>Update the numbers displayed on the homepage</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="totalBooks">Total Books</Label>
                <Input
                  id="totalBooks"
                  type="number"
                  value={stats.totalBooks}
                  onChange={(e) => setStats({ ...stats, totalBooks: Number.parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalJournals">Total Journals</Label>
                <Input
                  id="totalJournals"
                  type="number"
                  value={stats.totalJournals}
                  onChange={(e) => setStats({ ...stats, totalJournals: Number.parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalEBooks">Total E-Books</Label>
                <Input
                  id="totalEBooks"
                  type="number"
                  value={stats.totalEBooks}
                  onChange={(e) => setStats({ ...stats, totalEBooks: Number.parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dailyVisitors">Daily Visitors</Label>
                <Input
                  id="dailyVisitors"
                  type="number"
                  value={stats.dailyVisitors}
                  onChange={(e) => setStats({ ...stats, dailyVisitors: Number.parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activeMembers">Active Members</Label>
                <Input
                  id="activeMembers"
                  type="number"
                  value={stats.activeMembers}
                  onChange={(e) => setStats({ ...stats, activeMembers: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>

            {message && (
              <Alert>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
