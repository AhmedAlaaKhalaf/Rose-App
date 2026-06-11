"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useClearAllQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const clearAllQueryParams = useCallback(() => {
    if (!searchParams.toString()) return;

    router.push(pathname, { scroll: false });
  }, [router, pathname, searchParams]);

  return { searchParams, clearAllQueryParams };
}
