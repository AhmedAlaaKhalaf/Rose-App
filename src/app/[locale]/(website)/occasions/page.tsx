import { OccasionsGridSkeleton } from "@/components/skeletons/occasions/occasions-page.skeleton";
import { Suspense } from "react";
import OccasionsGrid from "./_components/occasions-grid";
import OccasionsPageHeader from "./_components/occasions-page-header";

export default function OccasionsPage() {
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-28 mb-16 md:mb-24 max-w-7xl">
      <div className="space-y-12">
        <OccasionsPageHeader />
        <Suspense fallback={<OccasionsGridSkeleton />}>
          <OccasionsGrid />
        </Suspense>
      </div>
    </main>
  );
}
