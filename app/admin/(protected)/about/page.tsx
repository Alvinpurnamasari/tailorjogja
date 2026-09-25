import { createClient } from "@/utils/supabase/server";
import AboutManager from "@/components/admin/AboutManager";

export default async function AboutAdminPage() {
  const supabase = await createClient();

  const { data: about, error } = await supabase
    .from("about_section")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-serif">Tentang</h1>

        <p className="mt-6 text-red-600">
          Gagal mengambil data: {error.message}
        </p>
      </div>
    );
  }

  return <AboutManager initialData={about} />;
}