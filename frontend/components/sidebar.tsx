"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Bell, Mail, Bookmark, User, Search } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard", label: "Explore", icon: Search },
    { href: "/dashboard", label: "Notifications", icon: Bell },
    { href: "/dashboard", label: "Messages", icon: Mail },
    { href: "/dashboard", label: "Bookmarks", icon: Bookmark },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border px-4 py-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          SociBlog
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive(item.href) ? "default" : "ghost"}
                className="w-full justify-start gap-4"
                size="lg"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-md">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span>{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Post Button */}
      <div className="space-y-4">
        <Button variant="default" size="lg" className="w-full">
          <Link href="/compose">Post</Link>
        </Button>
      </div>
    </div>
  )
}
