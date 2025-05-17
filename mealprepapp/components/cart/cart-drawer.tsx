"use client"

import { ShoppingCart, X, Plus, Minus, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/utils"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, isCartOpen, setIsCartOpen, subtotal, cartCount } = useCart()

  // Connect the cart trigger button to the drawer
  useEffect(() => {
    const cartTrigger = document.getElementById("cart-trigger")
    if (cartTrigger) {
      cartTrigger.addEventListener("click", () => setIsCartOpen(true))
    }

    return () => {
      if (cartTrigger) {
        cartTrigger.removeEventListener("click", () => setIsCartOpen(true))
      }
    }
  }, [setIsCartOpen])

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger className="sr-only">Open Cart</SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart ({cartCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
            <p className="text-muted-foreground text-center mb-6">
              Looks like you haven't added any meals to your cart yet.
            </p>
            <Link href="/meals">
              <Button onClick={() => setIsCartOpen(false)}>Browse Meals</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4">
              {items.map((item) => (
                <div key={item.id} className="flex py-4">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.id)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm">Shipping</span>
                <span className="text-sm font-medium">{formatPrice(0)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-2">
                <span className="text-base font-medium">Total</span>
                <span className="text-base font-medium">{formatPrice(subtotal)}</span>
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/checkout" className="w-full">
                  <Button className="w-full" size="lg" onClick={() => setIsCartOpen(false)}>
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
