"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarClock, Clock, AlertCircle } from "lucide-react"

export function SubscriptionSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meal Subscription</CardTitle>
          <CardDescription>Manage your meal delivery schedule and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <CalendarClock className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Subscription Management Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              We're working on a new subscription management system that will allow you to customize your meal plan,
              delivery frequency, and more. Stay tuned for updates!
            </p>
            <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3 text-left mt-4 max-w-md">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Early Access</p>
                <p className="text-sm text-muted-foreground">
                  Want to try our subscription service before it's officially released? Join our early access program.
                </p>
              </div>
            </div>
            <Button className="mt-4">
              <Clock className="mr-2 h-4 w-4" />
              Join Early Access
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
