import Link from "next/link";
import Image from "next/image";
import { Input } from "../../ui/input";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HeaderNavigation from "./header-navigation";
import MobileNavigation from "./mobile-navigation";
import LoginIcon from "./login-icon";
import LanguageSwitcher from "@/components/ui/language-switcher";
import Notifications from "@/app/[locale]/(website)/_components/notifications/notifications";
import UserDropdown from "./user-dropdown";
import CartLink from "./cart-link";
import WishlistLink from "./wishlist-link";
import Search from "../search/search";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/auth";

export default function Header() {
  // const session = getServerSession(authOptions);
  // const isLoggedIn = !!session;
  // const firstName = session?.user?.firstName || "User";
  // All the commented code is waiting for the authentication to be implemented

  return (
    <header>
      <div className="mx-auto lg:px-5 xl:px-9 py-4 font-sarabunMedium">
        <div className="flex justify-between items-center px-2 lg:px-0">
          {/* logo */}
          <Link href="/" className="w-1/4 md:w-auto cursor-pointer">
            <Image sizes="auto" src="/assets/logo.png" alt="Logo" width={85} height={80} />
          </Link>
          {/* delivery location */}
          {/* {isLoggedIn && (
            <div className="hidden sm:flex flex-col gap-2">
              <p className="text-zinc-500 text-sm">Deliver to:</p>
              <div className="flex gap-2">
                <LocationEdit className="w-5 h-5 text-primary" />
                <p className="text-primary">Cairo</p>
              </div>
            </div>
          )} */}

          {/* search bar */}
          <div className="hidden md:block sm:w-2/3">
            {/* <Input
              id="search"
              type="text"
              placeholder="What awesome gift are you looking for?"
              className="w-full"
            /> */}
            {/* <Search /> */}
          </div>

          {/* icons */}
          <div className="flex justify-end items-stretch w-3/4 sm:w-auto">
            {/* login */}
            {/* {isLoggedIn ? (
              <div className="hidden sm:flex flex-col gap-2">
                <p className="text-zinc-500 text-sm">Hello</p>
                <p className="text-primary">{firstName}</p>
              </div>
            ) : (
              <div className="hidden sm:block">
                <LoginIcon />
              </div>
            )} */}

            <div className="hidden sm:block">
              <UserDropdown />
            </div>

            {/* mobile toggle */}
            <MobileNavigation />
            {/* icon group */}
            <div className="flex items-center gap-3 p-2 sm:p-4 border border-zinc-200 dark:border-zinc-700 border-t-0 border-b-0">
              {/* wishlist */}
              <WishlistLink />
              {/* cart */}
              <CartLink />
              {/* notifications */}
              <Link href="#" className="text-zinc-700 dark:text-zinc-50 cursor-pointer">
                <Notifications />
              </Link>
            </div>
            {/* language switcher old for me*/}
            {/* <DropdownMenu>
              <DropdownMenuTrigger className="p-4 text-zinc-700 dark:text-zinc-50 cursor-pointer">
                <Globe className="w-5 sm:w-6 h-5 sm:h-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/">
                  <DropdownMenuItem>English</DropdownMenuItem>
                </Link>
                <Link href="/ar">
                  <DropdownMenuItem className="font-tajawalMedium text-right">
                    العربية
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>  
      {/* header nav */}
      <div className="hidden sm:block bg-primary mx-auto">
        <HeaderNavigation />
      </div>
    </header>
  );
}
