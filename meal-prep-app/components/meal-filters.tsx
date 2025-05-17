"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snacks", label: "Snacks" },
]

const dietaryPreferences = [
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "gluten-free", label: "Gluten Free" },
  { id: "dairy-free", label: "Dairy Free" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
  { id: "low-carb", label: "Low Carb" },
  { id: "high-protein", label: "High Protein" },
]

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "calories-low", label: "Calories: Low to High" },
  { id: "protein-high", label: "Protein: High to Low" },
]

export function MealFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDiets, setSelectedDiets] = useState<string[]>([])
  const [calorieRange, setCalorieRange] = useState([200, 800])
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [isFilterOpen, setIsFilterOpen] = useState(true)

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleDiet = (id: string) => {
    setSelectedDiets((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedDiets([])
    setCalorieRange([200, 800])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center md:hidden">
        <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)} className="w-full justify-between">
          Filters
          <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "transform rotate-180" : ""}`} />
        </Button>
      </div>

      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="space-y-6">
        <CollapsibleContent className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Sort By</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between w-[180px]">
                  {sortBy.label}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.id}
                    onClick={() => setSortBy(option)}
                    className="flex items-center justify-between"
                  >
                    {option.label}
                    {sortBy.id === option.id && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Dietary Preferences</h3>
            <div className="space-y-2">
              {dietaryPreferences.map((diet) => (
                <div key={diet.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`diet-${diet.id}`}
                    checked={selectedDiets.includes(diet.id)}
                    onCheckedChange={() => toggleDiet(diet.id)}
                  />
                  <label
                    htmlFor={`diet-${diet.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {diet.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Calories</h3>
              <span className="text-sm text-muted-foreground">
                {calorieRange[0]} - {calorieRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={calorieRange}
              min={100}
              max={1000}
              step={50}
              onValueChange={setCalorieRange}
              className="py-4"
            />
          </div>

          <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
            Clear Filters
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
