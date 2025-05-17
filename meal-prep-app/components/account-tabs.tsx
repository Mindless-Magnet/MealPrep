"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ProfileForm } from "@/components/profile-form"
import { AddressForm } from "@/components/address-form"
import { OrderHistory } from "@/components/order-history"
import { SubscriptionSettings } from "@/components/subscription-settings"

export function AccountTabs() {
  const [activeTab, setActiveTab] = useState("profile")
  const { toast } = useToast()

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="space-y-4">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="addresses">Addresses</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="subscription">Subscription</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileForm />
      </TabsContent>

      <TabsContent value="addresses">
        <AddressForm />
      </TabsContent>

      <TabsContent value="orders">
        <OrderHistory />
      </TabsContent>

      <TabsContent value="subscription">
        <SubscriptionSettings />
      </TabsContent>
    </Tabs>
  )
}
