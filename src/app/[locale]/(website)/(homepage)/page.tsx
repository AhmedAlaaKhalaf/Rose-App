import BestSellingSection from "./_components/best-selling/best-selling-section";
import MostPopularSection from "./_components/most-popular/most-popular-section";
import Testimonials from "./_components/testimonials-section/testimonials";
import Hero from "./_components/hero/hero";
import AboutSection from "../_components/about-section/about-section";
import GallerySection from "../_components/gallery-section/gallery-section";
import TrustedCompaniesSection from "../_components/trusted-companies-section/trusted-companies-section";

import { SearchParams } from "@/lib/types/global";

type HomePageProps = {
  searchParams: SearchParams;
};

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <main className="flex flex-col items-center gap-36 mb-36">
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

      {/* Testimonials */}
      <Testimonials />

      {/* Trusted Companies */}
      <TrustedCompaniesSection />
    </main>
  );
}
