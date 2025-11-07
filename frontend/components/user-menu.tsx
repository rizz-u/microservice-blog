"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Settings, User, BarChart3 } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="gap-2">
        <Avatar className="w-6 h-6">
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <span className="hidden sm:inline text-sm">Sarah</span>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-border">
            <p className="font-semibold text-sm">Sarah Chen</p>
            <p className="text-xs text-muted-foreground">@sarahchen</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/user/sarahchen"
              className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              View Profile
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              Admin Panel
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-border py-2">
            <button
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors"
              onClick={() => {
                setIsOpen(false)
                // Handle logout
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
