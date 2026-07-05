import PageLoadingShell from "@/components/shared/page-loading-shell";
import WebsitePageSkeleton from "@/components/skeletons/shared/website-page.skeleton";

export default function WebsiteLoading() {
  return (
    <PageLoadingShell className="mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-28 mb-16 md:mb-24 max-w-7xl">
      <WebsitePageSkeleton />
    </PageLoadingShell>
  );
}
