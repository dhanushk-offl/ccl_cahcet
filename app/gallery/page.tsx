import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

async function getGalleryData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/gallery`, {
    cache: "no-store",
  })
  if (!res.ok) return []
  return res.json()
}

export default async function GalleryPage() {
  const images = await getGalleryData()

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Library Gallery</h1>
        <p className="text-muted-foreground">Visual tour of our library facilities, events, and collections</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image: any, index: number) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image src={image.imageUrl || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{image.title}</h3>
                <p className="text-sm text-muted-foreground">{image.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{image.category}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
