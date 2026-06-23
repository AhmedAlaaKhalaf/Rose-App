import Image from "next/image";
import layoutSeparator from "../../../../../public/assets/images/auth-layout-separator.png";
import { cn } from "@/lib/utils/tailwind-merge";

type AuthLayoutSeparatorProps = {
  flip?: boolean;
};

export default function AuthLayoutSeparator({ flip }: AuthLayoutSeparatorProps) {
  return (
    <Image
      src={layoutSeparator}
      alt="Auth layout separator"
      className={cn("mx-auto", flip && "rotate-180")}
    />
  );
}
