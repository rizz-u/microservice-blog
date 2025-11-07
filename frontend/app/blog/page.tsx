"use client"
import { PostCard } from "@/components/post-card"
import { Navigation } from "@/components/navigation"
import { SuggestedSidebar } from "@/components/suggested-sidebar"
import { Search } from "lucide-react"
import { useState } from "react"

// Sample timeline posts data - social media style
const timelinePosts = [
  {
    id: "1",
    author: "Sarah Chen",
    handle: "sarahchen",
    avatar: "SC",
    content:
      "Just published my latest article on Next.js 16! Excited about Turbopack and the new React Compiler. Check it out if you're interested in modern web development.",
    timestamp: "2h ago",
    likes: 234,
    replies: 45,
    reposts: 89,
    image: "/placeholder.svg?key=fda4y",
  },
  {
    id: "2",
    author: "Marcus Johnson",
    handle: "marcusj",
    avatar: "MJ",
    content:
      "The art of writing engaging content isn't about being perfect. It's about being authentic and connecting with your readers. Here are my top 5 tips for creating better blog posts.",
    timestamp: "4h ago",
    likes: 156,
    replies: 32,
    reposts: 67,
  },
  {
    id: "3",
    author: "Emma Rodriguez",
    handle: "emmarod",
    avatar: "ER",
    content:
      "Tailwind CSS has completely changed how I approach UI development. The utility-first workflow is so intuitive. Finished a new design system with it today!",
    timestamp: "6h ago",
    likes: 298,
    replies: 54,
    reposts: 112,
    image: "/placeholder.svg?key=2pfla",
  },
  {
    id: "4",
    author: "Alex Kim",
    handle: "alexkim",
    avatar: "AK",
    content:
      "React Hooks are powerful, but they require discipline. Just finished writing a deep dive on common mistakes and how to avoid them. Drop a comment if you have questions!",
    timestamp: "8h ago",
    likes: 187,
    replies: 38,
    reposts: 76,
  },
  {
    id: "5",
    author: "Jordan Lee",
    handle: "jordanlee",
    avatar: "JL",
    content:
      "Web performance matters more than ever. Optimizing our app reduced load time by 60%. Here's what we did: image optimization, code splitting, and caching strategies.",
    timestamp: "12h ago",
    likes: 412,
    replies: 67,
    reposts: 189,
  },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = timelinePosts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Header with Search */}
            <div className="border border-border rounded-lg mb-6 sticky top-20 z-40 bg-background p-4">
              <h1 className="text-2xl font-bold mb-4">Timeline</h1>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Timeline Feed */}
            <div className="border border-border rounded-lg overflow-hidden">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => <PostCard key={post.id} {...post} />)
              ) : (
                <div className="flex items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground text-lg">No posts found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar with Trending Users */}
          <SuggestedSidebar />
        </div>
      </div>
    </main>
  )
}
