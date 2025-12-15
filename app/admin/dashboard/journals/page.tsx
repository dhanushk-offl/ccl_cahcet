"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Trash2, Edit } from "lucide-react"
import Link from "next/link"

interface Journal {
  id: number
  name: string
  type: string
  department: string
}

export default function JournalsPage() {
  const [journals, setJournals] = useState<Journal[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", type: "National", department: "" })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [filter, setFilter] = useState({ type: "all", department: "all" })

  useEffect(() => {
    fetchJournals()
    fetchDepartments()
  }, [])

  const fetchJournals = async () => {
    const response = await fetch("/api/admin/journals")
    const data = await response.json()
    setJournals(data)
  }

  const fetchDepartments = async () => {
    const response = await fetch("/api/admin/departments")
    const data = await response.json()
    setDepartments(data.map((d: any) => d.name))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const url = editingId ? `/api/admin/journals/${editingId}` : "/api/admin/journals"
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage(editingId ? "Journal updated!" : "Journal created!")
        setFormData({ name: "", type: "National", department: "" })
        setEditingId(null)
        fetchJournals()
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
      await fetch(`/api/admin/journals/${id}`, { method: "DELETE" })
      setMessage("Journal deleted!")
      fetchJournals()
    } catch (error) {
      setMessage("Failed to delete")
    }
  }

  const handleEdit = (journal: Journal) => {
    setEditingId(journal.id)
    setFormData({ name: journal.name, type: journal.type, department: journal.department })
  }

  const filteredJournals = journals.filter((journal) => {
    if (filter.type !== "all" && journal.type !== filter.type) return false
    if (filter.department !== "all" && journal.department !== filter.department) return false
    return true
  })

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
          <h1 className="text-3xl font-bold">Journals</h1>
          <p className="text-muted-foreground">Manage journal collection</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{editingId ? "Edit" : "Add"} Journal</CardTitle>
            <CardDescription>Add or update journal information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Journal Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="National">National</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                      setFormData({ name: "", type: "National", department: "" })
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
            <CardTitle>Journals ({filteredJournals.length})</CardTitle>
            <div className="flex gap-2 mt-4">
              <Select value={filter.type} onValueChange={(value) => setFilter({ ...filter, type: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="National">National</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filter.department} onValueChange={(value) => setFilter({ ...filter, department: value })}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredJournals.map((journal) => (
                <div key={journal.id} className="border rounded-lg p-3 flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{journal.name}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{journal.type}</span>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{journal.department}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(journal)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(journal.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
