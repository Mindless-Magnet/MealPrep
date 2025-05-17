"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ProfileForm } from "@/components/profile-form"
import { AddressForm } from "@/components/address-form"
import { OrderHistory } from "@/components/order-history"
import { SubscriptionSettings } from "@/components/subscription-settings"
import { User, MapPin, ShoppingBag, Calendar } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function AccountTabs() {
  const [activeTab, setActiveTab] = useState("profile")
  const { toast } = useToast()
  const isMobile = useIsMobile()

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
    { id: "addresses", label: "Addresses", icon: <MapPin className="h-4 w-4" /> },
    { id: "orders", label: "Orders", icon: <ShoppingBag className="h-4 w-4" /> },
    { id: "subscription", label: "Subscription", icon: <Calendar className="h-4 w-4" /> },
  ]

  return (
    <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="space-y-4">
      <TabsList className="grid grid-cols-4 gap-2">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
            {tab.icon}
            {!isMobile && <span>{tab.label}</span>}
            {isMobile && <span className="sr-only">{tab.label}</span>}
          </TabsTrigger>
        ))}
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
