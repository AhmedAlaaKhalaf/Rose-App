import { TProductCard } from "./product";

export type TWishlistItem = {
  id: string;
  productId: string;
  product: TProductCard;
};

export type TUserWishlist = {
  items: TWishlistItem[];
  count: number;
};
