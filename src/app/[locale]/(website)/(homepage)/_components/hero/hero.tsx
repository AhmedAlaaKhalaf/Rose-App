import React from "react";
import PromoCard from "./promo-card";
import CarouselSection from "./carousel";
import Occasions from "./occasions";
import Features from "./features";

/**
 * Hero Component
 * --------------
 * Main hero section of the homepage.
 * Combines multiple sub-sections:
 * - PromoCard (static promotional content)
 * - CarouselSection (hero image carousel)
 * - Occasions (occasion-based cards)
 * - Features (key selling points)
 */

export default function Hero() {
  return (
    <section className="space-y-6 mx-auto py-6 w-full container">
      {/* Banner section: Promo card + Hero carousel */}
      <div className="flex md:flex-row flex-col items-center gap-6 h-full">
        {/* Promotional static card */}
        <PromoCard />

        {/* Main hero carousel */}
        <CarouselSection />
      </div>

      {/* Occasion-based cards */}
      <Occasions />

      {/* Feature highlights */}
      <Features />
    </section>
  );
}
