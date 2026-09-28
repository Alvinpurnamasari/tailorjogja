import { MessageCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function FloatingWhatsApp() {
  const supabase = await createClient();

  const { data: settings, error } = await supabase
    .from("site_settings")
    .select("whatsapp_number")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error(
      "Gagal mengambil nomor WhatsApp Floating Button:",
      error.message
    );
  }

  const whatsappNumber =
    settings?.whatsapp_number || "6285701111308";

  const message =
    "Halo TailorJogja.com, saya ingin konsultasi mengenai pembuatan pakaian custom.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi melalui WhatsApp"
      title="Konsultasi via WhatsApp"
      className="
        group
        fixed bottom-6 right-6 z-[60]
        flex h-[58px] w-[58px]
        items-center justify-center
        rounded-full
        bg-[#d6a247]
        text-[#0c0b09]
        shadow-[0_10px_35px_rgba(0,0,0,0.25)]
        transition-all duration-300
        hover:-translate-y-1
        hover:scale-105
        hover:bg-[#e5b45e]
        md:bottom-8 md:right-8
        md:h-[64px] md:w-[64px]
      "
    >
      {/* PULSE */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#d6a247] opacity-20" />

      <MessageCircle
        size={27}
        strokeWidth={1.7}
        className="transition-transform duration-300 group-hover:scale-110"
      />

      {/* TOOLTIP DESKTOP */}
      <span
        className="
          pointer-events-none
          absolute right-[76px]
          hidden whitespace-nowrap
          bg-[#0c0b09]
          px-4 py-3
          text-[11px] font-semibold
          tracking-[0.08em]
          text-white
          opacity-0
          shadow-lg
          transition-all duration-300
          group-hover:-translate-x-1
          group-hover:opacity-100
          md:block
        "
      >
        KONSULTASI VIA WHATSAPP
      </span>
    </a>
  );
}