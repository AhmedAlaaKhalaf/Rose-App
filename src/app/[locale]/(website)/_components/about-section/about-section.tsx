"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { homepageContainer } from "@/lib/constants/homepage-spacing";

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-10 sm:py-12 lg:py-16 xl:py-20 w-full overflow-hidden">
      <div className={homepageContainer}>
        <div className="items-center gap-10 sm:gap-12 lg:gap-16 xl:gap-20 grid lg:grid-cols-2">
          <div className="relative flex justify-center items-center overflow-hidden">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-16">
              <div
                className="before:absolute relative before:inset-0 before:border-[#A6252A] before:border-4 w-56 sm:w-64 lg:w-72 h-72 sm:h-80 lg:h-96 overflow-hidden before:content-[''] before:pointer-events-none"
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

              <div className="flex flex-col gap-4 w-40 sm:w-44 lg:w-48">
                <div
                  className="relative flex-shrink-0 bg-white w-40 sm:w-44 lg:w-48 h-40 sm:h-44 lg:h-48 overflow-hidden"
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

                <div
                  className="relative flex-shrink-0 bg-white w-40 sm:w-44 lg:w-48 h-28 sm:h-32 lg:h-36 overflow-hidden"
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

          <div className="flex flex-col gap-5 lg:gap-6">
            <div className="inline-flex justify-center items-center bg-[#FFE81A] shadow-lg rounded w-20 h-6">
              <span className="font-sarabun font-bold text-[#27272A] text-base uppercase leading-[100%] tracking-[0.25em]">
                {t("badge")}
              </span>
            </div>

            <h2 className="max-w-2xl font-primary font-bold text-2xl sm:text-3xl lg:text-3xl leading-tight">
              <span className="text-[#741C21]">{t("heading.delivering-the")}</span>
              <span className="text-[#FF668B]">{t("heading.finest")}</span>
              <span className="text-[#741C21]">{t("heading.gift-boxes-for-your")}</span>
              <span className="text-[#FF668B]">{t("heading.special")}</span>
              <span className="text-[#741C21]">{t("heading.moments")}</span>
            </h2>

            <p className="max-w-2xl font-primary font-normal text-[#71717A] text-base leading-relaxed">
              {t("description")}
            </p>

            <button className="group flex items-center gap-2.5 bg-[#A6252A] hover:bg-[#8B1F23] mt-2 px-4 py-2.5 rounded-lg w-fit font-semibold text-white transition-colors">
              {t("button")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="gap-4 grid sm:grid-cols-2 mt-2">
              <div className="flex items-center gap-4">
                <Check className="flex-shrink-0 w-6 h-6 text-[#741C21]" strokeWidth={3} />
                <span className="font-primary font-normal text-[#27272A] text-sm leading-[100%] tracking-[0]">
                  {t("features.competitive-prices")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Check className="flex-shrink-0 w-6 h-6 text-[#741C21]" strokeWidth={3} />
                <span className="font-primary font-normal text-[#27272A] text-sm leading-[100%] tracking-[0]">
                  {t("features.premium-quality")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Check className="flex-shrink-0 w-6 h-6 text-[#741C21]" strokeWidth={3} />
                <span className="font-primary font-normal text-[#27272A] text-sm leading-[100%] tracking-[0]">
                  {t("features.perfect-occasion")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Check className="flex-shrink-0 w-6 h-6 text-[#741C21]" strokeWidth={3} />
                <span className="font-primary font-normal text-[#27272A] text-sm leading-[100%] tracking-[0]">
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
