"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, FileText, AlertCircle, TrendingUp, Trash2, CheckCircle, XCircle, Eye } from "lucide-react"
import { useState } from "react"

// Sample admin data
const adminStats = [
  { label: "Total Users", value: "2,847", icon: Users, color: "text-blue-500" },
  { label: "Total Posts", value: "12,394", icon: FileText, color: "text-green-500" },
  { label: "Pending Moderation", value: "23", icon: AlertCircle, color: "text-orange-500" },
  { label: "Growth Rate", value: "24.5%", icon: TrendingUp, color: "text-purple-500" },
]

const analyticsData = [
  { month: "Jan", users: 400, posts: 240, engagement: 24 },
  { month: "Feb", users: 580, posts: 380, engagement: 45 },
  { month: "Mar", users: 720, posts: 500, engagement: 68 },
  { month: "Apr", users: 890, posts: 720, engagement: 89 },
  { month: "May", users: 1200, posts: 950, engagement: 125 },
  { month: "Jun", users: 1600, posts: 1280, engagement: 167 },
]

const contentTypeData = [
  { name: "Articles", value: 6200 },
  { name: "Stories", value: 3100 },
  { name: "Guides", value: 2094 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"]

const pendingPosts = [
  {
    id: 1,
    author: "John Doe",
    title: "Getting Started with Web Dev",
    content: "Learn the basics of web development...",
    timestamp: "2h ago",
    status: "pending",
  },
  {
    id: 2,
    author: "Jane Smith",
    title: "Advanced React Patterns",
    content: "Deep dive into React optimization...",
    timestamp: "4h ago",
    status: "pending",
  },
  {
    id: 3,
    author: "Mike Johnson",
    title: "CSS Grid Mastery",
    content: "Master CSS Grid layouts...",
    timestamp: "6h ago",
    status: "pending",
  },
]

const recentUsers = [
  { id: 1, name: "Alex Chen", email: "alex@example.com", joinDate: "2 days ago", status: "active" },
  { id: 2, name: "Sarah Wilson", email: "sarah@example.com", joinDate: "1 week ago", status: "active" },
  { id: 3, name: "Mike Brown", email: "mike@example.com", joinDate: "2 weeks ago", status: "inactive" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", joinDate: "3 weeks ago", status: "active" },
]

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [approvedPosts, setApprovedPosts] = useState<number[]>([])
  const [rejectedPosts, setRejectedPosts] = useState<number[]>([])

  const handleApprovePost = (id: number) => {
    setApprovedPosts([...approvedPosts, id])
  }

  const handleRejectPost = (id: number) => {
    setRejectedPosts([...rejectedPosts, id])
  }

  const remainingPosts = pendingPosts.filter(
    (post) => !approvedPosts.includes(post.id) && !rejectedPosts.includes(post.id),
  )

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage users, content, and platform analytics</p>
          </div>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {adminStats.map((stat) => {
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

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setSelectedTab("overview")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              selectedTab === "overview"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab("moderation")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              selectedTab === "moderation"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Content Moderation
          </button>
          <button
            onClick={() => setSelectedTab("users")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              selectedTab === "users"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            User Management
          </button>
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border border-border lg:col-span-2">
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>Users, posts, and engagement trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="var(--color-primary)" strokeWidth={2} />
                    <Line type="monotone" dataKey="posts" stroke="var(--color-accent)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Content Types</CardTitle>
                <CardDescription>Distribution of content</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={contentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content Moderation Tab */}
        {selectedTab === "moderation" && (
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Pending Content Review</CardTitle>
              <CardDescription>{remainingPosts.length} posts awaiting moderation</CardDescription>
            </CardHeader>
            <CardContent>
              {remainingPosts.length > 0 ? (
                <div className="space-y-4">
                  {remainingPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">By {post.author}</p>
                        <p className="text-sm text-foreground mt-2 line-clamp-2">{post.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">{post.timestamp}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700 bg-transparent"
                          onClick={() => handleApprovePost(post.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleRejectPost(post.id)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">No pending posts for moderation.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* User Management Tab */}
        {selectedTab === "users" && (
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage platform users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr className="text-sm text-muted-foreground">
                      <th className="text-left py-3 px-4 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 font-semibold">Join Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4 font-medium">{user.name}</td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="py-4 px-4 text-sm">{user.joinDate}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${
                              user.status === "active"
                                ? "bg-green-500/10 text-green-700 dark:text-green-400"
                                : "bg-gray-500/10 text-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {user.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
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
        )}
      </div>
    </main>
  )
}
