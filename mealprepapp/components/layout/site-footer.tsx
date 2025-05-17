import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-muted py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">
          <Link href="/" className="font-bold text-xl">
            <span className="text-primary mr-1">Prep</span>Meal
          </Link>
          <p className="text-muted-foreground text-sm">
            Healthy, delicious meals delivered to your door. No cooking required.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-sm mb-3">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Press
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-sm mb-3">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-sm mb-3">Get Started</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Meal Plans
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Gift Cards
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Refer a Friend
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} PrepMeal. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
