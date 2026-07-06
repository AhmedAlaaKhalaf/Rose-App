import { resolveProductCover } from "./product-image";
import type { Order, OrderItem, OrderPaymentType, OrderState } from "../types/order";

type RawRecord = Record<string, unknown>;

function asRecord(value: unknown): RawRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RawRecord) : {};
}

function normalizeOrderStatus(status: unknown): OrderState | string {
  const value = String(status ?? "PENDING").toUpperCase();

  const map: Record<string, OrderState> = {
    PENDING: "pending",
    CONFIRMED: "processing",
    PROCESSING: "processing",
    SHIPPED: "processing",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
    REFUNDED: "cancelled",
  };

  return map[value] ?? value.toLowerCase();
}

function normalizePaymentMethod(method: unknown): OrderPaymentType | string {
  const value = String(method ?? "").toUpperCase();

  if (value === "CASH_ON_DELIVERY") return "cash";
  if (value === "CREDIT_CARD" || value === "CARD") return "credit-card";

  return String(method ?? "").toLowerCase();
}

function normalizeOrderProduct(product: RawRecord, item: RawRecord): OrderItem["product"] {
  return {
    _id: String(product.id ?? product._id ?? item.productId ?? ""),
    title: String(product.title ?? product.name ?? ""),
    imgCover: resolveProductCover(
      String(product.cover ?? product.imgCover ?? product.image ?? "")
    ),
    rateAvg: Number(product.rateAvg ?? product.rating ?? product.averageRating ?? 0),
    rateCount: Number(product.rateCount ?? product.reviewsCount ?? product.ratingCount ?? 0),
  };
}

function normalizeOrderItem(item: RawRecord): OrderItem {
  const product = asRecord(item.product ?? item);

  return {
    _id: String(item.id ?? item._id ?? ""),
    quantity: Number(item.quantity ?? 1),
    price: Number(item.price ?? item.unitPrice ?? product.price ?? 0),
    product: normalizeOrderProduct(product, item),
  };
}

function extractOrderItems(raw: RawRecord): OrderItem[] {
  const items = raw.orderItems ?? raw.items ?? raw.orderLines;

  if (!Array.isArray(items)) return [];

  return items.map((item) => normalizeOrderItem(asRecord(item)));
}

export function normalizeOrder(raw: RawRecord): Order {
  const status = String(raw.status ?? raw.state ?? "PENDING");
  const paymentStatus = String(raw.paymentStatus ?? "").toUpperCase();

  return {
    _id: String(raw.id ?? raw._id ?? ""),
    orderNumber: String(raw.trackingNumber ?? raw.orderNumber ?? ""),
    createdAt: String(raw.createdAt ?? ""),
    totalPrice: Number(raw.total ?? raw.totalPrice ?? raw.subtotal ?? 0),
    isPaid: paymentStatus === "SUCCEEDED" || Boolean(raw.isPaid),
    isDelivered: status.toUpperCase() === "DELIVERED" || Boolean(raw.isDelivered),
    state: normalizeOrderStatus(status),
    paymentType: normalizePaymentMethod(raw.paymentMethod ?? raw.paymentType),
    orderItems: extractOrderItems(raw),
  };
}

export function normalizeOrdersResponse(raw: unknown): Order[] {
  const response = asRecord(raw);

  if (response.status === false) {
    throw new Error(String(response.message ?? "Failed to load orders"));
  }

  const payload = asRecord(response.payload);
  const nested = asRecord(payload.data);

  const rawOrders = (
    Array.isArray(payload.data)
      ? payload.data
      : Array.isArray(nested.orders)
        ? nested.orders
        : Array.isArray(payload.orders)
          ? payload.orders
          : Array.isArray(response.orders)
            ? response.orders
            : []
  ) as RawRecord[];

  return rawOrders.map(normalizeOrder).filter((order) => order._id);
}

export function extractOrderId(raw: unknown): string {
  const response = asRecord(raw);
  const payload = asRecord(response.payload);
  const order = asRecord(payload.order ?? payload.data ?? payload);

  return String(order.id ?? order._id ?? payload.id ?? "");
}
