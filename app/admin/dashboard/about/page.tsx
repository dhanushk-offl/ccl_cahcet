"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AdminContentList } from "@/components/admin-content-list"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("history")
  const [message, setMessage] = useState("")

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
          <h1 className="text-3xl font-bold">About Section</h1>
          <p className="text-muted-foreground">Manage about, staff, and facilities</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <HistoryTab message={message} setMessage={setMessage} />
        </TabsContent>

        <TabsContent value="activities">
          <ActivitiesTab message={message} setMessage={setMessage} />
        </TabsContent>

        <TabsContent value="staff">
          <StaffTab message={message} setMessage={setMessage} />
        </TabsContent>

        <TabsContent value="facilities">
          <FacilitiesTab message={message} setMessage={setMessage} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function HistoryTab({ message, setMessage }: any) {
  const [items, setItems] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ content: "", order: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/admin/about/history")
      .then((res) => res.json())
      .then(setItems)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const url = editingId ? `/api/admin/about/history/${editingId}` : "/api/admin/about/history"
      const method = editingId ? "PUT" : "POST"

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      setMessage("Saved successfully!")
      setFormData({ content: "", order: 0 })
      setEditingId(null)
      const response = await fetch("/api/admin/about/history")
      setItems(await response.json())
    } catch (error) {
      setMessage("Error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return
    await fetch(`/api/admin/about/history/${id}`, { method: "DELETE" })
    const response = await fetch("/api/admin/about/history")
    setItems(await response.json())
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit" : "Add"} History</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Order</Label>
              <Input
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
                    setFormData({ content: "", order: 0 })
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
          <CardTitle>History Items</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminContentList
            items={items}
            onEdit={(item) => {
              setEditingId(item.id)
              setFormData({ content: item.content, order: item.order })
            }}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function ActivitiesTab({ message, setMessage }: any) {
  const [items, setItems] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ content: "", order: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/admin/about/activities")
      .then((res) => res.json())
      .then(setItems)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const url = editingId ? `/api/admin/about/activities/${editingId}` : "/api/admin/about/activities"
      const method = editingId ? "PUT" : "POST"

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      setMessage("Saved successfully!")
      setFormData({ content: "", order: 0 })
      setEditingId(null)
      const response = await fetch("/api/admin/about/activities")
      setItems(await response.json())
    } catch (error) {
      setMessage("Error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return
    await fetch(`/api/admin/about/activities/${id}`, { method: "DELETE" })
    const response = await fetch("/api/admin/about/activities")
    setItems(await response.json())
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit" : "Add"} Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Order</Label>
              <Input
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
                    setFormData({ content: "", order: 0 })
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
          <CardTitle>Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminContentList
            items={items}
            onEdit={(item) => {
              setEditingId(item.id)
              setFormData({ content: item.content, order: item.order })
            }}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function StaffTab({ message, setMessage }: any) {
  const [items, setItems] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", position: "", order: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/admin/about/staff")
      .then((res) => res.json())
      .then(setItems)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const url = editingId ? `/api/admin/about/staff/${editingId}` : "/api/admin/about/staff"
      const method = editingId ? "PUT" : "POST"

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      setMessage("Saved successfully!")
      setFormData({ name: "", position: "", order: 0 })
      setEditingId(null)
      const response = await fetch("/api/admin/about/staff")
      setItems(await response.json())
    } catch (error) {
      setMessage("Error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return
    await fetch(`/api/admin/about/staff/${id}`, { method: "DELETE" })
    const response = await fetch("/api/admin/about/staff")
    setItems(await response.json())
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit" : "Add"} Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Input
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Order</Label>
              <Input
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
                    setFormData({ name: "", position: "", order: 0 })
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
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminContentList
            items={items}
            onEdit={(item) => {
              setEditingId(item.id)
              setFormData({ name: item.name, position: item.position, order: item.order })
            }}
            onDelete={handleDelete}
            renderItem={(item) => (
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.position}</p>
              </div>
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function FacilitiesTab({ message, setMessage }: any) {
  const [items, setItems] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", description: "", order: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/admin/about/facilities")
      .then((res) => res.json())
      .then(setItems)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const url = editingId ? `/api/admin/about/facilities/${editingId}` : "/api/admin/about/facilities"
      const method = editingId ? "PUT" : "POST"

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      setMessage("Saved successfully!")
      setFormData({ name: "", description: "", order: 0 })
      setEditingId(null)
      const response = await fetch("/api/admin/about/facilities")
      setItems(await response.json())
    } catch (error) {
      setMessage("Error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return
    await fetch(`/api/admin/about/facilities/${id}`, { method: "DELETE" })
    const response = await fetch("/api/admin/about/facilities")
    setItems(await response.json())
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit" : "Add"} Facility</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Order</Label>
              <Input
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
                    setFormData({ name: "", description: "", order: 0 })
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
          <CardTitle>Facilities</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminContentList
            items={items}
            onEdit={(item) => {
              setEditingId(item.id)
              setFormData({ name: item.name, description: item.description, order: item.order })
            }}
            onDelete={handleDelete}
            renderItem={(item) => (
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}
