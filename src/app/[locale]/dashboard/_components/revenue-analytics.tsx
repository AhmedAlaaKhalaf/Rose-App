"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RevenueChart, RevenueChartSkeleton } from "@/components/ui/revenue-chart"
import { getOrderStatus } from "@/lib/services/orders-staus.service"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

export default function RevenueAnalytics() {
  const { data: session } = useSession()

  const { data, isLoading, error } = useQuery({
    queryKey: ["order-statistics", session?.accessToken],
    queryFn: () => {
      if (!session?.accessToken) throw new Error("Unauthorized")
      return getOrderStatus(session.accessToken)
    },
    enabled: !!session?.accessToken,
  })

  const dailyRevenue = data?.statistics?.dailyRevenue ?? []
  const monthlyRevenue = data?.statistics?.monthlyRevenue ?? []
  const isPending = isLoading || data === undefined

  return (
    <Card className="w-3/4 shadow-none border-none">
      <CardContent>
        {isPending && !error && <RevenueChartSkeleton />}
        {error && (
          <div className="flex items-center justify-center py-8 text-destructive">
            Failed to load revenue statistics
          </div>
        )}
        {!isPending && !error && (
          <RevenueChart monthlyRevenue={monthlyRevenue} dailyRevenue={dailyRevenue} />
        )}
      </CardContent>
    </Card>
  )
}
