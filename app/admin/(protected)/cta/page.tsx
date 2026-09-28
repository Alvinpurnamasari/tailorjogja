import { createClient } from "@/utils/supabase/server";
import CtaManager from "@/components/admin/CtaManager";

export const dynamic = "force-dynamic";

export default async function AdminCtaPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cta_section")
    .select(
      `
        id,
        badge,
        title,
        title_highlight,
        description,
        button_text,
        background_url
      `
    )
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    return (
      <p className="text-red-600">
        Gagal mengambil data CTA: {error.message}
      </p>
    );
  }

  return (
    <div className="px-6 py-10 lg:px-11">
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c98b28]">
          Konten Website
        </p>

        <h1 className="mt-2 font-serif text-[38px] text-[#11100d]">
          CTA
        </h1>

        <p className="mt-2 text-[#756554]">
          Kelola bagian Call to Action pada landing page
          TailorJogja.
        </p>
      </div>

      <CtaManager initialData={data} />
    </div>
  );
}