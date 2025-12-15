"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface RulesData {
  general: string[]
  borrowing: string[]
  bookbank: string[]
  practice: string[]
}

export default function RulesPage() {
  const [data, setData] = useState<RulesData>({
    general: [],
    borrowing: [],
    bookbank: [],
    practice: [],
  })

  useEffect(() => {
    fetch("/api/rules")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("[v0] Error fetching rules:", err))
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Rules and Regulations</h1>
        <p className="text-muted-foreground">Guidelines for using the library facilities and resources</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Rules</CardTitle>
          <CardDescription>Rules applicable to all library users</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {data.general.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Borrowing Rules</CardTitle>
          <CardDescription>Rules for borrowing books and materials</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {data.borrowing.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SC/ST Book Bank Facility</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {data.bookbank.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Best Practice of the Library</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {data.practice.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
