"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share } from "lucide-react"
import { useState } from "react"

interface CommentProps {
  id: string
  author: string
  handle: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies?: number
}

export function Comment({ id, author, handle, avatar, content, timestamp, likes, replies = 0 }: CommentProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  return (
    <div className="flex gap-3 py-3 px-4 border-b border-border hover:bg-muted/30 transition-colors">
      {/* Avatar */}
      <Avatar className="w-10 h-10">
        <AvatarFallback>{author.charAt(0)}</AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">{author}</span>
          <span className="text-muted-foreground text-sm">@{handle}</span>
          <span className="text-muted-foreground text-xs">·</span>
          <span className="text-muted-foreground text-xs">{timestamp}</span>
        </div>

        <p className="text-foreground mt-2 text-sm break-words">{content}</p>

        {/* Mini Actions */}
        <div className="flex justify-between mt-2 text-muted-foreground max-w-xs text-xs">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 h-6 px-2 hover:text-blue-500 group"
            onClick={(e) => e.preventDefault()}
          >
            <MessageCircle className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 h-6 px-2 hover:text-green-500 group"
            onClick={(e) => e.preventDefault()}
          >
            <Share className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 h-6 px-2 group"
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
              setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
            }}
          >
            <Heart className={`w-3 h-3 ${isLiked ? "fill-red-500 text-red-500" : "group-hover:text-red-500"}`} />
            <span className={isLiked ? "text-red-500" : ""}>{likeCount}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
