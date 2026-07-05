"use client";

import WishlistEmpty from "@/components/features/wishlist/wishlist-empty";
import WishlistItem from "@/components/features/wishlist/wishlist-item";
import WishlistSummary from "@/components/features/wishlist/wishlist-summary";
import ErrorBoundary from "@/components/shared/error-boundary";
import LogoSpinner from "@/components/shared/logo-spinner";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/ui/section-header";
import { Link } from "@/i18n/navigation";
import useUserWishlist from "@/hooks/wishlist/use-user-wishlist";
import { useWishlistContext } from "@/components/providers/wishlist/wishlist.provider";
import { mergeWishlistItems } from "@/lib/utils/wishlist";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function WishlistPageContent() {
  const t = useTranslations("wishlist");
  const { status: sessionStatus } = useSession();
  const { items: contextItems, setItems } = useWishlistContext();
  const { data, isLoading, error, refetch } = useUserWishlist();

  const items = useMemo(() => {
    if (sessionStatus === "authenticated") {
      const apiItems = data?.items ?? [];
      return mergeWishlistItems(apiItems, contextItems);
    }

    return contextItems;
  }, [contextItems, data?.items, sessionStatus]);

  if (sessionStatus === "loading" || (sessionStatus === "authenticated" && isLoading)) {
    return (
      <div className="flex justify-center items-center py-24">
        <LogoSpinner size={72} />
      </div>
    );
  }

  if (sessionStatus === "unauthenticated" && items.length === 0) {
    return (
      <div className="space-y-8">
        <SectionHead size="sm">{t("title")}</SectionHead>
        <div className="flex flex-col justify-center items-center gap-5 bg-white dark:bg-zinc-900/40 px-6 py-16 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-center">
          <div className="space-y-2 max-w-md">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50 text-xl">{t("login-title")}</h2>
            <p className="text-zinc-500 text-sm">{t("login-desc")}</p>
          </div>
          <Button asChild className="rounded-full px-8">
            <Link href="/login">{t("login-button")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorBoundary onRetry={refetch} error={error} />;
  }

  const handleGuestRemove = (wishlistItemId: string) => {
    const updated = contextItems.filter((item) => item.id !== wishlistItemId);
    setItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center gap-4">
        <SectionHead size="sm">{t("title")}</SectionHead>
        {items.length > 0 && (
          <p className="font-medium text-zinc-500 text-sm">{t("items-count", { count: items.length })}</p>
        )}
      </div>

      {items.length === 0 ? (
        <WishlistEmpty />
      ) : (
        <div className="gap-8 grid lg:grid-cols-[minmax(0,1fr)_380px] items-start">
          <div className="space-y-4">
            {items.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                onRemoved={
                  item.id.startsWith("local-") ? () => handleGuestRemove(item.id) : undefined
                }
              />
            ))}
          </div>

          <WishlistSummary items={items} />
        </div>
      )}
    </div>
  );
}
