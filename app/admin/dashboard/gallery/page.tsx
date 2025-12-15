"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import AdminContentList from "@/components/admin-content-list"

export default function GalleryAdminPage() {
  const [images, setImages] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
  })

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    const res = await fetch("/api/admin/gallery")
    const data = await res.json()
    setImages(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editingImage ? `/api/admin/gallery/${editingImage.id}` : "/api/admin/gallery"
    const method = editingImage ? "PUT" : "POST"

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    setIsDialogOpen(false)
    setEditingImage(null)
    setFormData({ title: "", description: "", imageUrl: "", category: "" })
    fetchImages()
  }

  const handleEdit = (image: any) => {
    setEditingImage(image)
    setFormData({
      title: image.title,
      description: image.description,
      imageUrl: image.imageUrl,
      category: image.category,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" })
      fetchImages()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Gallery</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingImage(null)
                setFormData({ title: "", description: "", imageUrl: "", category: "" })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingImage ? "Edit Image" : "Add New Image"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingImage ? "Update" : "Create"} Image
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <AdminContentList
        items={images}
        onEdit={handleEdit}
        onDelete={handleDelete}
        renderItem={(image) => (
          <>
            <h3 className="font-medium">{image.title}</h3>
            <p className="text-sm text-muted-foreground">{image.category}</p>
          </>
        )}
      />
    </div>
  )
}
