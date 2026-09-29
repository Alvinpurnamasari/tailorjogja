import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function About() {
  const supabase = await createClient();

  // =========================
  // AMBIL DATA ABOUT
  // =========================
  const { data: about, error: aboutError } = await supabase
    .from("about_section")
    .select(`
      id,
      section_label,
      title,
      title_highlight,
      description,
      image_url,
      image_number,
      image_label,
      checklist_1,
      checklist_2,
      checklist_3,
      checklist_4,
      checklist_5,
      checklist_6,
      button_text
    `)
    .eq("id", 1)
    .maybeSingle();

  if (aboutError) {
    console.error(
      "Gagal mengambil data Tentang:",
      aboutError.message
    );
  }

  // =========================
  // AMBIL PENGATURAN WEBSITE
  // =========================
  const { data: settings, error: settingsError } = await supabase
    .from("site_settings")
    .select("whatsapp_number")
    .eq("id", 1)
    .maybeSingle();

  if (settingsError) {
    console.error(
      "Gagal mengambil pengaturan website:",
      settingsError.message
    );
  }

  // =========================
  // WHATSAPP
  // =========================
  const whatsappNumber =
    settings?.whatsapp_number || "6285701111308";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Halo TailorJogja.com, saya ingin konsultasi mengenai pembuatan pakaian custom."
  )}`;

  // =========================
  // FALLBACK DATA
  // =========================
  const sectionLabel =
    about?.section_label || "ABOUT US";

  const title =
    about?.title || "Karena Pakaian yang Pas Dimulai dari";

  const titleHighlight =
    about?.title_highlight || "Ukuran yang Tepat";

  const description =
    about?.description ||
    "TailorJogja.com menghadirkan layanan pembuatan pakaian custom dengan proses pengukuran langsung oleh penjahit.";

  const imageUrl =
    about?.image_url || "/images/jas.jpg";

  const imageNumber =
    about?.image_number || "01";

  const imageLabel =
    about?.image_label || "PERSONAL MEASUREMENT";

  const buttonText =
    about?.button_text || "KONSULTASIKAN KEBUTUHAN ANDA";

  // =========================
  // CHECKLIST
  // =========================
  const checklists = [
    about?.checklist_1,
    about?.checklist_2,
    about?.checklist_3,
    about?.checklist_4,
    about?.checklist_5,
    about?.checklist_6,
  ].filter(
    (item): item is string =>
      typeof item === "string" && item.trim() !== ""
  );

  // Fallback checklist
  const fallbackChecklists = [
    "Pengukuran langsung oleh penjahit",
    "Ukuran disesuaikan dengan tubuh pelanggan",
    "Pilihan model sesuai kebutuhan",
    "Pilihan bahan dan warna",
    "Detail jahitan yang diperhatikan",
    "Konsultasi sebelum pengerjaan",
  ];

  const displayedChecklists =
    checklists.length > 0 ? checklists : fallbackChecklists;

  return (
    <section id="tentang" className="bg-[#f8f4ec]">
      <div className="grid min-h-[760px] lg:grid-cols-2">

        {/* ================= LEFT IMAGE ================= */}
        <div className="relative min-h-[520px] overflow-hidden lg:min-h-[760px]">
          <img
            src={imageUrl}
            alt="Proses pengukuran pakaian custom TailorJogja"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />

          {/* IMAGE LABEL */}
          <div className="absolute bottom-0 right-0 bg-[#0d0b08] px-12 py-8 text-white lg:px-16">
            <p className="font-serif text-[25px] text-[#d5a04a]">
              {imageNumber}
            </p>

            <p className="mt-2 text-[11px] tracking-[0.18em] text-white/80">
              {imageLabel}
            </p>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="flex items-center px-8 py-20 sm:px-12 lg:px-20 xl:px-24">
          <div className="max-w-[650px]">

            {/* LABEL */}
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-8 bg-[#c99643]" />

              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c99643]">
                {sectionLabel}
              </span>
            </div>

            {/* TITLE */}
            <h2 className="font-serif text-[46px] leading-[1.08] text-[#17130f] sm:text-[56px] xl:text-[68px]">
              {title}{" "}
              <span className="italic text-[#c99643]">
                {titleHighlight}
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-8 max-w-[610px] text-[16px] leading-8 text-[#6f675d]">
              {description}
            </p>

            {/* CHECKLIST */}
            <div className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {displayedChecklists.map((item, index) => (
                <CheckItem
                  key={`${item}-${index}`}
                  text={item}
                />
              ))}
            </div>

            {/* BUTTON */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-6 bg-[#0d0b08] px-8 py-5 text-[12px] font-bold tracking-[0.08em] text-white transition duration-300 hover:bg-[#c99643] hover:text-black"
            >
              {buttonText}

              <span className="text-xl">
                →
              </span>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#c99643] text-[12px] text-[#c99643]">
        ✓
      </div>

      <p className="pt-[2px] text-[14px] leading-5 text-[#2f2a24]">
        {text}
      </p>
    </div>
  );
}