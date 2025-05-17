"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart } from "lucide-react"

// Sample order data
const orders = [
  {
    id: "ORD-12345",
    date: "May 10, 2025",
    status: "Delivered",
    total: 39.97,
    items: [
      {
        id: 1,
        name: "Grilled Chicken Bowl",
        price: 12.99,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100&query=grilled chicken bowl",
      },
      {
        id: 2,
        name: "Salmon & Veggie Plate",
        price: 14.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100&query=salmon with vegetables",
      },
    ],
  },
  {
    id: "ORD-12344",
    date: "May 3, 2025",
    status: "Delivered",
    total: 47.96,
    items: [
      {
        id: 1,
        name: "Grilled Chicken Bowl",
        price: 12.99,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100&query=grilled chicken bowl",
      },
      {
        id: 3,
        name: "Vegan Buddha Bowl",
        price: 11.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100&query=vegan buddha bowl",
      },
      {
        id: 5,
        name: "Breakfast Frittata",
        price: 9.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100&query=egg frittata",
      },
    ],
  },
]

export function OrderHistory() {
  const { toast } = useToast()

  const handleReorder = (orderId: string) => {
    toast({
      title: "Items added to cart",
      description: `All items from order ${orderId} have been added to your cart.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and manage your previous orders</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">No orders yet</h3>
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
            <Link href="/meals">
              <Button>Browse Meals</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{order.id}</h3>
                      <Badge variant="outline">{order.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Ordered on {order.date}</p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                      onClick={() => handleReorder(order.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Reorder
                    </Button>
                    <Link href={`/account/orders/${order.id}`} className="w-full sm:w-auto">
                      <Button variant="ghost" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <Link href={`/meals/${item.id}`} className="hover:underline">
                            <h4 className="font-medium">{item.name}</h4>
                          </Link>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} x {formatPrice(item.price)}
                            </p>
                            <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
