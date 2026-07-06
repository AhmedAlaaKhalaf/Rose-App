import { Link } from "@/i18n/navigation";
import { TOccasion } from "@/lib/types/occasion";
import { cn } from "@/lib/utils/tailwind-merge";

type OccasionsFilterLinksProps = {
  selectedOccasionId: string;
  occasions: TOccasion[];
};

export default function OccasionsFilterLinks({
  occasions,
  selectedOccasionId,
}: OccasionsFilterLinksProps) {
  return (
    <ul className="flex flex-nowrap lg:flex-wrap gap-4 lg:gap-6 pb-1 lg:pb-0 w-full max-w-full overflow-x-auto lg:overflow-visible hide-scroll">
      {occasions.map(({ title, id }) => {
        const isActive = selectedOccasionId === id;

        return (
          <li
            key={id}
            className={cn(
              "font-medium text-sm lg:text-base capitalize transition-colors cursor-pointer shrink-0",
              isActive
                ? "text-maroon-600 dark:text-softPink-200"
                : "text-zinc-700 dark:text-zinc-400 hover:text-maroon-600"
            )}
          >
            <Link scroll={false} href={`?occasionId=${id}`} className="text-inherit">
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
