"use client"

import { useEffect, useState } from "react"
import { BookOpen, BookText, Library, Bell, Calendar } from "lucide-react"

export function TopMarquee() {
  const [marqueeData, setMarqueeData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/marquee")
      .then((res) => res.json())
      .then((data) => setMarqueeData(data))
  }, [])

  if (!marqueeData) {
    return null
  }

  return (
    <div className="bg-yellow-500 text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <div className="flex items-center mx-4">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>Total Books: {marqueeData.statistics?.totalBooks?.toLocaleString() || 0}</span>
        </div>
        <div className="flex items-center mx-4">
          <BookText className="h-4 w-4 mr-2" />
          <span>Total Journals: {marqueeData.statistics?.totalJournals?.toLocaleString() || 0}</span>
        </div>
        <div className="flex items-center mx-4">
          <Library className="h-4 w-4 mr-2" />
          <span>Total E-Books: {marqueeData.statistics?.totalEBooks?.toLocaleString() || 0}</span>
        </div>
        {marqueeData.latestAnnouncement && (
          <div className="flex items-center mx-4">
            <Bell className="h-4 w-4 mr-2" />
            <span>Latest: {marqueeData.latestAnnouncement.title}</span>
          </div>
        )}
        {marqueeData.hours && (
          <div className="flex items-center mx-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              Library Hours: {marqueeData.hours.time} ({marqueeData.hours.day})
            </span>
          </div>
        )}
        <div className="flex items-center mx-4">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>Total Books: {marqueeData.statistics?.totalBooks?.toLocaleString() || 0}</span>
        </div>
        <div className="flex items-center mx-4">
          <BookText className="h-4 w-4 mr-2" />
          <span>Total Journals: {marqueeData.statistics?.totalJournals?.toLocaleString() || 0}</span>
        </div>
        <div className="flex items-center mx-4">
          <Library className="h-4 w-4 mr-2" />
          <span>Total E-Books: {marqueeData.statistics?.totalEBooks?.toLocaleString() || 0}</span>
        </div>
      </div>
    </div>
  )
}
