"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ImageIcon, Smile } from "lucide-react"

export function ComposeTweet() {
  const [content, setContent] = useState("")

  const handlePost = () => {
    if (content.trim()) {
      console.log("Posting:", content)
      setContent("")
    }
  }

  return (
    <Card className="border border-border px-4 py-3 rounded-none border-b">
      <div className="flex gap-4">
        {/* Avatar */}
        <Avatar>
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>

        {/* Compose Area */}
        <div className="flex-1">
          <textarea
            placeholder="What's happening!?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-xl bg-transparent text-foreground placeholder-muted-foreground outline-none resize-none"
            rows={3}
          />

          {/* Actions */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2 text-primary">
              <button className="p-2 hover:bg-primary/10 rounded-full transition">
                <ImageIcon className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-primary/10 rounded-full transition">
                <Smile className="w-4 h-4" />
              </button>
            </div>
            <Button onClick={handlePost} disabled={!content.trim()} size="lg" className="rounded-full">
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
