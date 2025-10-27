export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || "general"
  const pageSize = searchParams.get("pageSize") || "12"

  console.log("[v0] Fetching news for query:", query)

  try {
    const apiKey = process.env.NEWS_API_KEY

    if (!apiKey) {
      console.log("[v0] No API key found, returning demo data")
      return Response.json({
        articles: [
          {
            source: { id: null, name: "Demo Source" },
            author: "Demo Author",
            title: "Welcome to News Feed App",
            description: "This is a demo article. Please add your NewsAPI key to fetch real articles.",
            url: "#",
            urlToImage: "/news-collage.png",
            publishedAt: new Date().toISOString(),
            content: "Demo content",
          },
        ],
      })
    }

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=${pageSize}&apiKey=${apiKey}`,
      { next: { revalidate: 3600 } },
    )

    console.log("[v0] API Response status:", response.status)

    if (!response.ok) {
      console.log("[v0] API Error:", response.statusText)
      // Fallback: return mock data for demo purposes
      return Response.json({
        articles: [
          {
            source: { id: null, name: "Demo Source" },
            author: "Demo Author",
            title: "Welcome to News Feed App",
            description: "This is a demo article. Please add your NewsAPI key to fetch real articles.",
            url: "#",
            urlToImage: "/news-collage.png",
            publishedAt: new Date().toISOString(),
            content: "Demo content",
          },
        ],
      })
    }

    const data = await response.json()
    console.log("[v0] Articles fetched:", data.articles?.length || 0)
    return Response.json(data)
  } catch (error) {
    console.error("[v0] Fetch error:", error)
    return Response.json({ error: "Failed to fetch articles", articles: [] }, { status: 500 })
  }
}
