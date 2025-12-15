"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RulesAdminPage() {
  const [formData, setFormData] = useState({
    general: "",
    borrowing: "",
    bookbank: "",
    practice: "",
  })

  useEffect(() => {
    fetchRules()
  }, [])

  const fetchRules = async () => {
    const res = await fetch("/api/admin/rules")
    const data = await res.json()
    if (data) {
      setFormData({
        general: data.general?.join("\n") || "",
        borrowing: data.borrowing?.join("\n") || "",
        bookbank: data.bookbank?.join("\n") || "",
        practice: data.practice?.join("\n") || "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      general: formData.general.split("\n").filter((line) => line.trim()),
      borrowing: formData.borrowing.split("\n").filter((line) => line.trim()),
      bookbank: formData.bookbank.split("\n").filter((line) => line.trim()),
      practice: formData.practice.split("\n").filter((line) => line.trim()),
    }

    await fetch("/api/admin/rules", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    alert("Rules updated successfully!")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Rules & Regulations</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.general}
              onChange={(e) => setFormData({ ...formData, general: e.target.value })}
              rows={6}
              placeholder="Enter general rules (one per line)"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Borrowing Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.borrowing}
              onChange={(e) => setFormData({ ...formData, borrowing: e.target.value })}
              rows={6}
              placeholder="Enter borrowing rules (one per line)"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Book Bank Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.bookbank}
              onChange={(e) => setFormData({ ...formData, bookbank: e.target.value })}
              rows={4}
              placeholder="Enter book bank rules (one per line)"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Library Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.practice}
              onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
              rows={4}
              placeholder="Enter library practices (one per line)"
            />
          </CardContent>
        </Card>

        <Button type="submit" size="lg">
          Update Rules
        </Button>
      </form>
    </div>
  )
}
