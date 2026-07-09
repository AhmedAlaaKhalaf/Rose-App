import ProductEditorForm from "../../_components/product-editor-form";

type EditDashboardProductPageProps = {
  params: { id: string };
};

export default function EditDashboardProductPage({ params }: EditDashboardProductPageProps) {
  return <ProductEditorForm mode="edit" productId={params.id} />;
}
