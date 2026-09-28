import { createClient } from "@/utils/supabase/server";
import SettingsManager from "@/components/admin/SettingsManager";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: settings, error } = await supabase
    .from("site_settings")
    .select(
      `
      id,
      whatsapp_number,
      phone_number,
      instagram_url,
      facebook_url,
      tiktok_url,
      email,
      address
      `
    )
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    return (
      <div className="p-8 text-red-600">
        Gagal mengambil pengaturan: {error.message}
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-8 text-red-600">
        Data pengaturan website belum tersedia.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      {/* HEADER */}
      <div className="mb-8">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c98b28]">
          Pengaturan
        </p>

        <h1 className="font-serif text-[38px] text-[#17130f]">
          Pengaturan Website
        </h1>

        <p className="mt-2 text-[15px] text-[#756554]">
          Kelola informasi kontak dan media sosial TailorJogja.
        </p>
      </div>

      <SettingsManager settings={settings} />
    </div>
  );
}