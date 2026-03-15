"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrdersStatusChart, OrdersStatusChartSkeleton } from "@/components/ui/orders-status-chart"
import { getOrderStatus } from "@/lib/services/orders-staus.service"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

export default function OrdersStatus() {
  const { data: session } = useSession()

  const { data, isLoading, error } = useQuery({
    queryKey: ["order-statistics", session?.accessToken],
    queryFn: () => {
      if (!session?.accessToken) throw new Error("Unauthorized")
      return getOrderStatus(session.accessToken)
    },
    enabled: !!session?.accessToken,
  })

  const ordersByStatus = data?.statistics?.ordersByStatus ?? []
  const isPending = isLoading || data === undefined

  return (
    <Card className="w-1/4 shadow-none border-none">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-bold text-center">Orders Status</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending && !error && <OrdersStatusChartSkeleton />}
        {error && (
          <div className="flex items-center justify-center py-8 text-destructive">
            Failed to load order statistics
          </div>
        )}
        {!isPending && !error && (
          <OrdersStatusChart ordersByStatus={ordersByStatus} />
        )}
      </CardContent>
    </Card>
  )
}
