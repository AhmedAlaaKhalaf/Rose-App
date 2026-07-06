import { TUserCart } from "@/lib/types/cart";
import { QueryClient } from "@tanstack/react-query";

export const CART_QUERY_KEY = ["user-cart"] as const;

export function getCartQueryKey(accessToken?: string) {
  return [...CART_QUERY_KEY, accessToken] as const;
}

export function setCartCache(queryClient: QueryClient, data: TUserCart) {
  queryClient.setQueriesData<TUserCart>({ queryKey: CART_QUERY_KEY }, data);
}

export function patchCartCache(
  queryClient: QueryClient,
  updater: (cart: TUserCart) => TUserCart
) {
  queryClient.setQueriesData<TUserCart>({ queryKey: CART_QUERY_KEY }, (old) =>
    old ? updater(old) : old
  );
}

export function snapshotCartCache(queryClient: QueryClient) {
  return queryClient.getQueriesData<TUserCart>({ queryKey: CART_QUERY_KEY });
}

export function restoreCartCache(
  queryClient: QueryClient,
  snapshots: ReturnType<typeof snapshotCartCache>
) {
  snapshots.forEach(([key, data]) => queryClient.setQueryData(key, data));
}

function withUpdatedItems(cart: TUserCart, cartItems: TUserCart["cart"]["cartItems"]): TUserCart {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const numOfCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    ...cart,
    numOfCartItems,
    cart: {
      ...cart.cart,
      cartItems,
      totalPrice,
    },
  };
}

export function optimisticUpdateQuantity(
  cart: TUserCart,
  cartItemId: string,
  quantity: number
): TUserCart {
  const cartItems = cart.cart.cartItems.map((item) =>
    item.id === cartItemId ? { ...item, quantity } : item
  );

  return withUpdatedItems(cart, cartItems);
}

export function optimisticRemoveItem(cart: TUserCart, cartItemId: string): TUserCart {
  const cartItems = cart.cart.cartItems.filter((item) => item.id !== cartItemId);
  return withUpdatedItems(cart, cartItems);
}
