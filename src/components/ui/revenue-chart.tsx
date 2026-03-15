"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ReferenceDot,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { CURRENCY } from "@/lib/constants/global-constants"
import { cn } from "@/lib/utils/tailwind-merge"
import type { TDailyRevenue, TMonthlyRevenue } from "@/lib/types/order-statistics"

export const description = "An interactive area chart"

export function RevenueChartSkeleton() {
  return (
    <Card className="pt-0 border-none shadow-none">
      <CardHeader className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between px-0">
        <div className="grid flex-1 gap-1">
          <div className="flex flex-wrap items-center justify-between gap-2 gap-y-3">
            <Skeleton className="h-8 w-24" />
            <div className="inline-flex items-center gap-3">
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-0 sm:pt-6 px-0">
        <Skeleton className="aspect-auto h-[300px] w-full rounded-lg" />
      </CardContent>
    </Card>
  )
}

/** Build chart data from API monthlyRevenue. _id is typically "YYYY-MM" or a date string. */
function buildMonthlyChartData(monthlyRevenue: TMonthlyRevenue[]): { date: string; revenue: number }[] {
  if (!monthlyRevenue?.length) return []
  return monthlyRevenue
    .map((m) => {
      const id = String(m._id)
      const dateStr = id.length === 7 && /^\d{4}-\d{2}$/.test(id) ? `${id}-01` : id
      const d = new Date(dateStr)
      const fallback = isNaN(d.getTime()) ? `${id}` : d.toISOString().slice(0, 10)
      return { date: fallback, revenue: Number(m.revenue) || 0 }
    })
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** Build chart data from dailyRevenue for last 14 days (current + last week). _id is typically "YYYY-MM-DD". */
function buildLastWeekChartData(dailyRevenue: TDailyRevenue[]): { date: string; revenue: number }[] {
  if (!dailyRevenue?.length) return []
  const now = new Date()
  const cutoff = new Date(now)
  cutoff.setDate(cutoff.getDate() - 14)
  const cutoffStr = cutoff.toISOString().slice(0, 10)
  return dailyRevenue
    .map((d) => {
      const id = String(d._id)
      const dateStr = id.length === 10 && /^\d{4}-\d{2}-\d{2}$/.test(id) ? id : id.slice(0, 10)
      const dObj = new Date(dateStr)
      const fallback = isNaN(dObj.getTime()) ? id : dObj.toISOString().slice(0, 10)
      return { date: fallback, revenue: Number(d.revenue) || 0 }
    })
    .filter((item) => item.date >= cutoffStr)
    .sort((a, b) => a.date.localeCompare(b.date))
}

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
} satisfies ChartConfig

type TabView = "monthly" | "last-week"

type RevenueChartProps = {
  monthlyRevenue?: TMonthlyRevenue[]
  dailyRevenue?: TDailyRevenue[]
}

const CHART_ANIMATION_DURATION_MS = 800
const MAX_PEAK_DELAY_MS = 1000

export function RevenueChart({ monthlyRevenue = [], dailyRevenue = [] }: RevenueChartProps) {
  const [activeTab, setActiveTab] = React.useState<TabView>("monthly")
  const [showMaxPeak, setShowMaxPeak] = React.useState(false)

  const monthlyData = React.useMemo(() => buildMonthlyChartData(monthlyRevenue ?? []), [monthlyRevenue])
  const lastWeekData = React.useMemo(() => buildLastWeekChartData(dailyRevenue ?? []), [dailyRevenue])

  const filteredData = activeTab === "monthly" ? monthlyData : lastWeekData

  const maxValue = React.useMemo(() => {
    if (!filteredData.length) return 0
    return Math.max(...filteredData.map((d) => d.revenue))
  }, [filteredData])

  const yTicks = React.useMemo(() => {
    if (maxValue <= 0) return [0]
    return [0, 0.166, 0.33, 0.5, 0.66, 0.83, 1].map((p) => Math.round(maxValue * p))
  }, [maxValue])

  // X-axis ticks: monthly = one per month, last-week = one per 2 days
  const xTicks = React.useMemo(() => {
    if (activeTab === "last-week") {
      return filteredData.filter((_, i) => i % 2 === 0).map((d) => d.date)
    }
    const seen = new Set<string>()
    const out: string[] = []
    filteredData.forEach((item) => {
      const d = new Date(item.date)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      if (!seen.has(key)) {
        seen.add(key)
        out.push(item.date)
      }
    })
    return out
  }, [filteredData, activeTab])

  const xTickFormatter = React.useCallback(
    (value: string) => {
      const d = new Date(value)
      return activeTab === "last-week"
        ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : d.toLocaleDateString("en-US", { month: "short" })
    },
    [activeTab]
  )

  const maxPeak = React.useMemo(() => {
    if (!filteredData.length) return null
    let peak: { date: string; value: number } | null = null
    for (const item of filteredData) {
      const value = item.revenue
      if (!peak || value > peak.value) {
        peak = { date: item.date, value }
      }
    }
    return peak
  }, [filteredData])

  // Wait for chart animation to finish + 1s before showing max peak
  React.useEffect(() => {
    setShowMaxPeak(false)
    const t = setTimeout(() => setShowMaxPeak(true), CHART_ANIMATION_DURATION_MS + MAX_PEAK_DELAY_MS)
    return () => clearTimeout(t)
  }, [filteredData, activeTab])

  const formatValue = (v: number) =>
    v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(1)}K` : String(v)

  return (
    <Card className="pt-0 border-none shadow-none">
      <CardHeader className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between px-0">
        <div className="grid flex-1 gap-1">
          <div className="flex flex-wrap items-center justify-between gap-2 gap-y-3">
            <CardTitle className="text-2xl font-bold">
              Revenue
            </CardTitle>
            <div role="tablist" className="inline-flex items-center gap-3">
              <button
                role="tab"
                aria-selected={activeTab === "monthly"}
                onClick={() => setActiveTab("monthly")}
                className={cn(
                  "text-sm font-medium transition-colors",
                  activeTab === "monthly" ? "text-primary" : "text-[#969696]"
                )}
              >
                Monthly
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "last-week"}
                onClick={() => setActiveTab("last-week")}
                className={cn(
                  "text-sm font-medium transition-colors",
                  activeTab === "last-week" ? "text-primary" : "text-[#969696]"
                )}
              >
                Last week
              </button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-0 sm:pt-6 px-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full [&_.recharts-cartesian-axis-tick_text]:!fill-black"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={false} vertical stroke="#a1a1aa" strokeWidth={0.5} opacity={0.5}/>
            <YAxis
              domain={[0, maxValue * 1.08]}
              ticks={yTicks}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#000000" }}
              tickFormatter={(v) =>
                v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(1)}K` : String(v)
              }
            />
            <XAxis
              dataKey="date"
              ticks={xTicks}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={activeTab === "last-week" ? 20 : 24}
              tick={{ fill: "#000000" }}
              tickFormatter={xTickFormatter}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            {maxPeak && filteredData.length > 0 && (
              <ReferenceDot
                x={maxPeak.date}
                y={maxPeak.value}
                r={6}
                fill="hsl(var(--primary))"
                stroke="none"
                style={{ opacity: showMaxPeak ? 1 : 0, transition: "opacity 0.2s ease" }}
              >
                <Label
                  value={`${formatValue(maxPeak.value)} ${CURRENCY}`}
                  position="top"
                  fill="hsl(var(--primary))"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    opacity: showMaxPeak ? 1 : 0,
                    transition: "opacity 0.2s ease",
                  }}
                />
              </ReferenceDot>
            )}
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              animationDuration={CHART_ANIMATION_DURATION_MS}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}