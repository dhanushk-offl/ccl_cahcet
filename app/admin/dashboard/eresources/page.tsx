"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EResourcesAdminPage() {
  const [formData, setFormData] = useState({
    url: "",
    description: "",
    ipRange: "",
    username: "",
    password: "",
  })

  useEffect(() => {
    fetchEResources()
  }, [])

  const fetchEResources = async () => {
    const res = await fetch("/api/admin/eresources")
    const data = await res.json()
    if (data) {
      setFormData(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch("/api/admin/eresources", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    alert("E-Resources updated successfully!")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage E-Resources</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>DELNET Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="url">DELNET URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="ipRange">IP Range</Label>
              <Input
                id="ipRange"
                value={formData.ipRange}
                onChange={(e) => setFormData({ ...formData, ipRange: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="text"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg">
          Update E-Resources
        </Button>
      </form>
    </div>
  )
}
