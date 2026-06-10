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
    <div className="mx-auto container">
      {/* Background Container */}
      <div className="flex flex-col justify-center items-center gap-6 bg-[#FFE0E7] p-8 px- rounded-3xl">
        {/* Heading */}
        <h2 className="font-primary font-bold text-[#741C21] text-3xl text-center">
          {t("heading.trusted-by")} <span className="text-[#FF668B]">{t("heading.count")}</span>
          {t("heading.companies")}
        </h2>

        {/* Logos Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 w-full">
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
  );
}
