"use client"

import { useEffect, useRef } from "react"
import { TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Article {
  url: string
  title: string
  description: string
  urlToImage: string
  source: { name: string }
  publishedAt: string
}

interface TrendingCarouselProps {
  articles: Article[]
}

export default function TrendingCarousel({ articles }: TrendingCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let scrollPosition = 0
    const scrollSpeed = 1
    const maxScroll = container.scrollWidth - container.clientWidth

    const autoScroll = () => {
      scrollPosition += scrollSpeed
      if (scrollPosition > maxScroll) {
        scrollPosition = 0
      }
      container.scrollLeft = scrollPosition
    }

    const interval = setInterval(autoScroll, 30)
    return () => clearInterval(interval)
  }, [])

  const trendingArticles = articles.slice(0, 8)

  if (trendingArticles.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Trending Now</h2>
      </div>

      <div className="relative overflow-hidden rounded-lg">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollBehavior: "auto" }}
        >
          {trendingArticles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-80 group/card cursor-pointer"
            >
              <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative h-40 overflow-hidden bg-muted">
                  <img
                    src={article.urlToImage || "/news-collage.png"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/news-collage.png"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                      {article.source.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground line-clamp-2 text-sm group-hover/card:text-primary transition-colors">
                    {article.title}
                  </h3>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
}
