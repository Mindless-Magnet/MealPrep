import { LandingHero } from "@/components/landing-hero"
import { HowItWorks } from "@/components/how-it-works"
import { WhyUs } from "@/components/why-us"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Newsletter } from "@/components/newsletter"
import { MealBelt } from "@/components/meal-belt"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartDrawer } from "@/components/cart-drawer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <LandingHero />
        <MealBelt />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  )
}
