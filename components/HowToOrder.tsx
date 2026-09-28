import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

type OrderStep = {
  id: number;
  title: string;
  description: string | null;
  sort_order: number;
};

export default async function HowToOrder() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("order_steps")
    .select("id, title, description, sort_order")
    .order("sort_order", { ascending: true });

  const steps: OrderStep[] = data ?? [];

  if (error) {
    console.error("Gagal mengambil data Cara Pesan:", error.message);
  }

  return (
    <section
      id="cara-pesan"
      className="scroll-mt-[90px] bg-[#f8f5ef] text-[#100e0b]"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 lg:px-16 lg:py-24">

        {/* HEADER */}
        <div className="text-center">
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-[#c98b28]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c98b28]">
              Simple Process
            </span>
          </div>

          <h2 className="mx-auto max-w-[720px] font-serif text-[52px] leading-[1.08] sm:text-[60px] lg:text-[68px]">
            Bagaimana
            <br />
            Cara Membuat
            <br />
            <span className="italic font-normal text-[#d6a247]">
              Pakaian Custom?
            </span>
          </h2>
        </div>

        {/* STEPS */}
        <div className="relative mt-20 lg:mt-24">

          {/* AREA YANG BISA DIGESER */}
          <div className="order-steps-scroll overflow-x-auto scroll-smooth pb-4">

            {/* SEMUA STEP TETAP SATU BARIS */}
            <div className="relative flex min-w-full">

              {/* GARIS HORIZONTAL */}
              {steps.length > 1 && (
                <div className="absolute left-0 right-0 top-[30px] hidden h-px bg-[#d8cfc0] lg:block" />
              )}

              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="relative w-[280px] shrink-0 px-4 text-center md:w-[300px] lg:w-[20%] lg:min-w-[20%] lg:px-5"
                >
                  {/* NUMBER */}
                  <div className="relative z-10 mx-auto flex h-[60px] w-[60px] items-center justify-center border border-[#d6a247] bg-[#f8f5ef] font-serif text-[14px] text-[#c98b28]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-7 font-serif text-[20px] leading-snug text-[#100e0b] lg:text-[21px]">
                    {step.title}
                  </h3>

                  {/* DESCRIPTION */}
                  {step.description && (
                    <p className="mx-auto mt-4 max-w-[250px] text-[14px] leading-6 text-[#756554]">
                      {step.description}
                    </p>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* JIKA BELUM ADA DATA */}
          {steps.length === 0 && (
            <p className="mt-10 text-center text-[14px] text-[#756554]">
              Belum ada langkah pemesanan.
            </p>
          )}

        </div>
      </div>
    </section>
  );
}