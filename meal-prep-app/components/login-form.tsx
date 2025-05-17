"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login successful",
        description: "You have been logged in to your account.",
      })
      // Redirect to account page
      window.location.href = "/account"
    }, 1000)
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Log in to your account</CardTitle>
        <CardDescription>Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/auth/reset-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full">
            Continue with Facebook
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
