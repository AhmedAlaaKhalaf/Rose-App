import React from "react";
import PromoCard from "./promo-card";
import CarouselSection from "./carousel";
import Occasions from "./occasions";
import Features from "./features";
import {
  homepageContainer,
  homepageHeroRowGap,
  homepageHeroStack,
} from "@/lib/constants/homepage-spacing";

export default function Hero() {
  return (
    <section className="w-full">
      <div className={`${homepageContainer} ${homepageHeroStack}`}>
        <div
          className={`flex flex-col lg:flex-row lg:h-full lg:items-center ${homepageHeroRowGap} w-full min-w-0`}
        >
          <PromoCard />
          <div className="flex-1 min-w-0 w-full lg:min-w-0">
            <CarouselSection />
          </div>
        </div>

        <Occasions />
        <Features />
      </div>
    </section>
  );
}
