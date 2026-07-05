import PageLoadingShell from "@/components/shared/page-loading-shell";
import CategoriesPageSkeleton from "@/components/skeletons/categories/categories-page.skeleton";

export default function CategoriesLoading() {
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-28 mb-16 md:mb-24 max-w-7xl">
      <PageLoadingShell>
        <CategoriesPageSkeleton />
      </PageLoadingShell>
    </main>
  );
}
