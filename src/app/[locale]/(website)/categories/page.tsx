import { CategoriesGridSkeleton } from "@/components/skeletons/categories/categories-page.skeleton";
import { Suspense } from "react";
import CategoriesGrid from "./_components/categories-grid";
import CategoriesPageHeader from "./_components/categories-page-header";

export default function CategoriesPage() {
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-28 mb-16 md:mb-24 max-w-7xl">
      <div className="space-y-12">
        <CategoriesPageHeader />
        <Suspense fallback={<CategoriesGridSkeleton />}>
          <CategoriesGrid />
        </Suspense>
      </div>
    </main>
  );
}
