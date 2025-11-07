"use client"

import { TrendingUsers } from "./trending-users"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SuggestedSidebar() {
  return (
    <aside className="hidden lg:block space-y-4">
      {/* Search Suggestion */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-lg">What's happening?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Join thousands of writers and creators sharing their stories daily.</p>
          <p className="text-xs">Discover new perspectives and expand your knowledge.</p>
        </CardContent>
      </Card>

      {/* Trending Users */}
      <TrendingUsers />
    </aside>
  )
}
