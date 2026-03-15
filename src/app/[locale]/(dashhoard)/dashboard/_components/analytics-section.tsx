import OrdersStatus from "./orders-status";
import RevenueAnalytics from "./revenue-analytics";

export default function AnalyticsSection() {
  return (
    <section className="flex justify-between gap-6">
      <OrdersStatus />
      <RevenueAnalytics />
    </section>
  )
}