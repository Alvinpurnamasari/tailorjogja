import { createClient } from "@/utils/supabase/server";
import FaqManager from "@/components/admin/FaqManager";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const supabase = await createClient();

  const { data: faqs, error } = await supabase
    .from("faqs")
    .select("id, question, answer, sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <p className="text-red-600">
        Gagal mengambil data: {error.message}
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
          FAQ
        </h1>

        <p className="mt-2 text-[#756554]">
          Kelola pertanyaan dan jawaban yang tampil di website
          TailorJogja.
        </p>
      </div>

      <FaqManager initialFaqs={faqs ?? []} />
    </div>
  );
}