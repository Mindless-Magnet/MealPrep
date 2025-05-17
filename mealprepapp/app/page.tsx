import { LandingHero } from "@/components/home/landing-hero"
import { HowItWorks } from "@/components/home/how-it-works"
import { WhyUs } from "@/components/home/why-us"
import { Testimonials } from "@/components/home/testimonials"
import { FAQ } from "@/components/home/faq"
import { Newsletter } from "@/components/home/newsletter"
import { MealBelt } from "@/components/home/meal-belt"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { CartDrawer } from "@/components/cart/cart-drawer"

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
