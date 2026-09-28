import { createClient } from "@/utils/supabase/server";
import ReadyToWearManager from "@/components/admin/ReadyToWearManager";

export const dynamic = "force-dynamic";

export default async function ReadyToWearPage() {
  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from("ready_to_wear")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    return (
      <div className="p-8 text-red-600">
        Gagal mengambil data: {error.message}
      </div>
    );
  }

  return (
    <ReadyToWearManager initialItems={items || []} />
  );
}