import { createClient } from "@/utils/supabase/server";
import FaqAccordion from "./FaqAccordion";

export const dynamic = "force-dynamic";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
};

export default async function Faq() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("faqs")
    .select("id, question, answer, sort_order")
    .order("sort_order", { ascending: true });

  const faqs: FaqItem[] = data ?? [];

  if (error) {
    console.error("Gagal mengambil FAQ:", error.message);
  }

  return (
    <section
      id="faq"
      className="scroll-mt-[90px] bg-[#f7f2e9] text-[#0c0b09]"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[420px_1fr] lg:gap-24">

          {/* LEFT */}
          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-8 bg-[#d6a247]" />

              <span className="text-[12px] font-semibold uppercase tracking-[0.32em] text-[#c98b28]">
                FAQ
              </span>
            </div>

            <h2 className="font-serif text-[52px] leading-[0.98] sm:text-[60px] lg:text-[68px]">
              Pertanyaan
              <br />
              yang Sering
              <br />

              <span className="italic font-normal text-[#d6a247]">
                Diajukan
              </span>
            </h2>

            <p className="mt-8 max-w-[340px] text-[16px] leading-8 text-[#756554]">
              Temukan jawaban singkat sebelum memulai konsultasi pakaian Anda.
            </p>
          </div>

          {/* RIGHT */}
          <FaqAccordion faqs={faqs} />

        </div>
      </div>
    </section>
  );
}