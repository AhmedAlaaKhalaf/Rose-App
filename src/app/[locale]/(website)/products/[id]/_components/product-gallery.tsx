"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/tailwind-merge";
import { X } from "lucide-react";
import logo from "@/../public/assets/logo.png";

interface ProductGalleryProps {
  title: string;
  imgCover: string;
  images: string[];
}

export default function ProductGallery({ title, imgCover }: ProductGalleryProps) {
  // state
  const [activeImage, setActiveImage] = useState("/assets/product-placeholder.webp");
  const [isFullscreen, setIsFullscreen] = useState(false);

  //all images
  // const allImages = Array.from(new Set([imgCover, ...images]));
  const allImages = [
    // "https://placehold.net/product.svg",
    // "https://placehold.net/book.svg",
    // "https://placehold.net/shape.svg",
    // "https://placehold.net/building.svg",
    // "https://placehold.net/map-600x600.png",
    // "https://placehold.net/default.svg",
    "/assets/product-placeholder.webp",
    "/assets/product-placeholder.webp",
    "/assets/product-placeholder.webp",
    "/assets/product-placeholder.webp",
    "/assets/product-placeholder.webp",
    "/assets/product-placeholder.webp",
  ];

  //   functions
  const chooseImage = (imgUrl: string) => {
    setActiveImage(imgUrl);
  };

  return (
    <div className="flex flex-col gap-y-3">
      {/* Cover Image */}
      <figure
        onClick={() => setIsFullscreen(true)}
        className="relative rounded-md aspect-[605/402] overflow-hidden cursor-pointer"
      >
        <Image
          key={activeImage}
          src={activeImage ?? logo}
          alt={title ?? "product image"}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          priority={activeImage === imgCover}
          className="object-cover"
        />
      </figure>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/80">
          <button
            className="top-4 right-4 z-50 absolute font-bold text-white hover:text-primary text-3xl transition-colors duration-300"
            onClick={() => setIsFullscreen(false)}
          >
            <X />
          </button>
          <figure className="relative w-full max-w-[90%] h-full max-h-[90%]">
            <Image
              src={activeImage}
              alt={title ?? "fullscreen image"}
              fill
              className="rounded-xl object-contain"
            />
          </figure>
        </div>
      )}

      {/* Thumbnails */}
      <div className="gap-2 grid grid-cols-6 overflow-x-auto hide-scroll">
        {allImages.map((img, index) => {
          const isActive = activeImage === img;
          return (
            <figure
              key={index}
              onClick={() => chooseImage(img)}
              className={cn(
                "group relative border-2 rounded-sm aspect-[91/111] overflow-hidden transition cursor-pointer",
                isActive && "border-primary opacity-100"
              )}
            >
              {/* overlay */}
              {!isActive && (
                <div className="z-10 absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors"></div>
              )}
              {/* image */}
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                sizes="150px"
                fill
                className="object-cover"
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}
