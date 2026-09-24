import { MessageCircle } from "lucide-react";

export default function CTASection() {
  const whatsappUrl =
    "https://wa.me/6285701111308?text=Halo%20TailorJogja.com%2C%20saya%20ingin%20konsultasi%20pembuatan%20pakaian.";

  return (
    <section
      className="relative flex min-h-[610px] items-center justify-center overflow-hidden bg-black"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/cta-tailor.jpg')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/65" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center text-white">
        <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f1e8dc]">
          Your Perfect Fit Awaits
        </p>

        <h2 className="font-serif text-[42px] leading-[1.18] sm:text-[52px] lg:text-[60px]">
          Saatnya Memiliki Pakaian yang
          <br />
          Benar-Benar{" "}
          <span className="italic font-normal text-[#d6a247]">
            Pas Untuk Anda
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-[760px] text-[15px] leading-7 text-[#eee8df]">
          Konsultasikan jas, vest, celana, atau kemeja custom Anda bersama
          TailorJogja.com.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center gap-3 bg-[#d6a247] px-8 py-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition duration-300 hover:bg-[#e4b45c]"
        >
          <MessageCircle size={21} strokeWidth={1.7} />
          Konsultasi Gratis via WhatsApp
        </a>
      </div>
    </section>
  );
}