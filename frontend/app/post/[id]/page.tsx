"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Comment } from "@/components/comment"
import { CommentForm } from "@/components/comment-form"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, ArrowLeft } from "lucide-react"
import { useState } from "react"

// Sample post data with comments
const postData = {
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
  fullContent: `Just published my latest article on Next.js 16! Excited about Turbopack and the new React Compiler. Check it out if you're interested in modern web development.

Next.js 16 brings incredible performance improvements and developer experience enhancements. The new React Compiler support is a game-changer for optimization.

Key features:
- Turbopack as default bundler (75% faster)
- React Compiler support (stable)
- Enhanced Server Components
- Better developer tools

If you're working with Next.js, I highly recommend upgrading to see the improvements in your own projects.`,
  comments: [
    {
      id: "c1",
      author: "Alex Kim",
      handle: "alexkim",
      avatar: "AK",
      content: "Great insights on Next.js 16! Have you benchmarked the performance improvements yourself?",
      timestamp: "1h ago",
      likes: 12,
    },
    {
      id: "c2",
      author: "Emma Rodriguez",
      handle: "emmarod",
      avatar: "ER",
      content: "The React Compiler support is exactly what we needed. Our team is already planning the upgrade.",
      timestamp: "45m ago",
      likes: 24,
    },
    {
      id: "c3",
      author: "Marcus Johnson",
      handle: "marcusj",
      avatar: "MJ",
      content: "Thanks for the breakdown! This makes the migration path much clearer for our organization.",
      timestamp: "30m ago",
      likes: 8,
    },
  ],
}

export default function PostDetailPage() {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(postData.likes)
  const [allComments, setAllComments] = useState(postData.comments)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const handleCommentSubmit = (content: string) => {
    const newComment = {
      id: `c${allComments.length + 1}`,
      author: "You",
      handle: "yourhandle",
      avatar: "Y",
      content,
      timestamp: "now",
      likes: 0,
    }
    setAllComments([...allComments, newComment])
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-2xl mx-auto border-r border-l border-border">
        {/* Header */}
        <div className="border-b border-border sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
        </div>

        {/* Post */}
        <div className="border-b border-border">
          <div className="p-4">
            {/* Author Info */}
            <div className="flex gap-3 mb-4">
              <Avatar>
                <AvatarFallback>{postData.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{postData.author}</span>
                  <span className="text-muted-foreground">@{postData.handle}</span>
                </div>
                <span className="text-muted-foreground text-sm">{postData.timestamp}</span>
              </div>
            </div>

            {/* Content */}
            <p className="text-xl text-foreground mb-4 whitespace-pre-wrap">{postData.fullContent}</p>

            {/* Image */}
            {postData.image && (
              <div className="mb-4 rounded-2xl overflow-hidden border border-border">
                <img src={postData.image || "/placeholder.svg"} alt="Post image" className="w-full h-auto" />
              </div>
            )}

            {/* Stats */}
            <div className="flex gap-4 py-3 text-sm text-muted-foreground border-y border-border mb-4">
              <span>{likeCount} Likes</span>
              <span>{allComments.length} Replies</span>
              <span>{postData.reposts} Reposts</span>
            </div>

            {/* Actions */}
            <div className="flex justify-between text-muted-foreground mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 hover:text-blue-500 group flex-1"
                onClick={(e) => e.preventDefault()}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 hover:text-green-500 group flex-1"
                onClick={(e) => e.preventDefault()}
              >
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 group flex-1" onClick={handleLike}>
                <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : "group-hover:text-red-500"}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <CommentForm onSubmit={handleCommentSubmit} />

        {/* Comments Section */}
        <div>
          {allComments.length > 0 ? (
            allComments.map((comment) => <Comment key={comment.id} {...comment} />)
          ) : (
            <div className="flex items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No replies yet. Be the first to reply!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
