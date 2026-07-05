import Image from "next/image";
import { cn } from "@/lib/utils/tailwind-merge";

type LogoSpinnerProps = {
  className?: string;
  size?: number;
};

export default function LogoSpinner({ className, size = 80 }: LogoSpinnerProps) {
  return (
    <div
      className={cn("flex justify-center items-center", className)}
      role="status"
      aria-label="Loading"
    >
      <Image
        src="/assets/logo.png"
        alt=""
        width={size}
        height={size}
        className="animate-logo-pulse"
        priority
      />
    </div>
  );
}
