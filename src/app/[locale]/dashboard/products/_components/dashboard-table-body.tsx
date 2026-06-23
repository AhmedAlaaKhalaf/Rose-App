import { getDashboardProducts } from "@/lib/services/product.service";
import { SearchParams } from "@/lib/types/global";
import DashboardProductItem from "./dashboard-product-item";

type DashboardTableBodyProps = {
  searchParams: SearchParams;
};

export default async function DashboardTableBody({ searchParams }: DashboardTableBodyProps) {
  // Services
  const { payload } = await getDashboardProducts(searchParams);

  return (
    <tbody className="font-normal text-sm">
      {payload?.data.map((product, key) => (
        <DashboardProductItem key={key} product={product} />
      ))}
    </tbody>
  );
}
