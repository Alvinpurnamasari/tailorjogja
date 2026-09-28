import { createClient } from "@/utils/supabase/server";
import HowToOrderManager from "@/components/admin/HowToOrderManager";

export const dynamic = "force-dynamic";

export default async function HowToOrderAdminPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("order_steps")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <div className="text-red-600">
        Gagal mengambil data: {error.message}
      </div>
    );
  }

  return <HowToOrderManager initialData={data ?? []} />;
}