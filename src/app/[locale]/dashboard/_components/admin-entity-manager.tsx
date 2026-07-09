"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type AdminEntityManagerProps = {
  title: string;
  endpoint: "categories" | "occasions";
};

type Entity = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  immutable?: boolean;
};

type EntityFormState = {
  title: string;
  description: string;
  image: string;
};

const EMPTY_FORM: EntityFormState = { title: "", description: "", image: "" };

function normalizeEntities(raw: unknown): Entity[] {
  const source =
    // payload.data
    (raw as { payload?: { data?: Entity[] } })?.payload?.data ||
    // payload
    (raw as { payload?: Entity[] })?.payload ||
    // data
    (raw as { data?: Entity[] })?.data ||
    [];

  if (!Array.isArray(source)) return [];
  return source;
}

export default function AdminEntityManager({ title, endpoint }: AdminEntityManagerProps) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [items, setItems] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [createForm, setCreateForm] = useState<EntityFormState>(EMPTY_FORM);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EntityFormState>(EMPTY_FORM);

  const apiBase = process.env.NEXT_PUBLIC_API;

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => (a.title || "").localeCompare(b.title || "")),
    [items]
  );

  async function loadEntities() {
    if (!token || !apiBase) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBase}/${endpoint}?page=1&limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(String(payload?.message || `Failed to fetch ${endpoint}`));
      }
      setItems(normalizeEntities(payload));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Failed to fetch ${endpoint}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadEntities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, endpoint, apiBase]);

  const onCreate = async (event: FormEvent) => {
    event.preventDefault();
    if (!token || !apiBase) return;
    setIsSaving(true);
    try {
      const response = await fetch(`${apiBase}/${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createForm),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(String(payload?.message || `Failed to create ${endpoint.slice(0, -1)}`));
      }
      setCreateForm(EMPTY_FORM);
      await loadEntities();
      toast.success(`${title} created`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed");
    } finally {
      setIsSaving(false);
    }
  };

  const onSaveEdit = async (id: string) => {
    if (!token || !apiBase) return;
    setIsSaving(true);
    try {
      const response = await fetch(`${apiBase}/${endpoint}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(String(payload?.message || `Failed to update ${endpoint.slice(0, -1)}`));
      }
      setEditId(null);
      setEditForm(EMPTY_FORM);
      await loadEntities();
      toast.success(`${title} updated`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed");
    } finally {
      setIsSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!token || !apiBase) return;
    setIsSaving(true);
    try {
      const response = await fetch(`${apiBase}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(String(payload?.message || `Failed to delete ${endpoint.slice(0, -1)}`));
      }
      await loadEntities();
      toast.success(`${title} deleted`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="space-y-6 bg-white p-6 rounded-2xl">
      <h1 className="font-semibold text-2xl text-zinc-900">{title}</h1>

      <form onSubmit={onCreate} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input
          placeholder="Title"
          value={createForm.title}
          onChange={(e) => setCreateForm((prev) => ({ ...prev, title: e.target.value }))}
          required
        />
        <Input
          placeholder="Image URL"
          value={createForm.image}
          onChange={(e) => setCreateForm((prev) => ({ ...prev, image: e.target.value }))}
        />
        <Button type="submit" disabled={isSaving}>
          Add
        </Button>
        <Textarea
          className="md:col-span-3 min-h-[100px]"
          placeholder="Description"
          value={createForm.description}
          onChange={(e) => setCreateForm((prev) => ({ ...prev, description: e.target.value }))}
        />
      </form>

      <div className="space-y-3">
        {isLoading && <p className="text-sm text-zinc-500">Loading...</p>}
        {!isLoading && sortedItems.length === 0 && (
          <p className="text-sm text-zinc-500">No {endpoint} found.</p>
        )}
        {sortedItems.map((item) => {
          const isEditing = editId === item.id;
          return (
            <div key={item.id} className="border rounded-lg p-3 space-y-3">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                  />
                  <Input
                    value={editForm.image}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, image: e.target.value }))}
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => onSaveEdit(item.id)} disabled={isSaving}>
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setEditId(null);
                        setEditForm(EMPTY_FORM);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                  <Textarea
                    className="md:col-span-3 min-h-[100px]"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                  />
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-semibold text-zinc-900">{item.title}</p>
                    {item.description && <p className="text-sm text-zinc-600">{item.description}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setEditId(item.id);
                        setEditForm({
                          title: item.title || "",
                          description: item.description || "",
                          image: item.image || "",
                        });
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => onDelete(item.id)}
                      disabled={isSaving || Boolean(item.immutable)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
