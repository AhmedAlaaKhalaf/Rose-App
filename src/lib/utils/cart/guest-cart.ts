import { GUEST_CART_KEY } from "../../constants/global-constants";
import { TAddToCartPayload } from "../../types/add-to-cart";

// add to cart for guest users using localStorage
export function addToGuestCart(payload: TAddToCartPayload) {
  if (typeof window === "undefined") return;

  const existingCart = localStorage.getItem(GUEST_CART_KEY);
  const cart = existingCart ? JSON.parse(existingCart) : [];

  const existingItemIndex = cart.findIndex(
    (item: TAddToCartPayload) => item.product === payload.product
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += payload.quantity;
  } else {
    cart.push(payload);
  }

  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));

  return cart;
}

// get guest cart items
export function getGuestCart() {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem(GUEST_CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

// clear guest cart
export function clearGuestCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GUEST_CART_KEY);
}
