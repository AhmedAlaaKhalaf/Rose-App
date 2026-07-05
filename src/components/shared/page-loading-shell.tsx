import LogoSpinner from "@/components/shared/logo-spinner";
import { cn } from "@/lib/utils/tailwind-merge";

type PageLoadingShellProps = {
  className?: string;
  spinnerSize?: number;
};

export default function PageLoadingShell({
  className,
  spinnerSize = 96,
}: PageLoadingShellProps) {
  return <LogoSpinner fullScreen size={spinnerSize} className={cn(className)} />;
}
