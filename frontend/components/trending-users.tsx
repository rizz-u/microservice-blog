"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCard } from "./user-card"

interface TrendingUser {
  name: string
  handle: string
  avatar: string
  bio: string
  followers: number
}

interface TrendingUsersProps {
  users?: TrendingUser[]
}

const defaultUsers: TrendingUser[] = [
  {
    name: "Sarah Chen",
    handle: "sarahchen",
    avatar: "SC",
    bio: "Full-stack developer and tech writer sharing insights on modern web development.",
    followers: 2840,
  },
  {
    name: "Emma Rodriguez",
    handle: "emmarod",
    avatar: "ER",
    bio: "Design enthusiast exploring the intersection of UI/UX and web development.",
    followers: 1920,
  },
  {
    name: "Marcus Johnson",
    handle: "marcusj",
    avatar: "MJ",
    bio: "Content creator focusing on web development best practices and tutorials.",
    followers: 1560,
  },
]

export function TrendingUsers({ users = defaultUsers }: TrendingUsersProps) {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>Trending Creators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user) => (
          <UserCard
            key={user.handle}
            name={user.name}
            handle={user.handle}
            avatar={user.avatar}
            bio={user.bio}
            followers={user.followers}
          />
        ))}
      </CardContent>
    </Card>
  )
}
