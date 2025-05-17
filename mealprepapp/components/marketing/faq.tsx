"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long do the meals stay fresh?",
    answer:
      "Our meals stay fresh for up to 7 days in the refrigerator. Each meal has a 'best by' date printed on the packaging. For optimal freshness, we recommend consuming the meals within 4-5 days of delivery.",
  },
  {
    question: "Can I customize my meal plan?",
    answer:
      "Yes! You can customize your meal plan by selecting your dietary preferences, allergies, and favorite meals. You can also skip weeks or pause your subscription at any time.",
  },
  {
    question: "How do I heat the meals?",
    answer:
      "Our meals can be heated in the microwave for 2-3 minutes or in the oven for 10-15 minutes. Detailed heating instructions are provided on each meal package.",
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer:
      "We offer meals for various dietary needs including keto, paleo, vegan, vegetarian, gluten-free, and dairy-free options. You can filter meals based on your specific requirements.",
  },
  {
    question: "What areas do you deliver to?",
    answer:
      "We currently deliver to most major cities in the continental United States. Enter your zip code during checkout to confirm if we deliver to your area.",
  },
  {
    question: "Can I skip a week or cancel my subscription?",
    answer:
      "Yes, you can skip a week or cancel your subscription at any time. Just log into your account and manage your delivery schedule. There are no long-term commitments or cancellation fees.",
  },
]

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Find answers to common questions about our meal prep service</p>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-700 transform ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
