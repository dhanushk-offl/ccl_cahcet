"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Trash2, Edit, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Syllabus {
  id: number
  department: string
  year: string
  pdfLink: string
  level: string
}

export default function SyllabiPage() {
  const [syllabi, setSyllabi] = useState<Syllabus[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ department: "", year: "", pdfLink: "", level: "UG" })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchSyllabi()
  }, [])

  const fetchSyllabi = async () => {
    const response = await fetch("/api/admin/syllabi")
    const data = await response.json()
    setSyllabi(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const url = editingId ? `/api/admin/syllabi/${editingId}` : "/api/admin/syllabi"
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage(editingId ? "Syllabus updated!" : "Syllabus created!")
        setFormData({ department: "", year: "", pdfLink: "", level: "UG" })
        setEditingId(null)
        fetchSyllabi()
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
      await fetch(`/api/admin/syllabi/${id}`, { method: "DELETE" })
      setMessage("Syllabus deleted!")
      fetchSyllabi()
    } catch (error) {
      setMessage("Failed to delete")
    }
  }

  const handleEdit = (syllabus: Syllabus) => {
    setEditingId(syllabus.id)
    setFormData({
      department: syllabus.department,
      year: syllabus.year,
      pdfLink: syllabus.pdfLink,
      level: syllabus.level,
    })
  }

  const ugSyllabi = syllabi.filter((s) => s.level === "UG")
  const pgSyllabi = syllabi.filter((s) => s.level === "PG")

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
          <h1 className="text-3xl font-bold">Syllabi</h1>
          <p className="text-muted-foreground">Manage department syllabi</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{editingId ? "Edit" : "Add"} Syllabus</CardTitle>
            <CardDescription>Add or update syllabus information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                    <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g., CSE, IT, ECE"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Academic Year</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g., 2021, 2023-2024"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pdfLink">PDF Link</Label>
                <Input
                  id="pdfLink"
                  value={formData.pdfLink}
                  onChange={(e) => setFormData({ ...formData, pdfLink: e.target.value })}
                  placeholder="https://..."
                  required
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
                      setFormData({ department: "", year: "", pdfLink: "", level: "UG" })
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Syllabi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Undergraduate (UG) - {ugSyllabi.length}</h3>
              <div className="space-y-2">
                {ugSyllabi.map((syllabus) => (
                  <div key={syllabus.id} className="border rounded-lg p-3 flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium">
                        {syllabus.department} - {syllabus.year}
                      </p>
                      <a
                        href={syllabus.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                      >
                        View PDF <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(syllabus)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(syllabus.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Postgraduate (PG) - {pgSyllabi.length}</h3>
              <div className="space-y-2">
                {pgSyllabi.map((syllabus) => (
                  <div key={syllabus.id} className="border rounded-lg p-3 flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium">
                        {syllabus.department} - {syllabus.year}
                      </p>
                      <a
                        href={syllabus.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                      >
                        View PDF <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(syllabus)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(syllabus.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
