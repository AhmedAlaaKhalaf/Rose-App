"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useRouter } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type ProductEditorFormProps = {
  mode: "create" | "edit";
  productId?: string;
};

type Option = { id: string; title: string };

type ProductFormState = {
  title: string;
  description: string;
  price: string;
  stock: string;
  cover: string;
  categoryId: string;
  occasionIds: string[];
};

const EMPTY_FORM: ProductFormState = {
  title: "",
  description: "",
  price: "",
  stock: "",
  cover: "",
  categoryId: "",
  occasionIds: [],
};

function normalizeOptions(raw: unknown): Option[] {
  const payloadData = (raw as { payload?: { data?: Option[] } })?.payload?.data;
  if (!Array.isArray(payloadData)) return [];
  return payloadData;
}

export default function ProductEditorForm({ mode, productId }: ProductEditorFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.accessToken;
  const apiBase = process.env.NEXT_PUBLIC_API;

  const [form, setForm] = useState<ProductFormState>(EMPTY_FORM);
  const [categories, setCategories] = useState<Option[]>([]);
  const [occasions, setOccasions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSaving, setIsSaving] = useState(false);

  const title = useMemo(() => (mode === "create" ? "Add Product" : "Edit Product"), [mode]);

  useEffect(() => {
    if (!token || !apiBase) return;
    const loadOptions = async () => {
      try {
        const [categoriesRes, occasionsRes] = await Promise.all([
          fetch(`${apiBase}/categories?page=1&limit=100`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${apiBase}/occasions?page=1&limit=100`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const categoriesPayload = await categoriesRes.json();
        const occasionsPayload = await occasionsRes.json();

        if (categoriesRes.ok) setCategories(normalizeOptions(categoriesPayload));
        if (occasionsRes.ok) setOccasions(normalizeOptions(occasionsPayload));
      } catch {
        toast.error("Failed to load categories/occasions");
      }
    };

    loadOptions();
  }, [token, apiBase]);

  useEffect(() => {
    if (mode !== "edit" || !productId || !token || !apiBase) return;
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBase}/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(String(payload?.message || "Failed to fetch product"));
        }

        const product = (payload as { payload?: { product?: Record<string, unknown> } })?.payload
          ?.product as Record<string, unknown> | undefined;

        if (!product) throw new Error("Product not found");

        setForm({
          title: String(product.title || ""),
          description: String(product.description || ""),
          price: String(product.price || ""),
          stock: String(product.stock || ""),
          cover: String(product.cover || ""),
          categoryId: String(product.categoryId || ""),
          occasionIds: Array.isArray(product.occasions)
            ? (product.occasions as string[])
            : [],
        });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [mode, productId, token, apiBase]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!token || !apiBase) return;

    setIsSaving(true);
    try {
      const body: Record<string, unknown> = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        cover: form.cover,
        categoryId: form.categoryId,
        occasionIds: form.occasionIds,
      };

      const response = await fetch(
        mode === "create" ? `${apiBase}/products` : `${apiBase}/products/${productId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(String(payload?.message || `Failed to ${mode} product`));
      }

      toast.success(mode === "create" ? "Product created" : "Product updated");
      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="bg-white p-6 rounded-2xl text-zinc-500">Loading product...</div>;
  }

  return (
    <section className="bg-white p-6 rounded-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl text-zinc-900">{title}</h1>
        <Button variant="secondary" asChild>
          <Link href="/dashboard/products">Back</Link>
        </Button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Title"
            required
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />
          <Input
            placeholder="Cover image URL"
            value={form.cover}
            onChange={(e) => setForm((prev) => ({ ...prev, cover: e.target.value }))}
          />
          <Input
            type="number"
            placeholder="Price"
            required
            value={form.price}
            onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
          />
          <Input
            type="number"
            placeholder="Stock"
            required
            value={form.stock}
            onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
          />
        </div>

        <Textarea
          placeholder="Description"
          required
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="h-12 border border-zinc-300 rounded-lg px-3 bg-transparent"
            required
            value={form.categoryId}
            onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>

          <select
            multiple
            className="min-h-[120px] border border-zinc-300 rounded-lg px-3 py-2 bg-transparent"
            value={form.occasionIds}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (option) => option.value);
              setForm((prev) => ({ ...prev, occasionIds: values }));
            }}
          >
            {occasions.map((occasion) => (
              <option key={occasion.id} value={occasion.id}>
                {occasion.title}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : mode === "create" ? "Create Product" : "Update Product"}
        </Button>
      </form>
    </section>
  );
}
