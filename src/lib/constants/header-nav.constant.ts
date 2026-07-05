import { Gift, Headset, House, Info, LucideIcon, PartyPopper } from "lucide-react";

type HeaderNav = {
  labelKey: string;
  href: string;
  icon?: LucideIcon;
};

export const HEADER_NAV: HeaderNav[] = [
  {
    labelKey: "home",
    href: "/",
    icon: House,
  },
  {
    labelKey: "products",
    href: "/products",
    icon: Gift,
  },
  {
    labelKey: "occasions",
    href: "/occasions",
    icon: PartyPopper,
  },
  {
    labelKey: "contact",
    href: "/contact",
    icon: Headset,
  },
  {
    labelKey: "about",
    href: "/about",
    icon: Info,
  },
];

export const fields = "imgCover,title,rateAvg,rateCount,price";
