"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PolicyAdminPage() {
  const [formData, setFormData] = useState({
    vision: "",
    mission: "",
    objectives: "",
    circulationPolicy: "",
    generalPolicy: "",
    finePolicy: "",
  })

  useEffect(() => {
    fetchPolicy()
  }, [])

  const fetchPolicy = async () => {
    const res = await fetch("/api/admin/policy")
    const data = await res.json()
    if (data) {
      setFormData({
        vision: data.vision?.join("\n") || "",
        mission: data.mission?.join("\n") || "",
        objectives: data.objectives?.join("\n") || "",
        circulationPolicy: data.circulationPolicy?.join("\n") || "",
        generalPolicy: data.generalPolicy?.join("\n") || "",
        finePolicy: data.finePolicy?.join("\n") || "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      vision: formData.vision.split("\n").filter((line) => line.trim()),
      mission: formData.mission.split("\n").filter((line) => line.trim()),
      objectives: formData.objectives.split("\n").filter((line) => line.trim()),
      circulationPolicy: formData.circulationPolicy.split("\n").filter((line) => line.trim()),
      generalPolicy: formData.generalPolicy.split("\n").filter((line) => line.trim()),
      finePolicy: formData.finePolicy.split("\n").filter((line) => line.trim()),
    }

    await fetch("/api/admin/policy", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    alert("Policy updated successfully!")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Library Policy</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              rows={4}
              placeholder="Enter vision points (one per line)"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              rows={4}
              placeholder="Enter mission points (one per line)"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.objectives}
              onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
              rows={6}
              placeholder="Enter objectives (one per line)"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Circulation Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.circulationPolicy}
              onChange={(e) => setFormData({ ...formData, circulationPolicy: e.target.value })}
              rows={6}
              placeholder="Enter circulation policy points (one per line)"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>General Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.generalPolicy}
              onChange={(e) => setFormData({ ...formData, generalPolicy: e.target.value })}
              rows={6}
              placeholder="Enter general policy points (one per line)"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fine Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.finePolicy}
              onChange={(e) => setFormData({ ...formData, finePolicy: e.target.value })}
              rows={6}
              placeholder="Enter fine policy points (one per line)"
            />
          </CardContent>
        </Card>

        <Button type="submit" size="lg">
          Update Policy
        </Button>
      </form>
    </div>
  )
}
