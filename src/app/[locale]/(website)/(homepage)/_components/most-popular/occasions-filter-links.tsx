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
    <ul className="flex gap-6">
      {occasions.map(({ title, id }) => {
        const isActive = selectedOccasionId === id;

        return (
          <li
            key={id}
            className={cn(
              "font-medium capitalize transition-colors cursor-pointer",
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
