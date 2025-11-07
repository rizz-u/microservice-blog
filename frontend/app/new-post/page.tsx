"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, Save, Eye } from "lucide-react"
import { useState } from "react"

export default function NewPostPage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("Tutorial")
  const [preview, setPreview] = useState(false)

  const categories = ["Tutorial", "Writing", "Design", "Performance", "News"]

  const handlePublish = () => {
    alert("Post published successfully!")
  }

  const handleSaveDraft = () => {
    alert("Draft saved successfully!")
  }

  if (preview) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button asChild variant="ghost" className="mb-6" onClick={() => setPreview(false)}>
            <span className="gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Editor
            </span>
          </Button>

          <div className="mb-8">
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded inline-block">
                {category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-pretty">{title || "Untitled Post"}</h1>
            <p className="text-lg text-muted-foreground mb-6">{excerpt || "No excerpt yet..."}</p>
          </div>

          <div className="mb-8 rounded-lg overflow-hidden border border-border bg-muted h-80 flex items-center justify-center">
            <p className="text-muted-foreground">Featured image preview</p>
          </div>

          <div className="prose prose-invert max-w-none mb-8 space-y-4">
            {content ? (
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">{content}</div>
            ) : (
              <p className="text-muted-foreground">Your content will appear here...</p>
            )}
          </div>

          <Button className="w-full" onClick={() => setPreview(false)}>
            Continue Editing
          </Button>
        </article>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button asChild variant="ghost" className="mb-4">
              <Link href="/dashboard" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Create New Post</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handlePublish}>Publish</Button>
          </div>
        </div>

        {/* Editor */}
        <Card className="border border-border mb-6">
          <CardHeader>
            <CardTitle>Post Title</CardTitle>
            <CardDescription>Give your post an engaging title</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </CardContent>
        </Card>

        <Card className="border border-border mb-6">
          <CardHeader>
            <CardTitle>Excerpt</CardTitle>
            <CardDescription>A brief summary of your post</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Enter post excerpt..."
              rows={2}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </CardContent>
        </Card>

        <Card className="border border-border mb-6">
          <CardHeader>
            <CardTitle>Category</CardTitle>
            <CardDescription>Select a category for your post</CardDescription>
          </CardHeader>
          <CardContent>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        <Card className="border border-border mb-6">
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>Write your blog post content</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your post..."
              rows={15}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Preview Button */}
        <Button className="w-full bg-transparent" variant="outline" onClick={() => setPreview(true)}>
          <Eye className="w-4 h-4 mr-2" />
          Preview Post
        </Button>
      </div>
    </main>
  )
}
