import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/tailwind-merge";

const badgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 rounded-full font-medium text-xs uppercase leading-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-maroon-600 hover:bg-maroon-700 text-white dark:bg-softPink-300 dark:hover:bg-softPink-400 dark:text-zinc-800",
        secondary:
          "bg-maroon-50 hover:bg-maroon-100 text-maroon-600 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-softPink-300",
        subtle:
          "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-50",
        outline:
          "border border-zinc-300 bg-transparent text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
