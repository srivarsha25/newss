"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import CategoryFilter from "@/components/category-filter"
import ArticleGrid from "@/components/article-grid"
import LoadingState from "@/components/loading-state"
import ErrorState from "@/components/error-state"
import TrendingCarousel from "@/components/trending-carousel"
import NewsButtons from "@/components/news-buttons"

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("latest")
  const [activeNewsButton, setActiveNewsButton] = useState("latest")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    fetchArticles()
  }, [selectedCategory])

  const fetchArticles = async () => {
    setLoading(true)
    setError(null)
    try {
      const categoryMap = {
        latest: "latest news",
        trending: "trending",
        vfx: "VFX visual effects",
        cinema: "cinema film",
        technology: "technology",
        entertainment: "entertainment",
        business: "business",
      }

      const query = categoryMap[selectedCategory] || "latest news"
      console.log("[v0] Fetching articles for:", query)

      const response = await fetch(`/api/news?q=${encodeURIComponent(query)}&pageSize=12`)

      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("[v0] Data received:", data)

      if (data.error) {
        throw new Error(data.error)
      }

      setArticles(data.articles || [])
    } catch (err) {
      console.error("[v0] Error in fetchArticles:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch articles")
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  const handleNewsButtonClick = (category) => {
    setActiveNewsButton(category)
    setSelectedCategory(category)
  }

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
        <Header onThemeToggle={toggleTheme} isDark={isDark} />

        <main className="container mx-auto px-4 py-8">
          {!loading && !error && articles.length > 0 && <TrendingCarousel articles={articles} />}

          <div className="mb-8">
            <NewsButtons onCategoryClick={handleNewsButtonClick} activeCategory={activeNewsButton} />
          </div>

          <div className="mb-8">
            <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          </div>

          {loading && <LoadingState />}
          {error && <ErrorState error={error} />}
          {!loading && !error && <ArticleGrid articles={articles} />}
        </main>
      </div>
    </div>
  )
}
