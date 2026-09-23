export default function About() {
    const whatsappUrl =
      "https://wa.me/6285701111308?text=" +
      encodeURIComponent(
        "Halo TailorJogja.com, saya ingin konsultasi mengenai pembuatan pakaian custom."
      );
  
    return (
      <section id="tentang" className="bg-[#f8f4ec]">
        <div className="grid min-h-[760px] lg:grid-cols-2">
          
          {/* ================= LEFT IMAGE ================= */}
          <div className="relative min-h-[520px] overflow-hidden lg:min-h-[760px]">
            <img
              src="/images/jas.jpg"
              alt="Proses pengukuran pakaian custom TailorJogja"
              className="absolute inset-0 h-full w-full object-cover"
            />
  
            {/* sedikit overlay */}
            <div className="absolute inset-0 bg-black/10" />
  
            {/* LABEL BAWAH */}
            <div className="absolute bottom-0 right-0 bg-[#0d0b08] px-12 py-8 text-white lg:px-16">
              <p className="font-serif text-[25px] text-[#d5a04a]">
                01
              </p>
  
              <p className="mt-2 text-[11px] tracking-[0.18em] text-white/80">
                PERSONAL MEASUREMENT
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
                  ABOUT US
                </span>
              </div>
  
              {/* TITLE */}
              <h2 className="font-serif text-[46px] leading-[1.08] text-[#17130f] sm:text-[56px] xl:text-[68px]">
                Karena Pakaian
                <br />
                yang Pas Dimulai
                <br />
                dari{" "}
                <span className="italic text-[#c99643]">
                  Ukuran
                  <br />
                  yang Tepat
                </span>
              </h2>
  
              {/* DESCRIPTION */}
              <p className="mt-8 max-w-[610px] text-[16px] leading-8 text-[#6f675d]">
                TailorJogja.com menghadirkan layanan pembuatan pakaian custom
                dengan proses pengukuran langsung oleh penjahit. Setiap pakaian
                dibuat berdasarkan ukuran, kebutuhan, dan preferensi pelanggan
                agar memberikan kenyamanan sekaligus tampilan yang lebih percaya
                diri.
              </p>
  
              {/* CHECKLIST */}
              <div className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
  
                <CheckItem text="Pengukuran langsung oleh penjahit" />
  
                <CheckItem text="Ukuran disesuaikan dengan tubuh pelanggan" />
  
                <CheckItem text="Pilihan model sesuai kebutuhan" />
  
                <CheckItem text="Pilihan bahan dan warna" />
  
                <CheckItem text="Detail jahitan yang diperhatikan" />
  
                <CheckItem text="Konsultasi sebelum pengerjaan" />
  
              </div>
  
              {/* BUTTON */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-6 bg-[#0d0b08] px-8 py-5 text-[12px] font-bold tracking-[0.08em] text-white transition duration-300 hover:bg-[#c99643] hover:text-black"
              >
                KONSULTASIKAN KEBUTUHAN ANDA
  
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
  
  /* ================= CHECK ITEM ================= */
  
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