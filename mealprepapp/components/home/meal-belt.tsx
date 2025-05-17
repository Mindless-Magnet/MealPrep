"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mealCategories = [
  {
    id: 1,
    name: "Keto Friendly",
    image: "/placeholder.svg?key=tjcvd",
    color: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-800 dark:text-green-100",
  },
  {
    id: 2,
    name: "High Protein",
    image: "/placeholder.svg?key=m0av7",
    color: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-800 dark:text-blue-100",
  },
  {
    id: 3,
    name: "Vegan",
    image: "/placeholder.svg?key=vesz2",
    color: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-800 dark:text-purple-100",
  },
  {
    id: 4,
    name: "Low Calorie",
    image: "/placeholder.svg?key=a6668",
    color: "bg-yellow-100 dark:bg-yellow-900",
    textColor: "text-yellow-800 dark:text-yellow-100",
  },
  {
    id: 5,
    name: "Gluten Free",
    image: "/placeholder.svg?key=4lq4b",
    color: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-100",
  },
  {
    id: 6,
    name: "Paleo",
    image: "/placeholder.svg?key=42ura",
    color: "bg-orange-100 dark:bg-orange-900",
    textColor: "text-orange-800 dark:text-orange-100",
  },
]

export function MealBelt() {
  const beltRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const speedRef = useRef<number>(0.5) // pixels per frame
  const pausedRef = useRef<boolean>(false)

  useEffect(() => {
    const animate = () => {
      if (beltRef.current && !pausedRef.current) {
        const currentPosition = Number.parseFloat(
          beltRef.current.style.transform.replace("translateX(", "").replace("px)", "") || "0",
        )

        // Reset position when it's moved enough to create a seamless loop
        if (Math.abs(currentPosition) >= beltRef.current.children[0].clientWidth * mealCategories.length) {
          beltRef.current.style.transform = "translateX(0)"
        } else {
          beltRef.current.style.transform = `translateX(${currentPosition - speedRef.current}px)`
        }
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    // Pause animation on hover
    const beltElement = beltRef.current
    const handleMouseEnter = () => {
      pausedRef.current = true
    }
    const handleMouseLeave = () => {
      pausedRef.current = false
    }

    if (beltElement) {
      beltElement.addEventListener("mouseenter", handleMouseEnter)
      beltElement.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (beltElement) {
        beltElement.removeEventListener("mouseenter", handleMouseEnter)
        beltElement.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">Explore Our Meal Categories</h2>
        <p className="text-muted-foreground text-center mt-2 mb-8">Delicious options for every diet and preference</p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div
          ref={beltRef}
          className="flex gap-6 py-4 transition-transform duration-300 ease-linear"
          style={{ width: "fit-content", transform: "translateX(0px)" }}
        >
          {[...mealCategories, ...mealCategories, ...mealCategories].map((category, index) => (
            <Link href={`/meals?category=${category.id}`} key={`${category.id}-${index}`}>
              <Card className="w-[250px] overflow-hidden hover:shadow-lg transition-all">
                <div className="relative h-[150px] w-full overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge className={`${category.color} ${category.textColor}`}>{category.name}</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
