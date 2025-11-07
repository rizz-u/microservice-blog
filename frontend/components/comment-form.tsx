"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface CommentFormProps {
  onSubmit?: (content: string) => void
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState("")

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit?.(content)
      setContent("")
    }
  }

  return (
    <div className="flex gap-3 p-4 border-b border-border">
      {/* Avatar */}
      <Avatar>
        <AvatarFallback>You</AvatarFallback>
      </Avatar>

      {/* Form */}
      <div className="flex-1 min-w-0">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What do you think?"
          className="w-full text-lg text-foreground bg-transparent placeholder:text-muted-foreground focus:outline-none resize-none"
          rows={3}
        />

        <div className="flex justify-end mt-4">
          <Button disabled={!content.trim()} onClick={handleSubmit}>
            Reply
          </Button>
        </div>
      </div>
    </div>
  )
}
