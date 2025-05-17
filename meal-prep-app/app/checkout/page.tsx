import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckoutForm } from "@/components/checkout-form"

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
            <p className="text-muted-foreground">Complete your order to get your meals delivered</p>
          </div>
          <CheckoutForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
