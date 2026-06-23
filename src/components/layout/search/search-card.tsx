import { Link } from "@/i18n/navigation";
import { TProductCard } from "@/lib/types/product";
import { TProduct, TRecommendation } from "@/lib/types/search";
import { Star } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

// Highlight all case-insensitive matches of searchTerm inside text
const highlightMatches = (text: string, searchTerm?: string) => {
  if (!searchTerm) return text;

  const trimmed = searchTerm.trim();
  if (!trimmed) return text;

  const lowerSearch = trimmed.toLowerCase();

  // Escape regex special chars in the search term
  const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(`(${escapeRegExp(lowerSearch)})`, "ig");
  const parts = text.split(regex);

  // If there's no actual match, just return the original text
  if (parts.length === 1) return text;

  return parts.map((part, index) =>
    part.toLowerCase() === lowerSearch ? (
      <span key={index} className="text-maroon-600">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

type TCardProps = {
  product: TProduct | TRecommendation | TProductCard;
  setOpen: Dispatch<SetStateAction<boolean>>;
  searchTerm?: string;
};

export default function SearchCard({ product, setOpen, searchTerm }: TCardProps) {
  // Translations
  const t = useTranslations("search-input");
  const format = useFormatter();

  // Search Card UI
  return (
    <Link
      href={`/products/${product.id}`}
      onClick={() => {
        setOpen(false);
      }}
      className="gap-4 grid grid-cols-11 hover:bg-zinc-50 p-2 border-zinc-100 border-b"
    >
      <Image
        src={product.cover}
        alt="product image"
        width={80}
        height={80}
        className="col-span-1 rounded-sm h-20 object-cover"
      />

      <div className="col-span-7">
        <h2 className="font-semibold text-zinc-800 text-sm">
          {highlightMatches(product.title, searchTerm)}
        </h2>
        <p className="font-bold text-zinc-800 text-xl">
          {format.number(+product.price, { style: "decimal" })}{" "}
          <span className="font-medium text-zinc-800 text-xs">{t("currency")}</span>
        </p>
      </div>

      <p className="flex justify-end items-center self-start gap-1 col-span-3">
        <Star stroke="#FFA508" fill="#FFA508" />{" "}
        <span className="text-black text-sm">
          {t("general-rate")}:{" "}
          <span className="font-medium text-black text-base">
            {format.number(product.rating, "numbers-only")}/{format.number(5, "numbers-only")}
          </span>
        </span>
        <span className="font-medium text-blue-600 text-sm">
          ({format.number(product.ratings, "numbers-only")} {t("rate-count")})
        </span>
      </p>
    </Link>
  );
}
