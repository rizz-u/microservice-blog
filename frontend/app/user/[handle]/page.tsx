"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { PostCard } from "@/components/post-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, LinkIcon, Calendar, ArrowLeft } from "lucide-react"
import { useState } from "react"

// Sample user profile data
const userData = {
  handle: "sarahchen",
  name: "Sarah Chen",
  avatar: "SC",
  bio: "Full-stack developer, tech writer, and coffee enthusiast. Building amazing things with Next.js and React.",
  location: "San Francisco, CA",
  website: "sarahchen.dev",
  joinDate: "March 2024",
  followers: 2840,
  following: 512,
  isFollowing: false,
  posts: [
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
      id: "6",
      author: "Sarah Chen",
      handle: "sarahchen",
      avatar: "SC",
      content:
        "Just finished reviewing the latest React documentation. The improvements to Server Components are incredible. Can't wait to use them in production.",
      timestamp: "1d ago",
      likes: 156,
      replies: 28,
      reposts: 45,
    },
    {
      id: "7",
      author: "Sarah Chen",
      handle: "sarahchen",
      avatar: "SC",
      content:
        "Spent the morning optimizing our build process. Turbopack reduced build time by 65%. The future of web development is bright!",
      timestamp: "2d ago",
      likes: 421,
      replies: 67,
      reposts: 189,
    },
  ],
}

export default function UserProfilePage() {
  const [isFollowing, setIsFollowing] = useState(userData.isFollowing)
  const [followerCount, setFollowerCount] = useState(userData.followers)

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing)
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1)
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

        {/* Cover Section */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 h-48 border-b border-border" />

        {/* Profile Section */}
        <div className="px-4 pb-4">
          {/* Avatar and Follow Button */}
          <div className="flex justify-between items-start -mt-16 mb-4">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarFallback className="text-2xl">{userData.avatar}</AvatarFallback>
            </Avatar>
            <Button variant={isFollowing ? "outline" : "default"} onClick={handleFollowClick} className="mt-4">
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>

          {/* User Info */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-muted-foreground">@{userData.handle}</p>
          </div>

          {/* Bio */}
          <p className="text-foreground mb-4">{userData.bio}</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            {userData.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {userData.location}
              </div>
            )}
            {userData.website && (
              <a
                href={`https://${userData.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary"
              >
                <LinkIcon className="w-4 h-4" />
                {userData.website}
              </a>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined {userData.joinDate}
            </div>
          </div>

          {/* Follow Stats */}
          <div className="flex gap-6 mb-4 pb-4 border-b border-border">
            <div>
              <span className="font-bold">{userData.following}</span>
              <span className="text-muted-foreground text-sm ml-1">Following</span>
            </div>
            <div>
              <span className="font-bold">{followerCount}</span>
              <span className="text-muted-foreground text-sm ml-1">Followers</span>
            </div>
          </div>
        </div>

        {/* Tabs/Filter */}
        <div className="px-4 border-b border-border flex gap-4">
          <button className="py-4 px-2 border-b-2 border-primary font-bold text-foreground hover:bg-muted/50">
            Posts
          </button>
          <button className="py-4 px-2 border-b-2 border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            Likes
          </button>
          <button className="py-4 px-2 border-b-2 border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            Media
          </button>
        </div>

        {/* Posts Feed */}
        <div>
          {userData.posts.length > 0 ? (
            userData.posts.map((post) => <PostCard key={post.id} {...post} />)
          ) : (
            <div className="flex items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No posts yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
