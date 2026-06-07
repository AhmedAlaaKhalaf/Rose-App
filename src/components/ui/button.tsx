import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/tailwind-merge";

const buttonVariants = cva(
  "inline-flex justify-center items-center gap-2 disabled:opacity-50 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-medium text-sm capitalize whitespace-nowrap transition-colors [&_svg]:pointer-events-none disabled:pointer-events-none i [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-maroon-600 text-white hover:bg-maroon-700 dark:bg-softPink-300 dark:text-zinc-800 dark:hover:bg-softPink-400",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:text-zinc-50 dark:hover:bg-red-600",
        outline:
          "border border-maroon-600 text-maroon-600 bg-background hover:bg-maroon-50 dark:bg-zinc-800 dark:text-softPink-300 dark:border-softPink-300 dark:hover:bg-zinc-700",
        secondary:
          "bg-maroon-50 text-maroon-600 hover:bg-maroon-100 dark:bg-zinc-700 dark:text-softPink-300 dark:hover:bg-zinc-600",
        ghost:
          "text-zinc-800 bg-background hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        pagination:
          "text-zinc-800 bg-background border border-zinc-100 dark:border-zinc-700 hover:bg-zinc-100 dark:text-zinc-50 dark:bg-zinc-700 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        subtle:
          "text-zinc-800 bg-zinc-50 border border-zinc-400 hover:bg-zinc-100 dark:text-zinc-50 dark:bg-zinc-800 dark:border-zinc-500 dark:hover:bg-zinc-700",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-[0.625rem]",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
