import { createClient } from "@/utils/supabase/server";
import ServicesManager from "@/components/admin/ServicesManager";

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <div className="p-8 text-red-600">
        Gagal mengambil data: {error.message}
      </div>
    );
  }

  return <ServicesManager initialServices={services || []} />;
}