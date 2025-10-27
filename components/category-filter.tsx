"use client"

import { Button } from "@/components/ui/button"

const CATEGORIES = [
  { id: "bahubali", label: "Bahubali" },
  { id: "vfx", label: "VFX" },
  { id: "visual effects", label: "Visual Effects" },
  { id: "cinema", label: "Cinema" },
  { id: "filmmaking", label: "Filmmaking" },
  { id: "special effects", label: "Special Effects" },
  { id: "animation", label: "Animation" },
]

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className="rounded-full"
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
