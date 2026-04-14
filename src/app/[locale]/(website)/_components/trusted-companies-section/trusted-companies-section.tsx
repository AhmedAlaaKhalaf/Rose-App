"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

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
    <section className="w-full">
      <div className="mx-auto px-4 max-w-[1280px]">
        {/* Background Container */}
        <div className="flex flex-col justify-center items-center gap-6 bg-[#FFE0E7] px-8 py-8 rounded-3xl h-[207px]">
          {/* Heading */}
          <h2 className="font-primary font-bold text-[#741C21] text-3xl text-center">
            {t("heading.trusted-by")} <span className="text-[#FF668B]">{t("heading.count")}</span>{" "}
            {t("heading.companies")}
          </h2>

          {/* Logos Grid */}
          <div className="flex flex-wrap justify-center items-center gap-8 w-full max-w-[1232px]">
            {companies.map((company, index) => (
              <div
                key={index}
                className="relative opacity-60 hover:opacity-100 grayscale hover:grayscale-0 w-[146px] h-[51px] transition-all"
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
