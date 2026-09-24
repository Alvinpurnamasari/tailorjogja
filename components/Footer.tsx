import {
    Camera,
    Globe,
  } from "lucide-react";
  
  export default function Footer() {
    const whatsappNumber = "6285701111308";
  
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Halo TailorJogja.com, saya ingin konsultasi mengenai pembuatan pakaian custom."
    )}`;
  
    return (
      <footer className="bg-[#0c0b09] text-[#eee8df]">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 lg:px-16">
  
          {/* MAIN FOOTER */}
          <div className="grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.7fr_0.8fr_0.8fr_1fr] lg:gap-16 lg:py-24">
  
            {/* BRAND */}
            <div>
              <a
                href="#beranda"
                className="inline-block font-serif text-[20px] text-white"
              >
                Tailor<span className="text-[#d6a247]">Jogja</span>
                <span className="text-[11px] text-[#c8c0b5]">.com</span>
              </a>
  
              <p className="mt-7 max-w-[430px] text-[14px] leading-7 text-[#d4ccc2]">
                Jasa tailor dan pakaian custom di Yogyakarta. Melayani
                pembuatan jas, vest, celana, kemeja custom, setelan, serta
                Ready to Wear.
              </p>
            </div>
  
            {/* NAVIGATION */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                Navigation
              </h3>
  
              <nav className="mt-7 flex flex-col gap-5 text-[14px] text-[#d4ccc2]">
                <a className="transition hover:text-[#d6a247]" href="#beranda">
                  Beranda
                </a>
  
                <a className="transition hover:text-[#d6a247]" href="#tentang">
                  Tentang
                </a>
  
                <a className="transition hover:text-[#d6a247]" href="#layanan">
                  Layanan
                </a>
  
                <a className="transition hover:text-[#d6a247]" href="#koleksi">
                  Koleksi
                </a>
  
                <a className="transition hover:text-[#d6a247]" href="#cara-pesan">
                  Cara Pesan
                </a>
  
                <a className="transition hover:text-[#d6a247]" href="#faq">
                  FAQ
                </a>
              </nav>
            </div>
  
            {/* LAYANAN */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                Layanan
              </h3>
  
              <div className="mt-7 flex flex-col gap-5 text-[14px] text-[#d4ccc2]">
                <a href="#layanan" className="transition hover:text-[#d6a247]">
                  Jas Custom
                </a>
  
                <a href="#layanan" className="transition hover:text-[#d6a247]">
                  Vest Custom
                </a>
  
                <a href="#layanan" className="transition hover:text-[#d6a247]">
                  Kemeja Custom
                </a>
  
                <a href="#layanan" className="transition hover:text-[#d6a247]">
                  Celana Custom
                </a>
  
                <a href="#ready-to-wear" className="transition hover:text-[#d6a247]">
                  Ready to Wear
                </a>
              </div>
            </div>
  
            {/* CONTACT */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                Hubungi Kami
              </h3>
  
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
                  0857-0111-1308
                </a>
              </div>
  
              {/* SOCIAL MEDIA */}
              <div className="mt-8 flex gap-3">
  
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center border border-white/15 transition hover:border-[#d6a247] hover:text-[#d6a247]"
                >
                  <Camera size={17} strokeWidth={1.5} />
                </a>
  
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center border border-white/15 transition hover:border-[#d6a247] hover:text-[#d6a247]"
                >
                  <Globe size={17} strokeWidth={1.5} />
                </a>
  
                <a
                  href="#"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-[13px] font-semibold transition hover:border-[#d6a247] hover:text-[#d6a247]"
                >
                  TT
                </a>
  
              </div>
            </div>
          </div>
  
          {/* BOTTOM */}
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