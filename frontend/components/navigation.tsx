"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenTool, Menu, X } from "lucide-react"
import { useState } from "react"
import { UserMenu } from "./user-menu"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">BlogHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/blog" className="text-sm text-foreground hover:text-primary transition-colors">
              Discover
            </Link>
            {/* Make 'Write' visually match other nav links (same highlight color) */}
            <Link href="/new-post" className="text-sm text-foreground hover:text-primary transition-colors">
              Write
            </Link>
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button className="sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-border py-4 space-y-3">
            <Link href="/dashboard" className="block text-sm text-foreground hover:text-primary px-4 py-2">
              Dashboard
            </Link>
            <Link href="/blog" className="block text-sm text-foreground hover:text-primary px-4 py-2">
              Discover
            </Link>
            <Link href="/new-post" className="block text-sm text-foreground hover:text-primary px-4 py-2 transition-colors">
              Write
            </Link>
            <div className="px-4 py-2">
              <UserMenu />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
