"use client"

import Link from "next/link"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react"

interface PostCardProps {
  id: string
  author: string
  handle: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies: number
  reposts: number
  image?: string
}

export function PostCard({
  id,
  author,
  handle,
  avatar,
  content,
  timestamp,
  likes,
  replies,
  reposts,
  image,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="border-b border-border rounded-none px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer">
      <Link href={`/post/${id}`}>
        <div className="flex gap-3">
          {/* Avatar */}
          <Avatar>
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold hover:underline">{author}</span>
                <span className="text-muted-foreground">@{handle}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground text-sm">{timestamp}</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Text Content */}
            <p className="text-foreground mt-2 break-words">{content}</p>

            {/* Image */}
            {image && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-border">
                <img src={image || "/placeholder.svg"} alt="Post image" className="w-full h-auto" />
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between mt-3 text-muted-foreground max-w-xs text-sm">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 hover:text-blue-500 group"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <MessageCircle className="w-4 h-4 group-hover:bg-blue-500/10 rounded-full p-2 w-8 h-8" />
                <span className="group-hover:text-blue-500">{replies}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 hover:text-green-500 group"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <Share className="w-4 h-4 group-hover:bg-green-500/10 rounded-full p-2 w-8 h-8" />
                <span className="group-hover:text-green-500">{reposts}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 group"
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
              >
                <Heart
                  className={`w-4 h-4 group-hover:bg-red-500/10 rounded-full p-2 w-8 h-8 ${
                    isLiked ? "fill-red-500 text-red-500" : "group-hover:text-red-500"
                  }`}
                />
                <span className={isLiked ? "text-red-500" : "group-hover:text-red-500"}>{likes}</span>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}
