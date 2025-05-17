"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Clock, Leaf, ShieldCheck, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Fresh Ingredients",
    description: "We source only the freshest, highest quality ingredients for our meals.",
    icon: Leaf,
  },
  {
    title: "Ready in Minutes",
    description: "All meals can be heated and ready to eat in just 2-3 minutes.",
    icon: Clock,
  },
  {
    title: "Nutritionist Approved",
    description: "Our meals are designed by professional nutritionists to ensure balanced nutrition.",
    icon: ShieldCheck,
  },
  {
    title: "Customizable Plans",
    description: "Choose the number of meals and delivery frequency that works for you.",
    icon: Sparkles,
  },
]

export function WhyUs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to making healthy eating convenient and delicious
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`transition-all duration-700 transform ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <feature.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
