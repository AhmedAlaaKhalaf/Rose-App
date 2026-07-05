import { TProductCard } from "../types/product";
import { TUserWishlist, TWishlistItem } from "../types/wishlist";

type RawRecord = Record<string, unknown>;

const ITEM_KEYS = ["items", "wishlistItems", "products"] as const;

function asRecord(value: unknown): RawRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RawRecord) : {};
}

function resolveProductRecord(item: RawRecord): RawRecord {
  const rawProduct = item.product;

  if (typeof rawProduct === "string") {
    return {
      id: rawProduct,
      title: item.title,
      cover: item.cover ?? item.imgCover,
      price: item.price,
    };
  }

  const product = asRecord(rawProduct);

  if (Object.keys(product).length > 0) {
    return product;
  }

  if (item.title || item.cover || item.imgCover) {
    return item;
  }

  return product;
}

function normalizeWishlistProduct(product: RawRecord): TProductCard {
  return {
    id: String(product.id ?? product._id ?? ""),
    title: String(product.title ?? ""),
    cover: String(product.cover ?? product.imgCover ?? ""),
    createdAt: String(product.createdAt ?? ""),
    price: String(product.price ?? "0"),
    discountType: String(product.discountType ?? ""),
    discountValue: String(product.discountValue ?? "0"),
    stock: Number(product.stock ?? 0),
    rating: Number(product.rating ?? product.rateAvg ?? 0),
    ratings: Number(product.ratings ?? product.rateCount ?? 0),
  };
}

function normalizeWishlistItem(raw: RawRecord): TWishlistItem | null {
  const productRecord = resolveProductRecord(raw);
  const product = normalizeWishlistProduct(productRecord);
  const productId = String(raw.productId ?? product.id ?? "");

  if (!productId && !product.id) {
    return null;
  }

  const resolvedProductId = productId || product.id;
  const wishlistItemId = String(raw.id ?? raw._id ?? raw.wishlistItemId ?? "");

  return {
    id: wishlistItemId || `local-${resolvedProductId}`,
    productId: resolvedProductId,
    product: {
      ...product,
      id: resolvedProductId,
    },
  };
}

export function productToWishlistItem(product: TProductCard, id?: string): TWishlistItem {
  return {
    id: id ?? `local-${product.id}`,
    productId: product.id,
    product,
  };
}

function buildWishlist(rawItems: RawRecord[]): TUserWishlist {
  const items = rawItems
    .map(normalizeWishlistItem)
    .filter((item): item is TWishlistItem => Boolean(item));

  return {
    items,
    count: items.length,
  };
}

function extractRawItems(source: RawRecord): RawRecord[] | undefined {
  for (const key of ITEM_KEYS) {
    if (Array.isArray(source[key])) {
      return source[key] as RawRecord[];
    }
  }

  const wishlist = asRecord(source.wishlist);

  for (const key of ITEM_KEYS) {
    if (Array.isArray(wishlist[key])) {
      return wishlist[key] as RawRecord[];
    }
  }

  return undefined;
}

function resolveWishlistPayload(raw: unknown): TUserWishlist | null {
  const response = asRecord(raw);
  const payload = asRecord(response.payload);
  const data = asRecord(payload.data);

  if (Array.isArray(payload.data)) {
    return buildWishlist(payload.data);
  }

  if (Array.isArray(data.items)) {
    return buildWishlist(data.items);
  }

  if (Array.isArray(data.wishlistItems)) {
    return buildWishlist(data.wishlistItems);
  }

  if (Array.isArray(data.products)) {
    return buildWishlist(data.products);
  }

  if (Array.isArray(data.wishlist)) {
    return buildWishlist(data.wishlist);
  }

  if (Array.isArray(payload.wishlist)) {
    return buildWishlist(payload.wishlist);
  }

  const payloadItems = extractRawItems(payload);
  if (payloadItems) {
    return buildWishlist(payloadItems);
  }

  const dataItems = extractRawItems(data);
  if (dataItems) {
    return buildWishlist(dataItems);
  }

  const responseItems = extractRawItems(response);
  if (responseItems) {
    return buildWishlist(responseItems);
  }

  if (payload.data) {
    return resolveWishlistPayload({ payload: payload.data });
  }

  if (data.wishlist) {
    return resolveWishlistPayload({ payload: data.wishlist });
  }

  if (payload.wishlist) {
    return resolveWishlistPayload({ payload: payload.wishlist });
  }

  return null;
}

export function tryNormalizeWishlistPayload(raw: unknown): TUserWishlist | null {
  return resolveWishlistPayload(raw);
}

export function normalizeWishlistPayload(raw: unknown): TUserWishlist {
  return (
    resolveWishlistPayload(raw) ?? {
      items: [],
      count: 0,
    }
  );
}

export function mergeWishlistItems(
  current: TWishlistItem[],
  incoming: TWishlistItem[]
): TWishlistItem[] {
  const merged = new Map<string, TWishlistItem>();

  [...current, ...incoming].forEach((item) => {
    const key = item.productId || item.product.id;
    const existing = merged.get(key);

    if (!existing) {
      merged.set(key, item);
      return;
    }

    merged.set(key, {
      ...item,
      id: item.id.startsWith("local-") ? existing.id : item.id,
    });
  });

  return Array.from(merged.values());
}

export function parseGuestWishlist(raw: string | null): TWishlistItem[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => normalizeWishlistItem(asRecord(item)))
      .filter((item): item is TWishlistItem => Boolean(item));
  } catch {
    return [];
  }
}

export function getWishlistItems(wishlist?: TUserWishlist | null) {
  return wishlist?.items ?? [];
}
