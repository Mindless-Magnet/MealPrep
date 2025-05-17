"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { formatPrice } from "@/lib/utils"

export function SubscriptionSettings() {
  const [plan, setPlan] = useState("weekly")
  const [mealsPerWeek, setMealsPerWeek] = useState("10")
  const [isLoading, setIsLoading] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Subscription updated",
        description: "Your meal subscription has been updated successfully.",
      })
    }, 1000)
  }

  const handlePauseToggle = () => {
    setIsPaused(!isPaused)

    toast({
      title: isPaused ? "Subscription resumed" : "Subscription paused",
      description: isPaused
        ? "Your meal deliveries will resume according to your schedule."
        : "Your subscription has been paused. You can resume at any time.",
    })
  }

  const getPlanPrice = () => {
    const mealPrice = 11.99
    const meals = Number.parseInt(mealsPerWeek)

    // Apply discount based on plan and number of meals
    let discount = 0
    if (plan === "weekly") {
      discount = meals >= 12 ? 0.1 : 0
    } else if (plan === "biweekly") {
      discount = 0.05
    } else if (plan === "monthly") {
      discount = 0.15
    }

    const subtotal = mealPrice * meals
    const discountAmount = subtotal * discount

    return {
      perMeal: mealPrice * (1 - discount),
      subtotal,
      discount: discountAmount,
      total: subtotal - discountAmount,
    }
  }

  const pricing = getPlanPrice()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meal Subscription</CardTitle>
          <CardDescription>Manage your meal delivery schedule and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Delivery Frequency</h3>
              <RadioGroup value={plan} onValueChange={setPlan} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                  <RadioGroupItem value="weekly" id="weekly" className="sr-only" />
                  <Label htmlFor="weekly" className="flex flex-col cursor-pointer">
                    <span className="font-medium">Weekly</span>
                    <span className="text-sm text-muted-foreground">Delivery every week</span>
                  </Label>
                </div>
                <div className="border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                  <RadioGroupItem value="biweekly" id="biweekly" className="sr-only" />
                  <Label htmlFor="biweekly" className="flex flex-col cursor-pointer">
                    <span className="font-medium">Bi-Weekly</span>
                    <span className="text-sm text-muted-foreground">Delivery every two weeks</span>
                  </Label>
                </div>
                <div className="border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                  <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
                  <Label htmlFor="monthly" className="flex flex-col cursor-pointer">
                    <span className="font-medium">Monthly</span>
                    <span className="text-sm text-muted-foreground">Delivery once a month</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meals-per-week">Meals Per Delivery</Label>
              <Select value={mealsPerWeek} onValueChange={setMealsPerWeek}>
                <SelectTrigger id="meals-per-week">
                  <SelectValue placeholder="Select number of meals" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 meals</SelectItem>
                  <SelectItem value="8">8 meals</SelectItem>
                  <SelectItem value="10">10 meals</SelectItem>
                  <SelectItem value="12">12 meals</SelectItem>
                  <SelectItem value="15">15 meals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Subscription Summary</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Price per meal</span>
                  <span>{formatPrice(pricing.perMeal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Meals per delivery</span>
                  <span>{mealsPerWeek}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(pricing.subtotal)}</span>
                </div>
                {pricing.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                    <span>Discount</span>
                    <span>-{formatPrice(pricing.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total per delivery</span>
                  <span>{formatPrice(pricing.total)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pause-subscription">Pause Subscription</Label>
                <p className="text-sm text-muted-foreground">Temporarily pause your meal deliveries</p>
              </div>
              <Switch id="pause-subscription" checked={isPaused} onCheckedChange={handlePauseToggle} />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Cancel Subscription</CardTitle>
          <CardDescription>Permanently cancel your meal subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If you cancel your subscription, you will no longer receive meal deliveries. This action cannot be undone.
          </p>
          <Button variant="destructive">Cancel Subscription</Button>
        </CardContent>
      </Card>
    </div>
  )
}
