"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface ContentItem {
  id: number | string
  content?: string
  [key: string]: any
}

interface AdminContentListProps {
  items: ContentItem[]
  onEdit: (item: ContentItem) => void
  onDelete: (id: string | number) => void
  renderItem?: (item: ContentItem) => React.ReactNode
}

export default function AdminContentList({ items, onEdit, onDelete, renderItem }: AdminContentListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="border rounded-lg p-4 flex justify-between items-start">
          <div className="flex-1">{renderItem ? renderItem(item) : <p className="text-sm">{item.content}</p>}</div>
          <div className="flex gap-2 ml-4">
            <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Also export as named export for flexibility
export { AdminContentList }
