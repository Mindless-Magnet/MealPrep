"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, Trash2 } from "lucide-react"

const addresses = [
  {
    id: 1,
    name: "Home",
    line1: "123 Main St",
    line2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    isDefault: true,
  },
  {
    id: 2,
    name: "Work",
    line1: "456 Market St",
    line2: "Suite 200",
    city: "New York",
    state: "NY",
    zip: "10002",
    isDefault: false,
  },
]

export function AddressForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [userAddresses, setUserAddresses] = useState(addresses)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsAdding(false)
      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      })
    }, 1000)
  }

  const handleDelete = (id: number) => {
    setUserAddresses(userAddresses.filter((address) => address.id !== id))
    toast({
      title: "Address deleted",
      description: "The address has been removed from your account.",
    })
  }

  const handleSetDefault = (id: number) => {
    setUserAddresses(
      userAddresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )
    toast({
      title: "Default address updated",
      description: "Your default delivery address has been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Addresses</CardTitle>
          <CardDescription>Manage your delivery addresses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userAddresses.map((address) => (
            <div key={address.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{address.name}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {address.line1}
                    <br />
                    {address.line2 && (
                      <>
                        {address.line2}
                        <br />
                      </>
                    )}
                    {address.city}, {address.state} {address.zip}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                      Set as Default
                    </Button>
                  )}
                  <Button variant="outline" size="icon" onClick={() => handleDelete(address.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {!isAdding && (
            <Button variant="outline" className="w-full" onClick={() => setIsAdding(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          )}

          {isAdding && (
            <form onSubmit={handleSubmit} className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Add New Address</h3>

              <div className="space-y-2">
                <Label htmlFor="address-name">Address Name</Label>
                <Input id="address-name" placeholder="Home, Work, etc." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address-line1">Address Line 1</Label>
                <Input id="address-line1" placeholder="Street address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address-line2">Address Line 2 (Optional)</Label>
                <Input id="address-line2" placeholder="Apartment, suite, etc." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address-city">City</Label>
                  <Input id="address-city" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address-state">State</Label>
                  <Select>
                    <SelectTrigger id="address-state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                      <SelectItem value="fl">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address-zip">ZIP Code</Label>
                <Input id="address-zip" />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Address"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
