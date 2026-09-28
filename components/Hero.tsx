import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function Hero() {
  const supabase = await createClient();

  // Ambil data Hero
  const { data: hero, error: heroError } = await supabase
    .from("hero_section")
    .select(
      "badge, title, title_highlight, description, button_text, background_url"
    )
    .eq("id", 1)
    .maybeSingle();

  // Ambil nomor WhatsApp dari Pengaturan Website
  const { data: settings, error: settingsError } = await supabase
    .from("site_settings")
    .select("whatsapp_number")
    .eq("id", 1)
    .maybeSingle();

  if (heroError) {
    console.error(
      "Gagal mengambil Hero:",
      heroError.message
    );
  }

  if (settingsError) {
    console.error(
      "Gagal mengambil pengaturan website:",
      settingsError.message
    );
  }

  // =========================
  // HERO DATA
  // =========================

  const badge =
    hero?.badge || "PROFESSIONAL TAILOR • YOGYAKARTA";

  const title =
    hero?.title || "Pakaian Custom yang Dibuat Khusus";

  const titleHighlight =
    hero?.title_highlight || "Untuk Anda";

  const description =
    hero?.description ||
    "Jas, vest, celana, dan kemeja custom dengan pengukuran langsung oleh penjahit untuk mendapatkan ukuran yang nyaman dan sesuai dengan gaya Anda.";

  const buttonText =
    hero?.button_text || "KONSULTASI VIA WHATSAPP";

  const backgroundUrl =
    hero?.background_url || "/images/jas1.jpg";

  // =========================
  // WHATSAPP
  // =========================

  const whatsappNumber =
    settings?.whatsapp_number || "6285701111308";

  const whatsappMessage =
    "Halo TailorJogja.com, saya ingin konsultasi mengenai pembuatan pakaian custom.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section
      id="beranda"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${backgroundUrl}")`,
        }}
      />

      {/* OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.90) 25%, rgba(0,0,0,0.70) 45%, rgba(0,0,0,0.28) 63%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      {/* BAYANGAN BAWAH */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1480px] items-center px-8 pb-16 pt-32 lg:px-16">
        <div className="w-full max-w-[720px]">

          {/* LABEL */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-8 bg-[#d6a24e]" />

            <p className="text-xs font-semibold tracking-[0.25em] text-[#e2c28c]">
              {badge}
            </p>
          </div>

          {/* TITLE */}
          <h1 className="font-serif text-[52px] leading-[1.03] text-[#f7f3ea] sm:text-[64px] lg:text-[76px]">
            {title}{" "}
            <span className="italic text-[#d6a24e]">
              {titleHighlight}
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-8 max-w-[700px] text-base leading-8 text-white/80 lg:text-[17px]">
            {description}
          </p>

          {/* BUTTON */}
          <div className="mt-9 flex flex-wrap gap-4">

            {/* WHATSAPP */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a24e] px-8 py-5 text-xs font-bold tracking-[0.1em] text-black transition duration-300 hover:bg-[#e5b45e]"
            >
              ◯ &nbsp; {buttonText}
            </a>

            {/* LIHAT LAYANAN */}
            <a
              href="#layanan"
              className="border border-white/50 bg-black/20 px-8 py-5 text-xs font-bold tracking-[0.1em] text-white backdrop-blur-[2px] transition duration-300 hover:bg-white hover:text-black"
            >
              LIHAT LAYANAN &nbsp; ↘
            </a>
          </div>

          {/* BENEFITS */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/20 pt-7">

            <p className="text-xs tracking-[0.17em] text-white/80">
              <span className="mr-2 text-[#d6a24e]">
                ✓
              </span>
              DIUKUR LANGSUNG
            </p>

            <span className="hidden text-[#d6a24e] sm:block">
              •
            </span>

            <p className="text-xs tracking-[0.17em] text-white/80">
              <span className="mr-2 text-[#d6a24e]">
                ✓
              </span>
              CUSTOM SESUAI UKURAN
            </p>

            <span className="hidden text-[#d6a24e] sm:block">
              •
            </span>

            <p className="text-xs tracking-[0.17em] text-white/80">
              <span className="mr-2 text-[#d6a24e]">
                ✓
              </span>
              JAHITAN BERKUALITAS
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}