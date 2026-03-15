"use client"

import { Pie, PieChart, type PieLabelRenderProps } from "recharts"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import type { TOrderStatisticsByStatus } from "@/lib/types/order-statistics"

// Status config (single source of truth)
const STATUS_CONFIG = {
  completed: { label: "Completed", color: "#10b981" },
  "in-progress": { label: "In Progress", color: "#3b82f6" },
  pending: { label: "Pending", color: "#f59e0b" },
  canceled: { label: "Canceled", color: "#dc2626" },
} as const

const STATUS_ALIASES: Record<string, keyof typeof STATUS_CONFIG> = {
  inprogress: "in-progress",
  "in progress": "in-progress",
  cancelled: "canceled",
}

const CHART_CONFIG: ChartConfig = {
  count: { label: "Orders" },
  ...Object.fromEntries(
    Object.entries(STATUS_CONFIG).map(([k, v]) => [k, { label: v.label, color: v.color }])
  ),
}

// Helpers
function toStatusKey(id: string | null | undefined): string {
  if (id == null) return ""
  return String(id).toLowerCase().replace(/\s+/g, "-").replace(/_/g, "-")
}

function getStatusInfo(id: string | null | undefined): { label: string; color: string } {
  const key = toStatusKey(id)
  const resolved = STATUS_ALIASES[key] ?? key
  const config = STATUS_CONFIG[resolved as keyof typeof STATUS_CONFIG]
  const fallback = { label: id != null ? String(id) : "Unknown", color: "hsl(var(--muted-foreground))" }
  return config ?? fallback
}

function buildChartData(ordersByStatus: TOrderStatisticsByStatus[] | null | undefined) {
  const items = (ordersByStatus ?? [])
    .filter((item): item is NonNullable<typeof item> => item != null && item._id != null)
    .map((item) => {
      const { label, color } = getStatusInfo(item._id)
      return { status: label, count: Number(item.count) || 0, fill: color }
    })

  const total = items.reduce((sum, d) => sum + d.count, 0)
  const data = items.map((d) => ({
    ...d,
    percent: total > 0 ? Math.round((d.count / total) * 100) : 0,
  }))

  return { data, total, isEmpty: data.length === 0 }
}

// Pie segment label (percentage badge on the ring)
const LABEL_STYLE = {
  circleR: 20,
  shadow: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.25))",
  stroke: "rgb(250, 250, 250)",
}

function renderSegmentLabel(props: PieLabelRenderProps) {
  const { cx, cy, midAngle, outerRadius, percent } = props
  const r = Number(outerRadius)
  const rad = (-(midAngle ?? 0) * Math.PI) / 180
  const x = Number(cx) + r * Math.cos(rad)
  const y = Number(cy) + r * Math.sin(rad)
  const raw = percent ?? 0
  const pct = raw <= 1 ? Math.round(raw * 100) : Math.round(raw)
  if (pct === 0) return null

  return (
    <g style={{ filter: LABEL_STYLE.shadow }}>
      <circle
        cx={x}
        cy={y}
        r={LABEL_STYLE.circleR}
        fill="white"
        stroke={LABEL_STYLE.stroke}
        strokeWidth={1}
      />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="black" className="text-xs font-semibold">
        {pct}%
      </text>
    </g>
  )
}

// Skeleton (matches chart layout: donut area + legend rows)
const CARD_CLASS = "flex flex-col border-none shadow-none"
const CHART_MARGIN = { top: 24, right: 24, bottom: 24, left: 24 }

export function OrdersStatusChartSkeleton() {
  return (
    <Card className={CARD_CLASS}>
      <CardContent className="flex-1 pb-0 overflow-visible">
        <div className="mx-auto aspect-square max-h-[250px] flex items-center justify-center pb-0">
          <div className="relative size-[180px] shrink-0">
            <Skeleton className="absolute inset-0 rounded-full" />
            <Skeleton className="absolute inset-[30%] rounded-full" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-4 items-start">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-2">
              <Skeleton className="size-3 shrink-0 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </CardFooter>
    </Card>
  )
}

// Component
type OrdersStatusChartProps = { ordersByStatus: TOrderStatisticsByStatus[] }

export function OrdersStatusChart({ ordersByStatus }: OrdersStatusChartProps) {
  const { data, isEmpty } = buildChartData(ordersByStatus)

  if (isEmpty) {
    return (
      <Card className={CARD_CLASS}>
        <CardContent className="flex flex-1 items-center justify-center py-8 text-muted-foreground">
          No order data
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={CARD_CLASS}>
      <CardContent className="flex-1 pb-0 overflow-visible">
        <ChartContainer
          config={CHART_CONFIG}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0 overflow-visible"
        >
          <PieChart margin={CHART_MARGIN}>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius="50%"
              outerRadius="92%"
              label={renderSegmentLabel}
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start p-0">
        {data.map((d) => (
          <div key={d.status} className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-2">
              <div className="size-3 shrink-0 rounded-full" style={{ backgroundColor: d.fill }} />
              <span className="text-sm font-medium text-foreground">{d.status}</span>
            </div>
            <span className="text-sm font-bold text-foreground">
              {d.count.toLocaleString()} ({d.percent}%)
            </span>
          </div>
        ))}
      </CardFooter>
    </Card>
  )
}
