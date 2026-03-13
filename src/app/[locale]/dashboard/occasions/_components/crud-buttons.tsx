"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import useDeleteOccasion from "../_Hooks/use-delete-occasion";
import { toast } from "sonner";

export default function CrudButtons({ id }: { id: string }) {
  // Translations
  const t = useTranslations("db-occasions");

  // Hooks
  const { deleteOccasion, error, isPending } = useDeleteOccasion();

  // variables
  const handelClick = () => {
    deleteOccasion(id, {
      onSuccess: () => {
        toast.success(t("delete-toast"));
      },
      onError: () => {
        toast.error(`${error?.message}`);
      },
    });
  };

  return (
    <td className="flex justify-end gap-2 space-x-1 px-6 py-4 text-right whitespace-nowrap">
      <Button
        size="sm"
        className="flex items-center gap-1 bg-[#0063D01A] hover:bg-[#0063D033] shadow-none px-3 py-2 border-none focus:border-none focus:ring-0 text-blue-600"
      >
        <Link href={`/dashboard/occasions/${id}`} className="flex items-center gap-1 text-blue-600">
          <Pencil size={14} />
          <span className="sr-only md:not-sr-only">{t("edit-button")}</span>
        </Link>
      </Button>
      <Button
        onClick={handelClick}
        disabled={isPending}
        size="sm"
        className="flex items-center gap-1 bg-[#FF00001A] hover:bg-[#FF000033] shadow-none px-3 py-2 border-none focus:border-none focus:ring-0 text-red-600"
      >
        <Trash2 size={14} className="text-red-600" />
        <span className="sr-only md:not-sr-only">{t("delete-button")}</span>
      </Button>
    </td>
  );
}
