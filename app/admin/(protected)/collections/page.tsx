import { createClient } from "@/utils/supabase/server";
import CollectionsManager from "@/components/admin/CollectionsManager";

export const dynamic = "force-dynamic";

export default async function AdminCollectionsPage() {
  const supabase = await createClient();

  const { data: collections, error } = await supabase
    .from("collections")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <p className="text-red-600">
        Gagal mengambil data: {error.message}
      </p>
    );
  }

  return (
    <CollectionsManager initialData={collections || []} />
  );
}