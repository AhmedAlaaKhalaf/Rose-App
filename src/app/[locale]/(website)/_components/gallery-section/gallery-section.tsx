import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHead, SectionTitle } from "@/components/ui/section-header";
import { homepageContainer } from "@/lib/constants/homepage-spacing";

const GALLERY_IMAGES = [
  { src: "/assets/images/gallery-1.png", alt: "Wedding and anniversary gift boxes" },
  { src: "/assets/images/gallery-2.png", alt: "Birthday gift box with red ribbon" },
  { src: "/assets/images/gallery-3.png", alt: "Engagement ring box" },
  { src: "/assets/images/gallery-4.png", alt: "Roses and chocolates" },
  { src: "/assets/images/gallery-5.png", alt: "Ring box with flowers" },
  { src: "/assets/images/gallery-6.png", alt: "Engagement congratulations card" },
] as const;

/** Desktop masonry slots — percentages of the 1281×1147 Figma canvas */
const DESKTOP_GALLERY_SLOTS = [
  { top: "0%", left: "0%", width: "32.63%", height: "53.79%" },
  { top: "0%", left: "33.64%", width: "32.71%", height: "35.83%" },
  { top: "0%", left: "67.37%", width: "32.63%", height: "35.83%" },
  { top: "55.01%", left: "0%", width: "32.63%", height: "35.40%" },
  { top: "37.14%", left: "33.64%", width: "32.71%", height: "53.27%" },
  { top: "37.14%", left: "67.37%", width: "32.63%", height: "53.27%" },
] as const;

export default function GallerySection() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="py-8 w-full overflow-hidden">
      <div className={homepageContainer}>
        <div className="flex flex-col items-center gap-2 mb-8 sm:mb-12">
          <SectionTitle>{t("badge")}</SectionTitle>
          <SectionHead>{t("heading")}</SectionHead>
        </div>

        {/* Mobile & tablet */}
        <div className="lg:hidden gap-3 sm:gap-4 grid grid-cols-2 md:grid-cols-3 w-full">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className={`relative rounded-lg sm:rounded-xl overflow-hidden aspect-[4/5] sm:aspect-square ${
                index === 0 ? "col-span-2 row-span-2 md:col-span-1 md:row-span-1 aspect-square" : ""
              }`}
            >
              <Image
                priority={index === 0}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
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

        {/* Desktop — fluid masonry scaled to container width */}
        <div className="hidden lg:block relative w-full max-w-full aspect-[1281/1147]">
          {GALLERY_IMAGES.map((image, index) => {
            const slot = DESKTOP_GALLERY_SLOTS[index];

            return (
              <div
                key={image.src}
                className="absolute overflow-hidden"
                style={{
                  top: slot.top,
                  left: slot.left,
                  width: slot.width,
                  height: slot.height,
                }}
              >
                <Image
                  priority={index === 0}
                  sizes="(max-width: 1280px) 33vw, 400px"
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
