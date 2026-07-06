const PRODUCT_IMAGE_FALLBACK = "/assets/images/gallery-1.png";

export function resolveProductCover(cover?: string): string {
  if (!cover) return PRODUCT_IMAGE_FALLBACK;

  const normalized = cover.replace(/([^:]\/)\/+/g, "$1");

  if (normalized.includes("/storage/")) {
    return normalized;
  }

  return PRODUCT_IMAGE_FALLBACK;
}

export function parseProductGallery(gallery?: string): string[] {
  if (!gallery) return [];

  try {
    const parsed = JSON.parse(gallery) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
  } catch {
    return [];
  }
}

export function getProductImages(cover?: string, gallery?: string): string[] {
  const images = [resolveProductCover(cover), ...parseProductGallery(gallery).map(resolveProductCover)];
  return Array.from(new Set(images));
}
