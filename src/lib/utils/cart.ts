import { TCartItem, TCartProduct, TUserCart } from "../types/cart";

type RawRecord = Record<string, unknown>;

const ITEM_KEYS = ["cartItems", "items", "products"] as const;

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

  if (!product.title && item.title) {
    return {
      ...product,
      id: product.id ?? product._id ?? item.productId,
      title: item.title,
      cover: product.cover ?? product.imgCover ?? item.cover ?? item.imgCover,
      price: product.price ?? item.price,
    };
  }

  return product;
}

function normalizeCartProduct(product: RawRecord, productId: unknown, fallbackPrice: unknown): TCartProduct {
  return {
    id: String(productId ?? product.id ?? product._id ?? ""),
    title: String(product.title ?? ""),
    cover: String(product.cover ?? product.imgCover ?? ""),
    price: String(product.price ?? fallbackPrice ?? "0"),
  };
}

function normalizeCartItem(item: RawRecord): TCartItem {
  const product = resolveProductRecord(item);
  const productId = product.id ?? product._id ?? item.productId ?? item.product;

  return {
    id: String(item.id ?? item._id ?? ""),
    quantity: Number(item.quantity ?? 1),
    price: Number(item.price ?? product.price ?? 0),
    product: normalizeCartProduct(product, productId, item.price),
  };
}

function buildCartObject(source: RawRecord, items: TCartItem[]): TUserCart["cart"] {
  return {
    id: String(source.id ?? source._id ?? ""),
    userId: String(source.userId ?? source.user ?? ""),
    cartItems: items,
    appliedCoupons: Array.isArray(source.appliedCoupons)
      ? (source.appliedCoupons as string[])
      : Array.isArray(source.coupons)
        ? (source.coupons as string[])
        : [],
    totalPrice: Number(source.totalPrice ?? 0),
    createdAt: String(source.createdAt ?? ""),
    updatedAt: String(source.updatedAt ?? ""),
  };
}

function extractRawItems(source: RawRecord): RawRecord[] | undefined {
  for (const key of ITEM_KEYS) {
    if (Array.isArray(source[key])) {
      return source[key] as RawRecord[];
    }
  }

  const cart = asRecord(source.cart);

  for (const key of ITEM_KEYS) {
    if (Array.isArray(cart[key])) {
      return cart[key] as RawRecord[];
    }
  }

  return undefined;
}

function buildNormalizedCart(
  response: RawRecord,
  source: RawRecord,
  rawItems: RawRecord[]
): TUserCart {
  const cartItems = rawItems.map(normalizeCartItem);
  const cartMeta = Object.keys(asRecord(source.cart)).length > 0 ? asRecord(source.cart) : source;
  const payload = asRecord(response.payload);

  return {
    message: String(response.message ?? payload.message ?? source.message ?? ""),
    numOfCartItems: Number(
      source.numOfCartItems ??
        response.numOfCartItems ??
        payload.numOfCartItems ??
        cartItems.reduce((sum, item) => sum + item.quantity, 0)
    ),
    cart: buildCartObject(cartMeta, cartItems),
  };
}

function resolveCartPayload(raw: unknown): TUserCart | null {
  const response = asRecord(raw);
  const payload = asRecord(response.payload);

  if (payload.data) {
    return resolveCartPayload({ ...response, payload: payload.data });
  }

  const payloadItems = extractRawItems(payload);
  if (payloadItems) {
    return buildNormalizedCart(response, payload, payloadItems);
  }

  const responseItems = extractRawItems(response);
  if (responseItems) {
    return buildNormalizedCart(response, response, responseItems);
  }

  return null;
}

export function tryNormalizeCartPayload(raw: unknown): TUserCart | null {
  return resolveCartPayload(raw);
}

export function normalizeCartPayload(raw: unknown): TUserCart {
  const response = asRecord(raw);
  const payload = asRecord(response.payload);

  return (
    resolveCartPayload(raw) ?? {
      message: String(response.message ?? payload.message ?? ""),
      numOfCartItems: Number(response.numOfCartItems ?? payload.numOfCartItems ?? 0),
      cart: buildCartObject(asRecord(payload.cart) || payload || {}, []),
    }
  );
}

export function getCartItems(cartData?: TUserCart | null) {
  return cartData?.cart?.cartItems ?? [];
}
