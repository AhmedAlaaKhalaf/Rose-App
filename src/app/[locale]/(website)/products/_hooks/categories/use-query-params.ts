"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useQueryParams(paramName: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  //   get all params
  const QueryParams = useMemo(() => searchParams.get(paramName), [searchParams, paramName]);

  // toggle: params
  const toggleQueryParams = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(paramName);
      params.append(paramName, id);

      const query = params.toString();
      router.push(query ? `?${query}` : "/products", { scroll: false });
    },
    [router, searchParams, paramName]
  );

  // remove all params
  const clearQueryParams = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(paramName);

    const query = params.toString();

    router.push(query ? `?${query}` : window.location.pathname, { scroll: false });
  }, [router, searchParams, paramName]);

  return { QueryParams, toggleQueryParams, clearQueryParams };
}
