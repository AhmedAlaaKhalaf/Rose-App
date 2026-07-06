import type { TAddress } from "../types/addresses";
import { createOrder } from "./create-order.service";

export async function cashOrderService(token: string, shippingAddress: TAddress) {
  return createOrder(token, shippingAddress, "CASH_ON_DELIVERY");
}
