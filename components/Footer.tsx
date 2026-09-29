import {
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";

import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function Footer() {
  const supabase = await createClient();

  // =========================
  // AMBIL PENGATURAN WEBSITE
  // =========================
  const { data: settings, error } = await supabase
    .from("site_settings")
    .select(`
      whatsapp_number,
      instagram_url,
      facebook_url,
      tiktok_url,
      email,
      address,
      logo_url
    `)
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error(
      "Gagal mengambil pengaturan Footer:",
      error.message
    );
  }

  // =========================
  // DATA SETTINGS
  // =========================
  const whatsappNumber =
    settings?.whatsapp_number || "6285701111308";

  const instagramUrl =
    settings?.instagram_url || "";

  const facebookUrl =
    settings?.facebook_url || "";

  const tiktokUrl =
    settings?.tiktok_url || "";

  const email =
    settings?.email || "";

  const address =
    settings?.address || "";

  const logoUrl =
    settings?.logo_url || "";

  // =========================
  // FORMAT NOMOR WHATSAPP
  // 6285701111308
  // menjadi
  // 0857-0111-1308
  // =========================
  const formatWhatsAppNumber = (number: string) => {
    let cleaned = number.replace(/\D/g, "");

    // Ubah 62 menjadi 0
    if (cleaned.startsWith("62")) {
      cleaned = "0" + cleaned.slice(2);
    }

    // Format nomor Indonesia
    if (cleaned.length === 12) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(
        4,
        8
      )}-${cleaned.slice(8)}`;
    }

    if (cleaned.length === 13) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(
        4,
        8
      )}-${cleaned.slice(8)}`;
    }

    return cleaned;
  };

  const displayWhatsAppNumber =
    formatWhatsAppNumber(whatsappNumber);

  // =========================
  // URL WHATSAPP
  // =========================
  const whatsappMessage =
    "Halo TailorJogja.com, saya ingin konsultasi mengenai pembuatan pakaian custom.";

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  return (
    <footer
      id="kontak"
      className="bg-[#0c0b09] text-[#eee8df]"
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 lg:px-16">

        {/* ================= MAIN FOOTER ================= */}
        <div className="grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.7fr_0.8fr_0.8fr_1fr] lg:gap-16 lg:py-24">

          {/* ================= BRAND ================= */}
          <div>

            {/* LOGO WEBSITE */}
            <a
              href="#beranda"
              className="inline-flex items-center"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="TailorJogja"
                  className="h-[55px] w-auto max-w-[220px] object-contain"
                />
              ) : (
                <div className="font-serif text-[20px] text-white">
                  Tailor
                  <span className="text-[#d6a247]">
                    Jogja
                  </span>

                  <span className="text-[11px] text-[#c8c0b5]">
                    .com
                  </span>
                </div>
              )}
            </a>

            <p className="mt-7 max-w-[430px] text-[14px] leading-7 text-[#d4ccc2]">
              Jasa tailor dan pakaian custom di Yogyakarta.
              Melayani pembuatan jas, vest, celana, kemeja
              custom, setelan, serta Ready to Wear.
            </p>

            {/* ALAMAT */}
            {address && (
              <div className="mt-7 flex max-w-[400px] items-start gap-3 text-[14px] leading-6 text-[#d4ccc2]">
                <MapPin
                  size={17}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-[#d6a247]"
                />

                <span>{address}</span>
              </div>
            )}
          </div>

          {/* ================= NAVIGATION ================= */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Navigation
            </h3>

            <nav className="mt-7 flex flex-col gap-5 text-[14px] text-[#d4ccc2]">

              <a
                className="transition hover:text-[#d6a247]"
                href="#beranda"
              >
                Beranda
              </a>

              <a
                className="transition hover:text-[#d6a247]"
                href="#tentang"
              >
                Tentang
              </a>

              <a
                className="transition hover:text-[#d6a247]"
                href="#layanan"
              >
                Layanan
              </a>

              <a
                className="transition hover:text-[#d6a247]"
                href="#koleksi"
              >
                Koleksi
              </a>

              <a
                className="transition hover:text-[#d6a247]"
                href="#cara-pesan"
              >
                Cara Pesan
              </a>

              <a
                className="transition hover:text-[#d6a247]"
                href="#faq"
              >
                FAQ
              </a>

            </nav>
          </div>

          {/* ================= LAYANAN ================= */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Layanan
            </h3>

            <div className="mt-7 flex flex-col gap-5 text-[14px] text-[#d4ccc2]">

              <a
                href="#layanan"
                className="transition hover:text-[#d6a247]"
              >
                Jas Custom
              </a>

              <a
                href="#layanan"
                className="transition hover:text-[#d6a247]"
              >
                Vest Custom
              </a>

              <a
                href="#layanan"
                className="transition hover:text-[#d6a247]"
              >
                Kemeja Custom
              </a>

              <a
                href="#layanan"
                className="transition hover:text-[#d6a247]"
              >
                Celana Custom
              </a>

              <a
                href="#ready-to-wear"
                className="transition hover:text-[#d6a247]"
              >
                Ready to Wear
              </a>

            </div>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Hubungi Kami
            </h3>

            {/* WHATSAPP */}
            <div className="mt-7">
              <p className="text-[14px] text-[#d4ccc2]">
                WhatsApp
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-serif text-[18px] text-[#d6a247] transition hover:text-white"
              >
                {displayWhatsAppNumber}
              </a>
            </div>

            {/* EMAIL */}
            {email && (
              <a
                href={`mailto:${email}`}
                className="mt-5 flex items-center gap-2 text-[13px] text-[#d4ccc2] transition hover:text-[#d6a247]"
              >
                <Mail
                  size={16}
                  strokeWidth={1.5}
                />

                {email}
              </a>
            )}

            {/* ================= SOCIAL MEDIA ================= */}
            <div className="mt-8 flex gap-3">

              {/* INSTAGRAM */}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition hover:border-[#d6a247] hover:text-[#d6a247]"
                >
                  <FaInstagram size={18} />
                </a>
              )}

              {/* FACEBOOK */}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition hover:border-[#d6a247] hover:text-[#d6a247]"
                >
                  <FaFacebookF size={17} />
                </a>
              )}

              {/* TIKTOK */}
              {tiktokUrl && (
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition hover:border-[#d6a247] hover:text-[#d6a247]"
                >
                  <FaTiktok size={17} />
                </a>
              )}

            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col gap-4 border-t border-white/15 py-8 text-[12px] text-[#938b82] md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 TailorJogja.com. All Rights Reserved.
          </p>

          <p>
            Crafted for gentlemen in Yogyakarta.
          </p>

        </div>
      </div>
    </footer>
  );
}