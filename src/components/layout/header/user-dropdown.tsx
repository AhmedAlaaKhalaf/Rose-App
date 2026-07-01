"use client";

import { User, MapPin, ScrollText, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LoginPopover from "./login-popover";

export default function UserDropdown() {
  // Translation
  const t = useTranslations("header");

  const { data: session } = useSession();

  // If user is not logged in, show login popover
  if (!session?.user) {
    return <LoginPopover />;
  }

  // If user is logged in, show user menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-50 p-4 focus-visible:outline-none">
          <User className="w-5 h-5" />
          <span className="hidden sm:inline">{t("login")}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[224px] bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg rounded-lg p-[5px]"
      >
        {/* User name header - 214×32px */}
        <div className="h-8 px-2 flex items-center">
          <p className="text-maroon-600 dark:text-maroon-400 font-semibold text-base">
            {session.user.firstName} {session.user.lastName}
          </p>
        </div>

        {/* Solid divider line */}
        <div className="h-px bg-zinc-200 dark:bg-zinc-700" />

        {/* Profile, Addresses, Orders */}

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer h-8 rounded-sm">
            <Link href="/profile" className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{t("myProfile")}</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer h-8 rounded-sm">
            <Link href="/addresses" className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{t("myAddresses")}</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer h-8 rounded-sm">
            <Link href="/orders" className="flex items-center gap-2">
              <ScrollText className="w-5 h-5" />
              <span>{t("myOrders")}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* Solid separator */}
        <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-700" />

        {/* Dashboard and Logout */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer h-8 rounded-sm">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              <span>{t("dashboard")}</span>
            </Link>
          </DropdownMenuItem>

          {/* Solid separator */}
          <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-700" />

          <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer h-8 rounded-sm">
            <div className="flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              <span>{t("logout")}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
