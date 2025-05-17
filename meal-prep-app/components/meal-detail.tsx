"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import { formatPrice } from "@/lib/utils"
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react"

// Sample meal data
const meal = {
  id: 1,
  name: "Grilled Chicken Bowl",
  description:
    "Tender grilled chicken breast served with a colorful mix of quinoa, roasted vegetables, and fresh avocado. This balanced meal is perfect for lunch or dinner, providing a complete protein source with complex carbohydrates and healthy fats.",
  price: 12.99,
  calories: 450,
  protein: 35,
  carbs: 40,
  fat: 15,
  fiber: 8,
  sodium: 620,
  image: "/placeholder.svg?height=600&width=600&query=grilled chicken bowl with quinoa and vegetables close up",
  images: [
    "/placeholder.svg?height=600&width=600&query=grilled chicken bowl with quinoa and vegetables close up",
    "/placeholder.svg?height=600&width=600&query=grilled chicken breast close up",
    "/placeholder.svg?height=600&width=600&query=quinoa and roasted vegetables",
    "/placeholder.svg?height=600&width=600&query=avocado slices on plate",
  ],
  tags: ["high-protein", "low-carb"],
  ingredients: [
    "Grilled chicken breast (antibiotic-free)",
    "Organic quinoa",
    "Roasted bell peppers",
    "Roasted zucchini",
    "Roasted red onion",
    "Fresh avocado",
    "Extra virgin olive oil",
    "Lemon juice",
    "Sea salt",
    "Black pepper",
    "Garlic powder",
    "Dried oregano",
  ],
  allergens: ["None"],
  heatingInstructions:
    "Microwave: Remove lid and heat for 2-3 minutes. Oven: Transfer to oven-safe dish and heat at 350°F for 10-12 minutes.",
}

export function MealDetail() {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(meal.images[0])
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      image: meal.image,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} x ${meal.name} has been added to your cart.`,
      duration: 2000,
    })
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)

    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? "This meal has been removed from your favorites."
        : "This meal has been added to your favorites.",
      duration: 2000,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="space-y-4">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image src={activeImage || "/placeholder.svg"} alt={meal.name} fill className="object-cover" />
        </div>
        <div className="flex gap-2 overflow-auto pb-2">
          {meal.images.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                activeImage === image ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setActiveImage(image)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${meal.name} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{meal.name}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {meal.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-2xl font-bold mt-4">{formatPrice(meal.price)}</p>
        </div>

        <p className="text-muted-foreground">{meal.description}</p>

        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-lg font-medium">{meal.calories}</p>
            <p className="text-xs text-muted-foreground">calories</p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-lg font-medium">{meal.protein}g</p>
            <p className="text-xs text-muted-foreground">protein</p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-lg font-medium">{meal.carbs}g</p>
            <p className="text-xs text-muted-foreground">carbs</p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-lg font-medium">{meal.fat}g</p>
            <p className="text-xs text-muted-foreground">fat</p>
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none rounded-l-md"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <div className="h-10 w-12 flex items-center justify-center text-sm">{quantity}</div>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none rounded-r-md"
              onClick={increaseQuantity}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <Button className="flex-1" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>

          <Button variant="outline" size="icon" className="h-10 w-10" onClick={toggleFavorite}>
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
          </Button>
        </div>

        <Tabs defaultValue="ingredients" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="heating">Heating</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients" className="space-y-4 mt-4">
            <h3 className="font-medium">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {meal.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <h3 className="font-medium mt-4">Allergens</h3>
            <p className="text-sm">{meal.allergens.join(", ")}</p>
          </TabsContent>
          <TabsContent value="nutrition" className="space-y-4 mt-4">
            <h3 className="font-medium">Nutrition Facts</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b">
                <span>Calories</span>
                <span className="font-medium">{meal.calories}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Protein</span>
                <span className="font-medium">{meal.protein}g</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Carbohydrates</span>
                <span className="font-medium">{meal.carbs}g</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Fat</span>
                <span className="font-medium">{meal.fat}g</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Fiber</span>
                <span className="font-medium">{meal.fiber}g</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Sodium</span>
                <span className="font-medium">{meal.sodium}mg</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="heating" className="mt-4">
            <h3 className="font-medium mb-2">Heating Instructions</h3>
            <p className="text-sm">{meal.heatingInstructions}</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
