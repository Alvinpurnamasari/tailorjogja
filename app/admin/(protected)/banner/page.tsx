import { createClient } from "@/utils/supabase/server";
import BannerManager from "@/components/admin/BannerManager";

export default async function BannerPage() {
  const supabase = await createClient();

  const { data: hero, error } = await supabase
    .from("hero_section")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Banner / Hero</h1>
        <p className="mt-4 text-red-600">
          Gagal mengambil data: {error.message}
        </p>
      </div>
    );
  }

  if (!hero) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Banner / Hero</h1>
        <p className="mt-4">Data hero belum tersedia.</p>
      </div>
    );
  }

  return <BannerManager hero={hero} />;
}