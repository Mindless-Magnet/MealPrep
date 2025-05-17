import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { MealDetail } from "@/components/meals/meal-detail"
import { RelatedMeals } from "@/components/meals/related-meals"
import { CartDrawer } from "@/components/cart/cart-drawer"

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
