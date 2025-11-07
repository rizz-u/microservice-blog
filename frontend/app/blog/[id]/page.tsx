"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Heart, MessageSquare, Share2, ArrowLeft } from "lucide-react"
import { useState } from "react"

// Sample blog post data
const blogPost = {
  id: 1,
  title: "Getting Started with Next.js 16",
  excerpt:
    "Learn about the latest features and improvements in Next.js 16, including Turbopack and React Compiler support.",
  author: "Sarah Chen",
  authorImage: "/author-profile.png",
  date: "2025-01-15",
  readTime: "5 min read",
  category: "Tutorial",
  image: "/next-js-16-development.jpg",
  content: `
    <h2>Introduction</h2>
    <p>Next.js 16 brings exciting new features and performance improvements that make building modern web applications easier than ever. In this comprehensive guide, we'll explore the key highlights and how to leverage them in your projects.</p>

    <h2>Turbopack: The Next Generation Bundler</h2>
    <p>Turbopack is now the default bundler for Next.js 16, providing lightning-fast build times and improved development experience. With incremental compilation and intelligent caching, you'll see dramatic improvements in build performance.</p>
    <ul>
      <li>75% faster builds compared to the previous Webpack setup</li>
      <li>Instant HMR (Hot Module Replacement) for rapid iteration</li>
      <li>Better memory efficiency for large projects</li>
    </ul>

    <h2>React Compiler Support</h2>
    <p>The React Compiler is now stable and integrated with Next.js 16. This feature automatically optimizes your React components by identifying and memoizing only the parts that need to be re-rendered.</p>

    <h2>Enhanced Server Components</h2>
    <p>Server Components in Next.js 16 are more powerful than ever. You can now use async/await directly in components, access databases and external APIs, and keep sensitive information on the server.</p>

    <h2>Conclusion</h2>
    <p>Next.js 16 represents a significant step forward in framework capabilities and performance. Whether you're starting a new project or upgrading an existing one, these features will help you build faster, more efficient applications.</p>
  `,
  views: 1250,
  likes: 48,
  comments: 12,
}

export default function BlogPostPage() {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(blogPost.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Post Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded inline-block">
              {blogPost.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-pretty">{blogPost.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{blogPost.excerpt}</p>

          {/* Author Info */}
          <div className="flex items-center gap-4 py-6 border-y border-border">
            <img
              src={blogPost.authorImage || "/placeholder.svg"}
              alt={blogPost.author}
              className="w-12 h-12 rounded-full bg-muted"
            />
            <div className="flex-1">
              <p className="font-semibold">{blogPost.author}</p>
              <p className="text-sm text-muted-foreground">
                {blogPost.date} • {blogPost.readTime} • {blogPost.views} views
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleLike}>
                <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                {likeCount}
              </Button>
              <Button size="sm" variant="outline">
                <MessageSquare className="w-4 h-4" />
                {blogPost.comments}
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden border border-border">
          <img src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} className="w-full h-auto" />
        </div>

        {/* Post Content */}
        <div className="prose prose-invert max-w-none mb-8">
          <div
            className="text-foreground leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{
              __html: blogPost.content
                .replace(/<h2>/g, '<h2 className="text-2xl font-bold mt-6 mb-4">')
                .replace(/<p>/g, '<p className="text-base">')
                .replace(/<ul>/g, '<ul className="list-disc list-inside space-y-2">')
                .replace(/<li>/g, '<li className="text-base">'),
            }}
          />
        </div>

        {/* Related Actions */}
        <Card className="border border-border bg-muted/30 mt-12">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" onClick={handleLike}>
                <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                {liked ? "Liked" : "Like this post"}
              </Button>
              <Button className="flex-1 bg-transparent" variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </article>
    </main>
  )
}
