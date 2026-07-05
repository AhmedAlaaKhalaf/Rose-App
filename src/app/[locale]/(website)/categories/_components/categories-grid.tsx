import { Link } from "@/i18n/navigation";
import { getCategories } from "@/lib/services/categories.service";
import { ArrowRight, ClipboardList } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const CATEGORY_OVERLAY =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(166, 37, 42, 0.65) 100%)";

export default async function CategoriesGrid() {
  const t = await getTranslations("categoriesPage");

  let categories: Awaited<ReturnType<typeof getCategories>>["payload"]["data"] = [];

  try {
    const payload = await getCategories(24);
    categories = payload.payload.data;
  } catch {
    categories = [];
  }

  if (categories.length === 0) {
    return (
      <section className="flex flex-col justify-center items-center gap-4 bg-white dark:bg-zinc-900/40 px-6 py-20 border border-zinc-100 dark:border-zinc-800 rounded-3xl text-zinc-500">
        <ClipboardList className="size-14 text-zinc-400" strokeWidth={1.5} />
        <p className="font-medium text-lg">{t("empty")}</p>
      </section>
    );
  }

  return (
    <section className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products?categoryId=${category.id}`}
          className="group relative rounded-3xl aspect-[4/3] overflow-hidden"
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div
            className="absolute inset-0 flex flex-col justify-end gap-3 p-6"
            style={{ background: CATEGORY_OVERLAY }}
          >
            <h2 className="font-semibold text-white text-2xl leading-tight">{category.title}</h2>
            {category.description && (
              <p className="text-white/85 text-sm line-clamp-2">{category.description}</p>
            )}
            <span className="inline-flex items-center gap-2 w-fit font-medium text-white text-sm">
              {t("view-products")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
