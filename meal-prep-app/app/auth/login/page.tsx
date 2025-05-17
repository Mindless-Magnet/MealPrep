import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8 max-w-md mx-auto">
        <LoginForm />
      </main>
      <SiteFooter />
    </div>
  )
}
