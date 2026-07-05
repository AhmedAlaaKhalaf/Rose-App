"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import { EllipsisVertical, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { generateColor } from "../_utils/generate-color";

export default function UserInfo() {
  // Hooks
  const session = useSession();

  // Variables
  const firstInitial = session.data?.user?.firstName?.charAt(0) ?? "";
  const lastInitial = session.data?.user?.lastName?.charAt(0) ?? "";
  const fallback = firstInitial + lastInitial || "CN";

  const color = generateColor(session.data?.user?.email ?? fallback);

  return (
    <>
      {/* Other Screens */}
      <div className="hidden md:flex items-center gap-3 pt-4 border-black/10 border-t w-full">
        {/* User Image */}
        <Avatar className="rounded-full w-12 h-12">
          {session.data?.user.photo && (
            <AvatarImage src={session.data.user.photo} alt={session.data.user.firstName} />
          )}
          <AvatarFallback style={{ backgroundColor: `hsl(${color})` }} className="text-xl">
            {fallback}
          </AvatarFallback>
        </Avatar>

        {/* User Name & Email */}
        <div className="flex-1 grid text-sm text-left leading-tight">
          <span className="font-bold text-zinc-800 text-sm truncate">
            {session.data?.user.firstName} {session.data?.user.lastName}
          </span>
          <span className="font-semibold text-zinc-400 text-xs truncate">
            {session.data?.user.email}
          </span>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-2xl"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem className="font-semibold text-maroon-700 text-sm">
                {session.data?.user.firstName} {session.data?.user.lastName}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-200" />
              <DropdownMenuItem>
                <Link href={"/dashboard/account"} className="flex items-center gap-2">
                  <User size={16} />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-200" />
              <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2">
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* User Image */}
            <Avatar className="rounded-full w-14 h-14">
              {session.data?.user.photo && (
                <AvatarImage src={session.data.user.photo} alt={session.data.user.firstName} />
              )}
              <AvatarFallback style={{ backgroundColor: color }} className="text-xl">
                {fallback}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-2xl"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={"/dashboard/account"} className="flex items-center gap-2">
                  <User size={16} />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-200" />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="flex items-center gap-2 text-red-600"
              >
                <LogOut className="rotate-180" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
