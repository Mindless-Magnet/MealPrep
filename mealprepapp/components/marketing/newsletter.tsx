"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setEmail("")
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      })
    }, 1000)
  }

  return (
    <section className="py-20 bg-primary/5">
      <div className="container max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Get Exclusive Offers</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for special deals, new meal announcements, and healthy eating tips.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">
          By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
