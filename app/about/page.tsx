"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react"

interface AboutData {
  history: string[]
  activities: string[]
  staff: Array<{ id: number; name: string; position: string }>
  facilities: Array<{ id: number; name: string; description: string }>
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData>({
    history: [],
    activities: [],
    staff: [],
    facilities: [],
  })

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("[v0] Error fetching about data:", err))
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">About Our Library</h1>
        <p className="text-muted-foreground">
          Learn about our mission, history, and the services we provide to our college community.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About Us</CardTitle>
            <CardDescription>The journey of our college library</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Image
              src="/library-top.png"
              alt="Library Building"
              width={800}
              height={400}
              className="w-full rounded-lg object-cover h-64"
            />
            {data.history.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Library Staff</CardTitle>
          <CardDescription>Meet the team behind our library services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.staff.map((person) => (
              <div key={person.id} className="flex flex-col items-center text-center">
                <h3 className="mt-4 text-lg font-medium">{person.name}</h3>
                <p className="text-sm text-muted-foreground">{person.position}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Facilities</CardTitle>
          <CardDescription>What we offer to our users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {data.facilities.map((facility) => (
              <div key={facility.id} className="rounded-lg border p-4">
                <h3 className="font-medium">{facility.name}</h3>
                <p className="mt-2 text-sm">{facility.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
