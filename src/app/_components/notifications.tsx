"use client";

import {
  Bell,
  BellOff,
  BrushCleaning,
  Check,
  CheckCheck,
  EllipsisVertical,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import useNotifications from "@/hooks/notifications/use-notifications";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationsSkeleton from "./notifications-skeleton";
import Loading from "../loading";
import useMarkNotificationRead from "@/hooks/notifications/use-mark-notification-read";
import { useTranslations } from "next-intl";
// import useDeleteNotification from "@/hooks/notifications/use-delete-notification";

export default function Notifications() {
  // state
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

 // Translation
  const t = useTranslations("notifications");
  
  // hooks
  const {
    data: notificationsList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useNotifications();

  const { markRead } = useMarkNotificationRead();

  // todo delete notification
  // const { deleteOneNotification } = useDeleteNotification();

  //   ref
  const refNotifications = useRef<HTMLDivElement>(null);
  const refBell = useRef<SVGSVGElement>(null);

  // flat notifications
  const flatNotifications = notificationsList?.pages.flatMap((page) => page.notifications) ?? [];

  //   handle click outside to close the notifications panel
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        refNotifications.current &&
        !refNotifications.current.contains(event.target as Node) &&
        refBell.current &&
        !refBell.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("[data-dropdown-menu]")
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // todo : colors will change after design system finish
    // todo : make localization
    <>
      <Bell
        ref={refBell}
        className={`cursor-pointer transition-all duration-300 ${isOpen ? "fill-[#741C21] dark:fill-[#FFC2D0]" : ""}`}
        size={24}
        onClick={() => setIsOpen(!isOpen)}
      />

      <div
        ref={refNotifications}
        className={`fixed right-0 top-16 w-full md:w-[21rem] md:right-1 dark:bg-zinc-900 z-50 rounded-2xl overflow-hidden
        ${isOpen ? "visible" : "hidden"}`}
      >
        {/* Header */}
        <div className="text-xl p-4 bg-[#741C21] text-white dark:bg-[#FFC2D0] dark:text-zinc-800 font-bold">
          <h3>
            {t("title")}
            {notificationsList &&
              notificationsList?.pages[0]?.metadata?.unreadCount > 0 &&
              `(${notificationsList?.pages[0]?.metadata?.unreadCount})`}
          </h3>
        </div>

        {/* Actions */}
        <div
          className={`flex items-center justify-between p-2 text-xs font-semibold ${flatNotifications.length === 0 ? "dark:bg-zinc-700 pointer-events-none" : ""}`}
        >
          <div className="flex items-center gap-1 cursor-pointer">
            <BrushCleaning size={18} className="text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-800 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-400 transition-all duration-300">
              {t("clear-all-notifications")}
            </span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <CheckCheck size={15} className="text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-800 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-400 transition-all duration-300">
              {t("mark-all-as-read")}
            </span>
          </div>
        </div>

        {/* List container */}
        <div
          className={`h-[calc(100vh-10rem)] flex flex-col ${flatNotifications.length === 0 && !isLoading ? "dark:bg-zinc-700 pointer-events-none h-auto" : ""}`}
        >
          <ul
            id="notifications-scroll"
            onScroll={() => setOpenDropdownId(null)}
            className="flex-1 overflow-y-auto hide-scroll"
          >
            {flatNotifications.length === 0 && !isLoading ? (
              <div className="p-4 border-t border-zinc-300 dark:border-zinc-600 h-56 flex flex-col items-center justify-center dark:bg-zinc-700">
                <BellOff size={50} className="text-zinc-500 dark:text-zinc-400" />
                <p className="p-4 text-zinc-500 dark:text-zinc-400 font-medium text-sm">
                  {t("no-notifications")}
                </p>
              </div>
            ) : isLoading ? (
              // skeleton loading
              <NotificationsSkeleton />
            ) : (
              // actual notifications
              <>
                <InfiniteScroll
                  dataLength={flatNotifications.length}
                  next={fetchNextPage}
                  hasMore={!!hasNextPage}
                  scrollableTarget="notifications-scroll"
                  loader={null}
                >
                  {flatNotifications &&
                    flatNotifications.map((notification) => (
                      <li
                        key={notification?._id}
                        className={`p-4 border-t border-zinc-300 dark:border-zinc-600 font-semibold ${
                          notification?.isRead ? "bg-transparent" : "bg-zinc-200 dark:bg-zinc-800"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-zinc-800 dark:text-zinc-50">{notification?.title}</p>

                          <DropdownMenu
                            modal={false}
                            onOpenChange={(open) =>
                              setOpenDropdownId(open ? notification?._id : null)
                            }
                            open={openDropdownId === notification?._id}
                          >
                            <DropdownMenuTrigger asChild>
                              <button aria-label="Open menu" className="focus-visible:outline-none">
                                <EllipsisVertical
                                  size={20}
                                  className="cursor-pointer text-zinc-500"
                                />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuPortal container={refNotifications.current}>
                              <DropdownMenuContent
                                data-dropdown-menu
                                className="w-52 p-3 shadow-[0px_4px_9px_0px_rgba(0,0,0,0.15)] dark:bg-zinc-700 dark:shadow-[0px_4px_9px_0px_rgba(0,0,0,0.25)]"
                                align="end"
                              >
                                <DropdownMenuGroup>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markRead([notification?._id]);
                                      setOpenDropdownId(null);
                                    }}
                                    className={`flex items-center gap-1 cursor-pointer text-zinc-800 dark:text-zinc-50 ${notification?.isRead ? "pointer-events-none text-zinc-400 dark:text-zinc-500" : ""}`}
                                  >
                                    <Check size={18} />
                                    <span>{t("mark-as-read")}</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // todo delete notification
                                      // deleteOneNotification(notification?._id);
                                      setOpenDropdownId(null);
                                    }}
                                    className="flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 size={18} className="text-red-500" />
                                    <span>{t("delete-notification")}</span>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenuPortal>
                          </DropdownMenu>
                        </div>

                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                          {notification?.body}
                        </p>
                      </li>
                    ))}
                </InfiniteScroll>
                {/* loader */}
                <div>{isFetching && hasNextPage && <Loading />}</div>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
