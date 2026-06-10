import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHead, SectionTitle } from "@/components/ui/section-header";

export default function GallerySection() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="px-4 py-8 w-full">
      {/* Gallery Header */}
      <div className="flex flex-col items-center gap-2 mb-12">
        <SectionTitle>{t("badge")}</SectionTitle>
        <SectionHead>{t("heading")}</SectionHead>
      </div>
      {/* Gallery Grid */}
      <div className="gap-4 grid lg:grid-cols-3 mx-auto max-w-[1281px]">
        {/* Column 1 */}
        <div className="gap-4 grid">
          <div className="relative aspect-[418/617] overflow-hidden">
            <Image
              priority
              fill
              src="/assets/images/gallery-1.png"
              alt="Wedding and anniversary gift boxes"
              className="object-cover"
              sizes="(min-width: 1024px) 427px, 100vw"
            />
          </div>

          <div className="relative aspect-[418/406] overflow-hidden">
            <Image
              fill
              src="/assets/images/gallery-4.png"
              alt="Roses and chocolates"
              className="object-cover"
              sizes="(min-width: 1024px) 427px, 100vw"
            />
          </div>
        </div>
        {/* Column 2 */}
        <div className="gap-4 grid">
          <div className="relative aspect-[419/411] overflow-hidden">
            <Image
              fill
              src="/assets/images/gallery-2.png"
              alt="Birthday gift box with red ribbon"
              className="object-cover"
              sizes="(min-width: 1024px) 427px, 100vw"
            />
          </div>

          <div className="relative aspect-[419/611] overflow-hidden">
            <Image
              fill
              src="/assets/images/gallery-5.png"
              alt="Ring box with flowers"
              className="object-cover"
              sizes="(min-width: 1024px) 427px, 100vw"
            />
          </div>
        </div>
        {/* Column 3 */}
        <div className="gap-4 grid">
          <div className="relative aspect-[418/411] overflow-hidden">
            <Image
              fill
              src="/assets/images/gallery-3.png"
              alt="Engagement ring box"
              className="object-cover"
              sizes="(min-width: 1024px) 427px, 100vw"
            />
          </div>

          <div className="relative aspect-[418/611] overflow-hidden">
            <Image
              fill
              src="/assets/images/gallery-6.png"
              alt="Engagement congratulations card"
              className="object-cover"
              sizes="(min-width: 1024px) 427px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
