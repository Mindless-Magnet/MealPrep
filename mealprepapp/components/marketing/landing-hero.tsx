"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function LandingHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/placeholder.svg?key=2vhr6')",
          opacity: 0.7,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/30 z-10" />
      <div className="container relative z-20">
        <div
          className={`max-w-2xl transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Healthy Eating <span className="text-primary">Made Simple</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Chef-prepared meals delivered to your door. Ready in minutes, no cooking required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/meals">
              <Button size="lg" className="group">
                Browse Meals
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
