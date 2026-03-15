import TopSection from "./_components/top-section";
import AnalyticsSection from "./_components/analytics-section";

export default function DashboardPage() {
  return (
    <div className="pr-4 pl-4 flex flex-col gap-6">
      <TopSection />
      <AnalyticsSection />
    </div>
  );
}
