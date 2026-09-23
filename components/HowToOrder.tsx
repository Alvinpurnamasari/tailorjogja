const steps = [
    {
      number: "01",
      title: "Hubungi Kami",
      description:
        "Hubungi TailorJogja.com melalui WhatsApp dan sampaikan jenis pakaian yang ingin Anda buat.",
    },
    {
      number: "02",
      title: "Konsultasi",
      description:
        "Diskusikan kebutuhan, model, bahan, warna, serta detail pakaian yang Anda inginkan.",
    },
    {
      number: "03",
      title: "Pengukuran",
      description:
        "Penjahit melakukan pengukuran secara langsung agar pakaian dibuat sesuai dengan ukuran tubuh Anda.",
    },
    {
      number: "04",
      title: "Proses Pengerjaan",
      description:
        "Pakaian mulai dikerjakan dengan memperhatikan ukuran, detail, dan hasil jahitan.",
    },
    {
      number: "05",
      title: "Pakaian Siap",
      description:
        "Setelah selesai, pakaian siap digunakan dengan ukuran dan detail yang telah disesuaikan.",
    },
  ];
  
  export default function HowToOrder() {
    const whatsappUrl =
      "https://wa.me/6285701111308?text=Halo%20TailorJogja.com,%20saya%20ingin%20konsultasi%20pembuatan%20pakaian.";
  
    return (
      <section
        id="cara-pesan"
        className="scroll-mt-[92px] bg-[#f5f1e8] px-6 py-24 md:px-10 lg:px-20 lg:py-32"
      >
        <div className="mx-auto max-w-[1480px]">
  
          {/* HEADER */}
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-9 bg-[#c99036]" />
                <p className="text-[11px] font-semibold tracking-[0.3em] text-[#c99036]">
                  CARA PESAN
                </p>
              </div>
  
              <h2 className="font-serif text-[48px] leading-[0.98] text-[#15120f] md:text-[64px] lg:text-[76px]">
                Mudah untuk Memulai
                <br />
                <span className="italic text-[#c99036]">
                  Pakaian Anda
                </span>
              </h2>
            </div>
  
            <div className="lg:pb-2 lg:pl-20">
              <p className="max-w-[520px] text-[16px] leading-8 text-[#71675c]">
                Mulai dari konsultasi hingga pakaian selesai, setiap proses
                dilakukan dengan komunikasi yang jelas dan sesuai kebutuhan Anda.
              </p>
            </div>
          </div>
  
          {/* STEPS */}
          <div className="mt-20 grid border-l border-t border-[#d8d0c4] md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group min-h-[330px] border-b border-r border-[#d8d0c4] p-8 transition duration-300 hover:bg-[#eee8dc] lg:p-9"
              >
                <span className="text-[12px] font-semibold tracking-[0.3em] text-[#c99036]">
                  {step.number}
                </span>
  
                <div className="my-12 h-px w-10 bg-[#c99036] transition-all duration-300 group-hover:w-16" />
  
                <h3 className="font-serif text-[26px] leading-tight text-[#17130f]">
                  {step.title}
                </h3>
  
                <p className="mt-6 text-[14px] leading-7 text-[#71675c]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
  
          {/* BOTTOM CTA */}
          <div className="flex flex-col gap-8 border-b border-l border-r border-[#d8d0c4] px-8 py-10 md:flex-row md:items-center md:justify-between lg:px-10">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#71675c]">
              MULAI KONSULTASI UNTUK PAKAIAN CUSTOM ANDA.
            </p>
  
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[270px] items-center justify-between bg-[#0d0c0a] px-7 py-5 text-[11px] font-bold tracking-[0.13em] text-white transition hover:bg-[#c99036] hover:text-black"
            >
              KONSULTASI SEKARANG
              <span className="text-lg">↗</span>
            </a>
          </div>
        </div>
      </section>
    );
  }