import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { TDashboardProduct } from "@/lib/types/dashboard";
import { EllipsisVertical, Pencil } from "lucide-react";
import { DeleteDashboardProductButton } from "./dashboard-product-delete-button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/tailwind-merge";
import { useFormatter, useLocale, useTranslations } from "next-intl";

type DashboardProductItemProps = {
  product: TDashboardProduct;
};
export default function DashboardProductItem({ product }: DashboardProductItemProps) {
  const { id, title, price, stock, rating, ratings } = product;
  // Translations
  const t = useTranslations("dashboard.products.button");

  // Hooks
  const locale = useLocale();
  const format = useFormatter();

  return (
    <tr key={id} className="hover:bg-maroon-50/70 border-black/10 border-b font-inter">
      <td className="ps-5 h-14 first:font-semibold">{title}</td>
      <td className={cn(locale === "ar" && "font-tajawal")}>
        {format.number(+price, {
          style: "currency",
          currency: "EGP",
          maximumFractionDigits: 0,
        })}
      </td>
      <td>{stock}</td>
      {/* <td>{sold}</td> */}
      <td>{`${rating}/5 (${ratings})`}</td>
      <td className={cn(locale === "ar" && "font-tajawal", "text-center")}>
        {/* Edit & Delete Buttons  On Mobile Screen  */}
        <ButtonGroup className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="More Options"
                className="hover:bg-zinc-50 border-zinc-300"
              >
                <EllipsisVertical className="text-zinc-400" size={18} strokeWidth={1} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuItem className={cn(locale === "ar" && "font-tajawal")}>
                  <Button
                    asChild
                    variant={"secondary"}
                    className="bg-[#0063D01A]/10 hover:bg-[#0063D01A]/20 w-full text-blue-600"
                  >
                    <Link href={`/dashboard/products/edit/${id}`}>
                      <Pencil />
                      {t("edit")}
                    </Link>
                  </Button>
                </DropdownMenuItem>

                <DropdownMenuTrigger asChild>
                  <DeleteDashboardProductButton productId={id} />
                </DropdownMenuTrigger>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>

        {/* Edit & Delete Buttons On Large Screens  */}
        <div className="hidden md:inline-flex gap-2">
          <Button
            asChild
            variant={"secondary"}
            className="bg-[#0063D01A]/10 hover:bg-[#0063D01A]/20 w-fit text-blue-600"
          >
            <Link href={`/dashboard/products/edit/${id}`}>
              <Pencil />
              {t("edit")}
            </Link>
          </Button>
          <DeleteDashboardProductButton productId={id} />
        </div>
      </td>
    </tr>
  );
}
