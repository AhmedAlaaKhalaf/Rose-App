import LogoSpinner from "@/components/shared/logo-spinner";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/tailwind-merge";

type PageLoadingShellProps = {
  children?: ReactNode;
  className?: string;
  spinnerSize?: number;
};

export default function PageLoadingShell({
  children,
  className,
  spinnerSize = 88,
}: PageLoadingShellProps) {
  return (
    <div className={cn("space-y-10", className)}>
      <LogoSpinner className="py-8" size={spinnerSize} />
      {children}
    </div>
  );
}
