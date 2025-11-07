"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Heart, MessageCircle, Share2, Zap } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/blog')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])


  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 flex-col justify-center items-center p-8">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-primary">SociBlog</h1>
          <div className="space-y-6 text-xl text-muted-foreground">
            <div className="flex items-center gap-4">
              <Heart className="w-8 h-8 text-red-500" />
              <span>Share your thoughts instantly</span>
            </div>
            <div className="flex items-center gap-4">
              <MessageCircle className="w-8 h-8 text-blue-500" />
              <span>Connect with the community</span>
            </div>
            <div className="flex items-center gap-4">
              <Share2 className="w-8 h-8 text-green-500" />
              <span>Spread your voice far and wide</span>
            </div>
            <div className="flex items-center gap-4">
              <Zap className="w-8 h-8 text-yellow-500" />
              <span>Powered by modern tech</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Landing */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8">
        <div className="max-w-md mx-auto w-full space-y-6">
          <div className="lg:hidden">
            <h1 className="text-4xl font-bold text-primary mb-2">SociBlog</h1>
            <p className="text-muted-foreground">Share your voice with the world</p>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Welcome to SociBlog</h2>
            <p className="text-muted-foreground">Redirecting you to the blog in 3 seconds...</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
