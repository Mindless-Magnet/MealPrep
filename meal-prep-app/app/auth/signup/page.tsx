import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8 max-w-md mx-auto">
        <SignupForm />
      </main>
      <SiteFooter />
    </div>
  )
}
