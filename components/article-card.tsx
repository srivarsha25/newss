import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface Article {
  url: string
  title: string
  description: string
  urlToImage: string
  source: { name: string }
  publishedAt: string
}

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const imageUrl = article.urlToImage || "/news-collage.png"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "/news-collage.png"
          }}
        />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
            {article.source.name}
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(article.publishedAt)}</span>
        </div>
        <h3 className="font-bold text-foreground line-clamp-2 mt-2 text-sm">{article.title}</h3>
      </CardHeader>

      <CardContent className="pb-3 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.description || "No description available"}
        </p>
      </CardContent>

      <CardFooter>
        <Button asChild variant="default" className="w-full">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Read More
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
