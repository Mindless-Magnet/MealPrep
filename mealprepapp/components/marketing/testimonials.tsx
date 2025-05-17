"use client"

import { useRef } from "react"
import Image from "next/image"
import { useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Busy Professional",
    content:
      "PrepMeal has completely changed my weekday routine. I no longer stress about what to eat for lunch or dinner. The meals are delicious and keep me energized throughout the day.",
    image: "/professional-woman-headshot.png",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Fitness Enthusiast",
    content:
      "As someone who tracks macros, PrepMeal has been a game-changer. The nutritional information is accurate, and the high-protein options help me meet my fitness goals.",
    image: "/placeholder.svg?key=qh38j",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Working Parent",
    content:
      "With two kids and a full-time job, I barely had time to cook healthy meals. PrepMeal delivers nutritious options my whole family enjoys. It's been a lifesaver!",
    image: "/placeholder.svg?height=100&width=100&query=working mom headshot",
    rating: 4,
  },
  {
    name: "David Wilson",
    role: "Student",
    content:
      "The meal subscription fits perfectly into my student budget, and the food is way better than what I could make myself. Plus, I'm saving so much time not cooking!",
    image: "/placeholder.svg?height=100&width=100&query=college student man headshot",
    rating: 5,
  },
]

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-700 transform ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">"{testimonial.content}"</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative inset-0 translate-y-0" />
              <CarouselNext className="relative inset-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
