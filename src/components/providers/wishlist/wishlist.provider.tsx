"use client";

import { useWishlistToAdd } from "@/hooks/wishlist/use-wishlist";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type TLocaleWishlistItem = {
  productId: string;
  ApiWishlistId: string;
};

type TWishlistContext = {
  wishlist: TLocaleWishlistItem[];
  toggleWishlist: (productId: string) => void;
  setWishlist: React.Dispatch<React.SetStateAction<TLocaleWishlistItem[]>>;
};

const WishlistContext = createContext<TWishlistContext>({
  wishlist: [],
  toggleWishlist: () => {},
  setWishlist: () => {},
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<TLocaleWishlistItem[]>([]);
  const hasSynced = useRef(false);

  const { status } = useSession();
  const { mutateAsync: addUserWishlist } = useWishlistToAdd();

  const isUserLoggedIn = status === "authenticated";

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (!stored) return;

    try {
      setWishlist(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to parse wishlist from localStorage", err);
    }
  }, []);

  useEffect(() => {
    if (!isUserLoggedIn || hasSynced.current) return;

    const stored = localStorage.getItem("wishlist");
    if (!stored) return;

    const syncWishlist = async () => {
      try {
        hasSynced.current = true;

        const localWishlist: TLocaleWishlistItem[] = JSON.parse(stored);

        await Promise.all(
          localWishlist.map(({ productId }) =>
            addUserWishlist(productId)
              .then(({ payload }) =>
                setWishlist((prev) => {
                  const exists = prev.some(
                    (item) => item.productId === payload.wishlistItem.productId
                  );

                  const updated = exists
                    ? prev.map((item) =>
                        item.productId === payload.wishlistItem.productId
                          ? { productId: item.productId, ApiWishlistId: payload.wishlistItem.id }
                          : item
                      )
                    : [
                        ...prev,
                        {
                          productId: payload.wishlistItem.productId,
                          ApiWishlistId: payload.wishlistItem.id,
                        },
                      ];

                  return updated;
                })
              )
              .catch((error) => {
                console.error(`Failed to sync product with id => ${productId}`, error);
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

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.productId === productId);

      const updated = exists
        ? prev.filter((item) => item.productId !== productId)
        : [...prev, { productId, ApiWishlistId: "" }];

      if (!isUserLoggedIn) {
        localStorage.setItem("wishlist", JSON.stringify(updated));
      } else {
        addUserWishlist(productId).catch((err) =>
          console.error("Failed to update server wishlist", err)
        );
      }

      return updated;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlistContext = () => useContext(WishlistContext);
