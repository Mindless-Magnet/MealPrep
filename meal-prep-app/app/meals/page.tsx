import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MealGrid } from "@/components/meal-grid"
import { MealFilters } from "@/components/meal-filters"
import { CartDrawer } from "@/components/cart-drawer"

export default function MealsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Our Meals</h1>
            <p className="text-muted-foreground">Browse our selection of chef-prepared, nutritious meals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            <MealFilters />
            <MealGrid />
          </div>
        </div>
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  )
}
