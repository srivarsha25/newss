"use client"

import { Button } from "@/components/ui/button"

interface NewsButtonsProps {
  onCategoryClick: (category: string) => void
  activeCategory: string
}

export default function NewsButtons({ onCategoryClick, activeCategory }: NewsButtonsProps) {
  const newsCategories = [
    { id: "latest", label: "Latest News" },
    { id: "trending", label: "Trending" },
    { id: "vfx", label: "VFX & Effects" },
    { id: "cinema", label: "Cinema" },
    { id: "technology", label: "Technology" },
    { id: "entertainment", label: "Entertainment" },
    { id: "business", label: "Business" },
  ]

  return (
    <div className="w-full mb-8">
      <div className="flex flex-wrap gap-3">
        {newsCategories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeCategory === category.id ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-secondary"
            }`}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
