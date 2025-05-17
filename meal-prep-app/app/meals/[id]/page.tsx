import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MealDetail } from "@/components/meal-detail"
import { RelatedMeals } from "@/components/related-meals"
import { CartDrawer } from "@/components/cart-drawer"

export default function MealDetailPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <MealDetail />
        <RelatedMeals />
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  )
}
