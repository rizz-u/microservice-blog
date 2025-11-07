"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

interface UserCardProps {
  name: string
  handle: string
  avatar: string
  bio: string
  followers: number
  isFollowing?: boolean
  onFollowClick?: () => void
}

export function UserCard({ name, handle, avatar, bio, followers, isFollowing = false, onFollowClick }: UserCardProps) {
  const [following, setFollowing] = useState(isFollowing)

  const handleFollow = () => {
    setFollowing(!following)
    onFollowClick?.()
  }

  return (
    <Card className="border border-border hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar>
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">@{handle}</p>
          </div>
          <Button variant={following ? "outline" : "default"} size="sm" onClick={handleFollow}>
            {following ? "Following" : "Follow"}
          </Button>
        </div>

        <p className="text-sm text-foreground mb-3 line-clamp-2">{bio}</p>

        <Link href={`/user/${handle}`} className="text-xs text-primary hover:underline">
          {followers} followers
        </Link>
      </CardContent>
    </Card>
  )
}
