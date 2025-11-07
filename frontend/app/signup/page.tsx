"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignUpPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to blog immediately
    router.push('/blog')
  }, [router])

  return null
}