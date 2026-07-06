import BestSellingSection from "./_components/best-selling/best-selling-section";
import MostPopularSection from "./_components/most-popular/most-popular-section";
import Testimonials from "./_components/testimonials-section/testimonials";
import Hero from "./_components/hero/hero";
import AboutSection from "../_components/about-section/about-section";
import GallerySection from "../_components/gallery-section/gallery-section";
import TrustedCompaniesSection from "../_components/trusted-companies-section/trusted-companies-section";
import {
  homepagePageMargin,
  homepageSectionGap,
} from "@/lib/constants/homepage-spacing";

import { SearchParams } from "@/lib/types/global";

type HomePageProps = {
  searchParams: SearchParams;
};

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <main
      className={`flex flex-col ${homepageSectionGap} ${homepagePageMargin} w-full max-w-full overflow-x-hidden`}
    >
      <Hero />

      {/* Best Selling */}
      <BestSellingSection />

      {/* Popular Products */}
      <MostPopularSection searchParams={searchParams} />

      {/* About Section */}
      <AboutSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Testimonials */}
      <Testimonials />

      {/* Trusted Companies */}
      <TrustedCompaniesSection />
    </main>
  );
}
