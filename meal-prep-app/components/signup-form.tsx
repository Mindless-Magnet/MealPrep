"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      })
      // Redirect to account page
      window.location.href = "/account"
    }, 1000)
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long and include a number and a special character.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                terms and conditions
              </Link>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="marketing" />
            <label
              htmlFor="marketing"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I want to receive marketing emails
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Log in
          </Link>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Facebook
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
