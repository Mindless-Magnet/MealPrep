"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Sample related meals
const relatedMeals = [
  {
    id: 2,
    name: "Salmon & Veggie Plate",
    description: "Wild-caught salmon with steamed broccoli and sweet potato",
    price: 14.99,
    calories: 420,
    protein: 30,
    image: "/placeholder.svg?height=400&width=400&query=salmon fillet with vegetables and sweet potato",
    tags: ["keto", "gluten-free"],
  },
  {
    id: 4,
    name: "Turkey Meatballs & Zoodles",
    description: "Lean turkey meatballs with zucchini noodles and marinara",
    price: 13.99,
    calories: 350,
    protein: 28,
    image: "/placeholder.svg?height=400&width=400&query=turkey meatballs with zucchini noodles",
    tags: ["low-carb", "high-protein"],
  },
  {
    id: 7,
    name: "Mediterranean Salad",
    description: "Mixed greens with feta, olives, tomatoes, and grilled chicken",
    price: 11.49,
    calories: 380,
    protein: 25,
    image: "/placeholder.svg?height=400&width=400&query=mediterranean salad with chicken and feta",
    tags: ["low-carb", "high-protein"],
  },
  {
    id: 3,
    name: "Vegan Buddha Bowl",
    description: "Roasted chickpeas, avocado, sweet potato, and tahini dressing",
    price: 11.99,
    calories: 380,
    protein: 15,
    image: "/placeholder.svg?height=400&width=400&query=vegan buddha bowl with chickpeas and vegetables",
    tags: ["vegan", "gluten-free"],
  },
]

export function RelatedMeals() {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (meal: (typeof relatedMeals)[0]) => {
    addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      image: meal.image,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${meal.name} has been added to your cart.`,
      duration: 2000,
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {relatedMeals.map((meal) => (
            <CarouselItem key={meal.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <Card className="overflow-hidden h-full flex flex-col">
                <Link href={`/meals/${meal.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={meal.image || "/placeholder.svg"}
                      alt={meal.name}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                </Link>

                <CardContent className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/meals/${meal.id}`} className="hover:underline">
                      <h3 className="font-medium">{meal.name}</h3>
                    </Link>
                    <span className="font-medium">{formatPrice(meal.price)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{meal.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {meal.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" onClick={() => handleAddToCart(meal)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious className="relative inset-0 translate-y-0" />
          <CarouselNext className="relative inset-0 translate-y-0" />
        </div>
      </Carousel>
    </div>
  )
}
