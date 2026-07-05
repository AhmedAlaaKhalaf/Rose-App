import OrderList from "@/components/features/orders/order-list";
import { authOptions } from "@/auth";
import { Order } from "@/lib/types/order";
import { normalizeOrdersResponse } from "@/lib/utils/orders";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

async function getOrdersServer(accessToken: string): Promise<Order[]> {
  const response = await fetch(`${process.env.API}/orders?page=1&limit=40`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : { status: false, message: await response.text() };

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload
        ? String(payload.message)
        : "Failed to load orders";
    throw new Error(message);
  }

  return normalizeOrdersResponse(payload);
}

export default async function OrdersPage() {
  const t = await getTranslations("orders");
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
