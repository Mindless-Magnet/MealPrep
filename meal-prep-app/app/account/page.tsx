import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AccountTabs } from "@/components/account-tabs"
import { CartDrawer } from "@/components/cart-drawer"

export default function AccountPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
            <p className="text-muted-foreground">Manage your profile, orders, and subscription</p>
          </div>
          <AccountTabs />
        </div>
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  )
}
