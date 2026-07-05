import * as React from "react";
import { cn } from "@/lib/utils/tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva(
  "relative font-sarabun font-bold text-primary dark:text-secondary text-2xl sm:text-3xl lg:text-4xl",
  {
    variants: {
      variant: {
        default: [
          "before:h-4 before:bg-pink-100 before:absolute before:-bottom-0.5 before:-start-0.5 before:rounded-e-full before:-z-10 dark:before:bg-zinc-700",
          "after:h-[0.125rem] after:bg-pink-600 after:absolute after:-bottom-0.5 after:-start-0.5 dark:after:bg-pink-500",
        ],
      },
      size: {
        default:
          "before:w-[min(25.13rem,100%)] lg:before:w-[25.13rem] after:w-[min(9.82rem,40%)] lg:after:w-[9.82rem]",
        sm: "before:w-[min(9.55rem,100%)] lg:before:w-[9.55rem] after:w-[min(3.75rem,40%)] lg:after:w-[3.75rem]",
        md: "before:w-[min(13rem,100%)] lg:before:w-[13rem] after:w-[min(5.19rem,40%)] lg:after:w-[5.19rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const SectionHead = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof headingVariants>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <h2 ref={ref} className={cn(headingVariants({ variant, size, className }))} {...props}></h2>
  );
});
SectionHead.displayName = "SectionHead";

const SectionTitle = React.forwardRef<HTMLHeadingElement, React.ComponentProps<"h1">>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          "font-sarabun font-bold text-secondary dark:text-primary uppercase tracking-[0.2em] lg:tracking-[0.3rem]",
          className
        )}
        {...props}
      ></h1>
    );
  }
);
SectionTitle.displayName = "SectionTitle";

export { SectionHead, SectionTitle };
