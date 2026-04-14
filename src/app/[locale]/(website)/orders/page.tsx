import OrderList from "@/components/features/orders/order-list";
import { authOptions } from "@/auth";
import { Order, OrdersResponse } from "@/lib/types/order";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

// Functions
async function getOrdersServer(accessToken: string): Promise<Order[]> {
  const response = await fetch(`${process.env.API}/orders?page=1&limit=40`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "";
  const payload: ApiResponse<OrdersResponse> = contentType.includes("application/json")
    ? await response.json()
    : { error: await response.text() };

  if (!response.ok || "message" in payload) {
    const message = "message" in payload ? payload.message : "Failed to load orders";
    throw new Error(message);
  }

  return payload.orders ?? [];
}

export default async function OrdersPage() {
  // Translation
  const t = await getTranslations("orders");

  // Variables
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error(t("failed-to-load"));
  }

  const orders = await getOrdersServer(session.accessToken);

  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="mx-auto max-w-[1280px]">
        <h1 className="mb-6 font-primary font-bold text-gray-800 text-5xl leading-none">
          {t("title")}
        </h1>
      </div>
      <OrderList orders={orders} />
    </div>
  );
}
