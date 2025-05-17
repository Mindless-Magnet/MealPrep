"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart, Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Sample meal data
const meals = [
  {
    id: 1,
    name: "Grilled Chicken Bowl",
    description: "Grilled chicken with quinoa, roasted vegetables, and avocado",
    price: 12.99,
    calories: 450,
    protein: 35,
    carbs: 40,
    fat: 15,
    image: "/placeholder.svg?key=4x84l",
    tags: ["high-protein", "low-carb"],
    category: "lunch",
  },
  {
    id: 2,
    name: "Salmon & Veggie Plate",
    description: "Wild-caught salmon with steamed broccoli and sweet potato",
    price: 14.99,
    calories: 420,
    protein: 30,
    carbs: 35,
    fat: 18,
    image: "/placeholder.svg?height=400&width=400&query=salmon fillet with vegetables and sweet potato",
    tags: ["keto", "gluten-free"],
    category: "dinner",
  },
  {
    id: 3,
    name: "Vegan Buddha Bowl",
    description: "Roasted chickpeas, avocado, sweet potato, and tahini dressing",
    price: 11.99,
    calories: 380,
    protein: 15,
    carbs: 55,
    fat: 12,
    image: "/placeholder.svg?height=400&width=400&query=vegan buddha bowl with chickpeas and vegetables",
    tags: ["vegan", "gluten-free"],
    category: "lunch",
  },
  {
    id: 4,
    name: "Turkey Meatballs & Zoodles",
    description: "Lean turkey meatballs with zucchini noodles and marinara",
    price: 13.99,
    calories: 350,
    protein: 28,
    carbs: 20,
    fat: 16,
    image: "/placeholder.svg?height=400&width=400&query=turkey meatballs with zucchini noodles",
    tags: ["low-carb", "high-protein"],
    category: "dinner",
  },
  {
    id: 5,
    name: "Breakfast Frittata",
    description: "Egg frittata with spinach, mushrooms, and goat cheese",
    price: 9.99,
    calories: 320,
    protein: 22,
    carbs: 8,
    fat: 24,
    image: "/placeholder.svg?height=400&width=400&query=egg frittata with vegetables",
    tags: ["keto", "vegetarian"],
    category: "breakfast",
  },
  {
    id: 6,
    name: "Teriyaki Tofu Stir-Fry",
    description: "Tofu and mixed vegetables in a teriyaki sauce with brown rice",
    price: 12.49,
    calories: 410,
    protein: 18,
    carbs: 60,
    fat: 10,
    image: "/placeholder.svg?height=400&width=400&query=teriyaki tofu stir fry with vegetables",
    tags: ["vegan", "high-fiber"],
    category: "dinner",
  },
  {
    id: 7,
    name: "Mediterranean Salad",
    description: "Mixed greens with feta, olives, tomatoes, and grilled chicken",
    price: 11.49,
    calories: 380,
    protein: 25,
    carbs: 15,
    fat: 22,
    image: "/placeholder.svg?height=400&width=400&query=mediterranean salad with chicken and feta",
    tags: ["low-carb", "high-protein"],
    category: "lunch",
  },
  {
    id: 8,
    name: "Protein Pancakes",
    description: "Protein-packed pancakes with berries and sugar-free syrup",
    price: 10.99,
    calories: 340,
    protein: 24,
    carbs: 30,
    fat: 12,
    image: "/placeholder.svg?height=400&width=400&query=protein pancakes with berries",
    tags: ["high-protein", "vegetarian"],
    category: "breakfast",
  },
]

export function MealGrid() {
  const [favorites, setFavorites] = useState<number[]>([])
  const { addItem } = useCart()
  const { toast } = useToast()

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))

    toast({
      title: favorites.includes(id) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(id)
        ? "This meal has been removed from your favorites."
        : "This meal has been added to your favorites.",
      duration: 2000,
    })
  }

  const handleAddToCart = (meal: (typeof meals)[0]) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <Card key={meal.id} className="overflow-hidden h-full flex flex-col">
          <div className="relative">
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
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={() => toggleFavorite(meal.id)}
            >
              <Heart className={`h-5 w-5 ${favorites.includes(meal.id) ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">
                {favorites.includes(meal.id) ? "Remove from favorites" : "Add to favorites"}
              </span>
            </Button>
          </div>

          <CardContent className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <Link href={`/meals/${meal.id}`} className="hover:underline">
                <h3 className="font-medium">{meal.name}</h3>
              </Link>
              <span className="font-medium">{formatPrice(meal.price)}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{meal.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {meal.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div className="flex flex-col items-center p-1 bg-muted/50 rounded">
                <span className="font-medium">{meal.calories}</span>
                <span>calories</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-muted/50 rounded">
                <span className="font-medium">{meal.protein}g</span>
                <span>protein</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-muted/50 rounded">
                <span className="font-medium">{meal.carbs}g</span>
                <span>carbs</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button className="w-full" onClick={() => handleAddToCart(meal)}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
