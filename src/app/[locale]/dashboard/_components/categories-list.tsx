import { getCategoryStatistics } from "@/lib/services/category.service";
import CategoryItem from "./category-item";

export default async function CategoriesList() {
  // Service
  const categories = await getCategoryStatistics();

  return (
    <div className="flex flex-col gap-2 max-h-56 overflow-y-auto no-scrollbar">
      {/* Category */}
      {categories.statistics.map((category) => (
        <CategoryItem key={category._id} category={category} />
      ))}
    </div>
  );
}
