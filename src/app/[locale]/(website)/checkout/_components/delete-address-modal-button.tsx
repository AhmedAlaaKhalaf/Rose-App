"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils/tailwind-merge";
import { Trash, Trash2, X } from "lucide-react";
import { useState } from "react";
import useDeleteUserAddress from "../_hooks/use-delete-address";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

export function DeleteAddressModalButton({ addressId }: { addressId: string }) {
  // Translation
  const t = useTranslations("user-address.modal.confirmation");

  // States
  const [modalState, setModalState] = useState(false);

  // Hooks
  const { isPending, mutateAsync: deleteUserAddress } = useDeleteUserAddress(addressId);

  // Functions
  const deleteHandler = async () => {
    try {
      await deleteUserAddress();

      setModalState(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={modalState} onOpenChange={setModalState}>
      <form>
        <DialogTrigger asChild>
          <Button variant={"destructive"} className="rounded-full size-9">
            <Trash2 className="size-4" strokeWidth={1.46} />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-fit" aria-describedby="">
          <section className="rounded-3xl flex flex-col gap-6">
            {/* Header */}
            <DialogClose asChild>
              <X className="text-[#2E2E30]/50 size-6 self-end" strokeWidth={1.5} />
            </DialogClose>

            {/* Content */}
            <div className="space-y-20">
              {/* Header */}
              <header className="flex flex-col gap-6 items-center">
                {/* Icon */}
                <span
                  className={cn(
                    "relative inline-flex items-center justify-center size-24 rounded-full bg-[#2E2E300D]/5",
                    // Ellipse 23
                    // "before:absolute before:top-1/2 before:left-1/2",
                    // "before:-translate-x-1/2 before:-translate-y-1/2",
                    // "before:size-24 before:rounded-full before:bg-[#2E2E300D]/5",
                    //Ellipse 24
                    "after:absolute after:top-1/2 after:left-1/2",
                    "after:-translate-x-1/2 after:-translate-y-1/2",
                    "after:size-16 after:rounded-full after:bg-[#2E2E3026]/15 after:z-10"
                  )}
                >
                  <Trash className="relative z-20 text-[#2E2E30] size-7" strokeWidth={2} />
                </span>
                <DialogTitle className="text-[#2E2E30] font-semibold text-xl">
                  {t("message")}
                </DialogTitle>
              </header>
              {/* Actions */}
              <footer className="space-x-2 flex">
                {/* Cancel */}
                <DialogClose asChild>
                  <Button variant={"subtle"} className="w-full">
                    {t("button.cancel")}
                  </Button>
                </DialogClose>

                {/* Confirm */}
                <Button
                  variant={"destructive"}
                  className="w-full"
                  onClick={deleteHandler}
                  disabled={isPending}
                >
                  {t("button.confirm")}
                  {isPending && <Spinner />}
                </Button>
              </footer>
            </div>
          </section>
        </DialogContent>
      </form>
    </Dialog>
  );
}
