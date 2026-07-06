"use client";

import useUserWishlist from "@/hooks/wishlist/use-user-wishlist";
import { useWishlistToAdd } from "@/hooks/wishlist/use-wishlist";
import { TProductCard } from "@/lib/types/product";
import { TWishlistItem } from "@/lib/types/wishlist";
import { parseGuestWishlist, productToWishlistItem, mergeWishlistItems } from "@/lib/utils/wishlist";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type TLocaleWishlistItem = {
  productId: string;
  ApiWishlistId: string;
};

type TWishlistContext = {
  items: TWishlistItem[];
  toggleWishlist: (product: TProductCard) => void;
  setItems: React.Dispatch<React.SetStateAction<TWishlistItem[]>>;
  isWishlisted: (productId: string) => boolean;
};

const WishlistContext = createContext<TWishlistContext>({
  items: [],
  toggleWishlist: () => {},
  setItems: () => {},
  isWishlisted: () => false,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TWishlistItem[]>([]);
  const hasSynced = useRef(false);

  const { status } = useSession();
  const { data: serverWishlist } = useUserWishlist();
  const { mutateAsync: addUserWishlist } = useWishlistToAdd();

  const isUserLoggedIn = status === "authenticated";

  useEffect(() => {
    setItems(parseGuestWishlist(localStorage.getItem("wishlist")));
  }, []);

  useEffect(() => {
    if (isUserLoggedIn && serverWishlist) {
      setItems((prev) => mergeWishlistItems(prev, serverWishlist.items));
    }
  }, [isUserLoggedIn, serverWishlist]);

  useEffect(() => {
    if (!isUserLoggedIn || hasSynced.current) return;

    const stored = localStorage.getItem("wishlist");
    if (!stored) return;

    const syncWishlist = async () => {
      try {
        hasSynced.current = true;

        const localWishlist = parseGuestWishlist(stored);

        await Promise.all(
          localWishlist.map((item) =>
            addUserWishlist(item.product.id).catch((error) => {
              console.error(`Failed to sync product with id => ${item.product.id}`, error);
            })
          )
        );

        localStorage.removeItem("wishlist");
      } catch (err) {
        console.error("Failed to sync wishlist after login", err);
      }
    };

    syncWishlist();
  }, [isUserLoggedIn, addUserWishlist]);

  const isWishlisted = (productId: string) => items.some((item) => item.product.id === productId);

  const toggleWishlist = (product: TProductCard) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);

      const updated = exists
        ? prev.filter((item) => item.product.id !== product.id)
        : [...prev, productToWishlistItem(product)];

      if (!isUserLoggedIn) {
        localStorage.setItem("wishlist", JSON.stringify(updated));
      }

      return updated;
    });
  };

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, setItems, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlistContext = () => useContext(WishlistContext);
