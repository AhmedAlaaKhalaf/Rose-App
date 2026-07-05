"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { homepageContainer } from "@/lib/constants/homepage-spacing";

export default function TrustedCompaniesSection() {
  const t = useTranslations("trusted-companies");

  const companies = [
    { name: "Coconut", logo: "/assets/images/brands/coconut.png" },
    { name: "Ginyard", logo: "/assets/images/brands/ginyard.png" },
    { name: "Ingoude Company", logo: "/assets/images/brands/ingoude-company.png" },
    { name: "Velvet", logo: "/assets/images/brands/velvet.png" },
    { name: "Ingoude", logo: "/assets/images/brands/ingoude.png" },
    { name: "Habur Furniture", logo: "/assets/images/brands/habur.png" },
  ];

  return (
    <section className="w-full pt-4 lg:pt-8">
      <div className={homepageContainer}>
        <div className="flex flex-col justify-center items-center gap-5 sm:gap-6 lg:gap-8 bg-[#FFE0E7] px-5 sm:px-8 lg:px-10 xl:px-12 py-8 sm:py-10 lg:py-8 rounded-2xl lg:rounded-3xl min-h-[10rem] lg:min-h-0 lg:h-[207px]">
          <h2 className="font-primary font-bold text-[#741C21] text-xl sm:text-2xl lg:text-3xl text-center">
            {t("heading.trusted-by")} <span className="text-[#FF668B]">{t("heading.count")}</span>{" "}
            {t("heading.companies")}
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 w-full">
            {companies.map((company, index) => (
              <div
                key={index}
                className="relative opacity-60 hover:opacity-100 grayscale hover:grayscale-0 w-24 sm:w-32 lg:w-[146px] h-9 sm:h-11 lg:h-[51px] transition-all"
              >
                <Image
                  sizes="auto"
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
