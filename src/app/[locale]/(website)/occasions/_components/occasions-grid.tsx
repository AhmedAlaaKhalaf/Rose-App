import { Link } from "@/i18n/navigation";
import { getOccasions } from "@/lib/services/occasion.service";
import { ArrowRight, PartyPopper } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const OCCASION_OVERLAY =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(166, 37, 42, 0.65) 100%)";

export default async function OccasionsGrid() {
  const t = await getTranslations("occasionsPage");

  let occasions: Awaited<ReturnType<typeof getOccasions>>["payload"]["data"] = [];

  try {
    const payload = await getOccasions(24);
    occasions = payload.payload.data;
  } catch {
    occasions = [];
  }

  if (occasions.length === 0) {
    return (
      <section className="flex flex-col justify-center items-center gap-4 bg-white dark:bg-zinc-900/40 px-6 py-20 border border-zinc-100 dark:border-zinc-800 rounded-3xl text-zinc-500">
        <PartyPopper className="size-14 text-zinc-400" strokeWidth={1.5} />
        <p className="font-medium text-lg">{t("empty")}</p>
      </section>
    );
  }

  return (
    <section className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
      {occasions.map((occasion) => (
        <Link
          key={occasion.id}
          href={`/products?occasionId=${occasion.id}`}
          className="group relative rounded-3xl aspect-[4/3] overflow-hidden"
        >
          <Image
            src={occasion.image}
            alt={occasion.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div
            className="absolute inset-0 flex flex-col justify-end gap-3 p-6"
            style={{ background: OCCASION_OVERLAY }}
          >
            <h2 className="font-semibold text-white text-2xl leading-tight">{occasion.title}</h2>
            {occasion.description && (
              <p className="text-white/85 text-sm line-clamp-2">{occasion.description}</p>
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
