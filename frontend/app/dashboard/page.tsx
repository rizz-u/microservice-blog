"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Eye, MessageSquare, Heart, Zap } from "lucide-react"

// Sample dashboard data
const userPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 16",
    status: "Published",
    views: 1250,
    likes: 48,
    comments: 12,
    date: "2025-01-15",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    status: "Draft",
    views: 0,
    likes: 0,
    comments: 0,
    date: "2025-01-14",
  },
  {
    id: 3,
    title: "CSS Mastery Guide",
    status: "Published",
    views: 856,
    likes: 34,
    comments: 8,
    date: "2025-01-10",
  },
]

const analyticsData = [
  { week: "Week 1", views: 240, likes: 24 },
  { week: "Week 2", views: 381, likes: 45 },
  { week: "Week 3", views: 200, likes: 18 },
  { week: "Week 4", views: 470, likes: 52 },
  { week: "Week 5", views: 590, likes: 68 },
  { week: "Week 6", views: 1200, likes: 95 },
]

const stats = [
  { label: "Total Views", value: "3,867", icon: Eye, color: "text-blue-500" },
  { label: "Total Likes", value: "237", icon: Heart, color: "text-red-500" },
  { label: "Total Comments", value: "56", icon: MessageSquare, color: "text-purple-500" },
  { label: "Engagement Rate", value: "12.4%", icon: Zap, color: "text-yellow-500" },
]

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's your blog performance overview.</p>
          </div>
          <Button asChild>
            <Link href="/new-post">New Post</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border border-border lg:col-span-2">
            <CardHeader>
              <CardTitle>Views & Likes Trend</CardTitle>
              <CardDescription>Your engagement over the past 6 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="var(--color-primary)" strokeWidth={2} />
                  <Line type="monotone" dataKey="likes" stroke="var(--color-accent)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Post Status</CardTitle>
              <CardDescription>Your posts at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[{ name: "Posts", Published: 2, Draft: 1 }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Published" fill="var(--color-primary)" />
                  <Bar dataKey="Draft" fill="var(--color-muted)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Your Posts</CardTitle>
            <CardDescription>Manage and view all your published and draft posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-sm text-muted-foreground">
                    <th className="text-left py-3 px-4 font-semibold">Title</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-center py-3 px-4 font-semibold">Views</th>
                    <th className="text-center py-3 px-4 font-semibold">Likes</th>
                    <th className="text-center py-3 px-4 font-semibold">Comments</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userPosts.map((post) => (
                    <tr key={post.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 font-medium line-clamp-1">{post.title}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            post.status === "Published"
                              ? "bg-green-500/10 text-green-700 dark:text-green-400"
                              : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm">{post.views}</td>
                      <td className="py-4 px-4 text-center text-sm">{post.likes}</td>
                      <td className="py-4 px-4 text-center text-sm">{post.comments}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/blog/${post.id}/edit`}>Edit</Link>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
