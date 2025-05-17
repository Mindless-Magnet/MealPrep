"use client"

import { useRef } from "react"
import Image from "next/image"
import { useInView } from "framer-motion"
import { Check, ShoppingBag, Utensils } from "lucide-react"

const steps = [
  {
    title: "Choose Your Meals",
    description: "Browse our menu and select the meals that fit your diet and preferences.",
    icon: ShoppingBag,
  },
  {
    title: "We Cook & Deliver",
    description: "Our chefs prepare your meals with fresh ingredients and deliver them to your door.",
    icon: Utensils,
  },
  {
    title: "Heat & Enjoy",
    description: "Simply heat your meals in the microwave for 2-3 minutes and enjoy!",
    icon: Check,
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting healthy, delicious meals has never been easier
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center transition-all duration-700 transform ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
          <Image src="/placeholder.svg?key=zvkst" alt="Chef preparing meals" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-8">
            <p className="text-xl md:text-2xl font-medium max-w-xl">
              "We prepare every meal with care using only the freshest ingredients."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
