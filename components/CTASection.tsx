import { MessageCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function CTASection() {
  const supabase = await createClient();

  // Ambil data CTA dan pengaturan website sekaligus
  const [
    { data: cta, error: ctaError },
    { data: settings, error: settingsError },
  ] = await Promise.all([
    supabase
      .from("cta_section")
      .select(
        "badge, title, title_highlight, description, button_text, background_url"
      )
      .eq("id", 1)
      .maybeSingle(),

    supabase
      .from("site_settings")
      .select("whatsapp_number")
      .eq("id", 1)
      .maybeSingle(),
  ]);

  if (ctaError) {
    console.error("Gagal mengambil CTA:", ctaError.message);
  }

  if (settingsError) {
    console.error(
      "Gagal mengambil nomor WhatsApp:",
      settingsError.message
    );
  }

  // Nomor WhatsApp dari Pengaturan Website
  // Nomor lama digunakan sebagai fallback jika data kosong
  const whatsappNumber =
    settings?.whatsapp_number || "6285701111308";

  const message =
    "Halo TailorJogja.com, saya ingin konsultasi pembuatan pakaian.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  const badge =
    cta?.badge || "Your Perfect Fit Awaits";

  const title =
    cta?.title || "Saatnya Memiliki Pakaian yang Benar-Benar";

  const titleHighlight =
    cta?.title_highlight || "Pas Untuk Anda";

  const description =
    cta?.description ||
    "Konsultasikan jas, vest, celana, atau kemeja custom Anda bersama TailorJogja.com.";

  const buttonText =
    cta?.button_text || "Konsultasi Gratis via WhatsApp";

  const backgroundUrl =
    cta?.background_url || "/images/cta-tailor.jpg";

  return (
    <section className="relative flex min-h-[610px] items-center justify-center overflow-hidden bg-black">
      
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${backgroundUrl}")`,
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/65" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center text-white">
        <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f1e8dc]">
          {badge}
        </p>

        <h2 className="font-serif text-[42px] leading-[1.18] sm:text-[52px] lg:text-[60px]">
          {title}{" "}
          <span className="italic font-normal text-[#d6a247]">
            {titleHighlight}
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-[760px] text-[15px] leading-7 text-[#eee8df]">
          {description}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center gap-3 bg-[#d6a247] px-8 py-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition duration-300 hover:bg-[#e4b45c]"
        >
          <MessageCircle size={21} strokeWidth={1.7} />
          {buttonText}
        </a>
      </div>
    </section>
  );
}