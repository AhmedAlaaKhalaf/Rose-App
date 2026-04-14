"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  // Translation
  const t = useTranslations("about");

  return (
    <section id="about" className="py-12 w-full">
      <div className="px-4 container">
        <div className="items-center gap-12 grid lg:grid-cols-2">
          {/* Left Side - Images */}
          <div className="relative flex justify-center items-center">
            <div className="flex items-center gap-10 lg:gap-16">
              {/* Large Purple Gift Box */}
              <div
                className="before:absolute relative before:inset-0 before:border-[#A6252A] before:border-4 w-72 h-96 overflow-hidden before:content-[''] before:pointer-events-none"
                style={{
                  borderTopLeftRadius: "50px",
                  borderTopRightRadius: "120px",
                  borderBottomRightRadius: "120px",
                  borderBottomLeftRadius: "120px",
                  transform: "rotate(3.009deg)",
                }}
              >
                <Image
                  sizes="auto"
                  src="/assets/images/about-gift-1.png"
                  alt="Purple gift box"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "50% 80%", transform: "rotate(-3.009deg) scale(1.05)" }}
                />
              </div>

              {/* Right Column - Two Smaller Boxes */}
              <div className="flex flex-col gap-4 w-48">
                {/* Orange Gift Box - Circular */}
                <div
                  className="relative flex-shrink-0 bg-white w-48 h-48 overflow-hidden"
                  style={{ borderRadius: "150px" }}
                >
                  <Image
                    sizes="auto"
                    src="/assets/images/about-gift-2.png"
                    alt="Orange gift box"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Teal Gift Box - Custom Rounded */}
                <div
                  className="relative flex-shrink-0 bg-white w-48 h-36 overflow-hidden"
                  style={{
                    borderTopLeftRadius: "50px",
                    borderTopRightRadius: "100px",
                    borderBottomRightRadius: "100px",
                    borderBottomLeftRadius: "50px",
                  }}
                >
                  <Image
                    sizes="auto"
                    src="/assets/images/about-gift-3.png"
                    alt="Teal gift box"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "50% 70%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col gap-4">
            {/* Badge */}
            <div className="inline-flex justify-center items-center bg-[#FFE81A] shadow-lg rounded w-20 h-6">
              <span className="font-sarabun font-bold text-[#27272A] text-base uppercase leading-[100%] tracking-[0.25em]">
                {t("badge")}
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-2xl font-primary font-bold text-3xl leading-tight">
              <span className="text-[#741C21]">{t("heading.delivering-the")}</span>
              <span className="text-[#FF668B]">{t("heading.finest")}</span>
              <span className="text-[#741C21]">{t("heading.gift-boxes-for-your")}</span>
              <span className="text-[#FF668B]">{t("heading.special")}</span>
              <span className="text-[#741C21]">{t("heading.moments")}</span>
            </h2>

            {/* Description */}
            <p className="max-w-2xl font-primary font-normal text-[#71717A] text-base leading-relaxed">
              {t("description")}
            </p>

            {/* Discover Button */}
            <button className="group flex items-center gap-2.5 bg-[#A6252A] hover:bg-[#8B1F23] mt-2 px-4 py-2.5 rounded-lg w-fit font-semibold text-white transition-colors">
              {t("button")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Features Grid */}
            <div className="gap-4 grid sm:grid-cols-2 mt-2">
              <div className="flex items-center gap-4">
                <Check className="flex-shrink-0 w-6 h-6 text-[#741C21]" strokeWidth={3} />
                <span className="font-primary font-normal text-[#27272A] text-base leading-[100%] tracking-[0]">
                  {t("features.competitive-prices")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Check className="flex-shrink-0 w-6 h-6 text-[#741C21]" strokeWidth={3} />
                <span className="font-primary font-normal text-[#27272A] text-base leading-[100%] tracking-[0]">
                  {t("features.premium-quality")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Check className="flex-shrink-0 w-6 h-6 text-[#741C21]" strokeWidth={3} />
                <span className="font-primary font-normal text-[#27272A] text-base leading-[100%] tracking-[0]">
                  {t("features.perfect-occasion")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Check className="flex-shrink-0 w-6 h-6 text-[#741C21]" strokeWidth={3} />
                <span className="font-primary font-normal text-[#27272A] text-base leading-[100%] tracking-[0]">
                  {t("features.fast-delivery")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
