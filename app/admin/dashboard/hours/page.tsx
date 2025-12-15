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
import { AdminContentList } from "@/components/admin-content-list"

interface LibraryHour {
  id: number
  day: string
  time: string
  order: number
}

export default function LibraryHoursPage() {
  const [hours, setHours] = useState<LibraryHour[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ day: "", time: "", order: 0 })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchHours()
  }, [])

  const fetchHours = async () => {
    const response = await fetch("/api/admin/hours")
    const data = await response.json()
    setHours(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const url = editingId ? `/api/admin/hours/${editingId}` : "/api/admin/hours"
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage(editingId ? "Hours updated!" : "Hours created!")
        setFormData({ day: "", time: "", order: 0 })
        setEditingId(null)
        fetchHours()
      }
    } catch (error) {
      setMessage("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return
    try {
      await fetch(`/api/admin/hours/${id}`, { method: "DELETE" })
      setMessage("Deleted!")
      fetchHours()
    } catch (error) {
      setMessage("Failed to delete")
    }
  }

  const handleEdit = (hour: LibraryHour) => {
    setEditingId(hour.id)
    setFormData({ day: hour.day, time: hour.time, order: hour.order })
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
          <h1 className="text-3xl font-bold">Library Hours</h1>
          <p className="text-muted-foreground">Manage operating hours</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit" : "Add"} Hours</CardTitle>
            <CardDescription>Set library operating hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="day">Day</Label>
                <Input
                  id="day"
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  placeholder="e.g., Monday - Friday"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="e.g., 8:00 AM - 8:00 PM"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) })}
                />
              </div>

              {message && (
                <Alert>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : editingId ? "Update" : "Create"}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null)
                      setFormData({ day: "", time: "", order: 0 })
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminContentList
              items={hours}
              onEdit={handleEdit}
              onDelete={handleDelete}
              renderItem={(item) => (
                <div>
                  <p className="font-semibold">{item.day}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
