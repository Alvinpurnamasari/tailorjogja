import {
  Ruler,
  Scissors,
  Sparkles,
  UserRoundCheck,
  Shirt,
  MapPin,
  LucideIcon,
} from "lucide-react";

import { createClient } from "@/utils/supabase/server";

type Advantage = {
  id: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
};

const iconMap: Record<string, LucideIcon> = {
  Ruler,
  Scissors,
  Sparkles,
  UserRoundCheck,
  Shirt,
  MapPin,
};

export default async function Advantages() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("advantages")
    .select("id, title, description, icon, sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Gagal mengambil advantages:", error);
  }

  const advantages: Advantage[] = data || [];

  return (
    <section
      id="keunggulan"
      className="scroll-mt-[90px] bg-[#0c0b09] text-[#f7f2e9]"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 lg:px-16 lg:py-24">

        {/* HEADING */}
        <div className="mb-16 text-center">
          <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e0aa4b]">
            Built With Precision
          </p>

          <h2 className="font-serif text-[45px] leading-[1.05] sm:text-[55px] lg:text-[66px]">
            Kenapa Memilih
            <br />

            <span className="italic font-normal text-[#d6a247]">
              TailorJogja.com?
            </span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles;

            return (
              <div
                key={item.id}
                className="group min-h-[245px] border-b border-r border-white/15 p-10 transition-colors duration-300 hover:bg-white/[0.03] lg:p-11"
              >
                {/* ICON */}
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="mb-9 text-[#d6a247]"
                />

                {/* TITLE */}
                <h3 className="mb-5 font-serif text-[25px] leading-tight text-[#f7f2e9]">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="max-w-[380px] text-[15px] leading-7 text-[#b7afa5]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* JIKA DATA KOSONG */}
        {advantages.length === 0 && (
          <div className="py-10 text-center text-[#b7afa5]">
            Belum ada data keunggulan.
          </div>
        )}
      </div>
    </section>
  );
}