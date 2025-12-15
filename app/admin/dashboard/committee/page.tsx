"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CommitteeAdminPage() {
  const [formData, setFormData] = useState({
    description: "",
    members: "",
    functions: "",
  })

  useEffect(() => {
    fetchCommittee()
  }, [])

  const fetchCommittee = async () => {
    const res = await fetch("/api/admin/committee")
    const data = await res.json()
    if (data) {
      setFormData({
        description: data.description || "",
        members: data.members?.join("\n") || "",
        functions: data.functions?.join("\n") || "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      description: formData.description,
      members: formData.members.split("\n").filter((line) => line.trim()),
      functions: formData.functions.split("\n").filter((line) => line.trim()),
    }

    await fetch("/api/admin/committee", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    alert("Committee information updated successfully!")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Committee</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Committee Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Enter committee description"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Committee Members</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.members}
              onChange={(e) => setFormData({ ...formData, members: e.target.value })}
              rows={6}
              placeholder="Enter members (one per line, format: Position - Role)"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Committee Functions</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.functions}
              onChange={(e) => setFormData({ ...formData, functions: e.target.value })}
              rows={8}
              placeholder="Enter functions (one per line)"
            />
          </CardContent>
        </Card>

        <Button type="submit" size="lg">
          Update Committee
        </Button>
      </form>
    </div>
  )
}
