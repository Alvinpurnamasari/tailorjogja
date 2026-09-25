import { createClient } from "@/utils/supabase/server";
import AdvantagesManager from "@/components/admin/AdvantagesManager";

export const dynamic = "force-dynamic";

export default async function AdminAdvantagesPage() {
  const supabase = await createClient();

  const { data: advantages, error } = await supabase
    .from("advantages")
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
    <AdvantagesManager initialData={advantages || []} />
  );
}