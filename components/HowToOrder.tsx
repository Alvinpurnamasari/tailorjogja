const steps = [
  {
    number: "01",
    title: "Konsultasi",
    description:
      "Hubungi kami melalui WhatsApp dan sampaikan pakaian yang ingin dibuat.",
  },
  {
    number: "02",
    title: "Pilih Model & Bahan",
    description:
      "Diskusikan model, bahan, warna, dan detail pakaian yang diinginkan.",
  },
  {
    number: "03",
    title: "Pengukuran",
    description:
      "Penjahit melakukan pengukuran badan secara langsung.",
  },
  {
    number: "04",
    title: "Proses Pengerjaan",
    description:
      "Pakaian dibuat berdasarkan ukuran dan detail yang telah disepakati.",
  },
  {
    number: "05",
    title: "Fitting & Selesai",
    description:
      "Pakaian dicoba untuk memastikan ukuran dan kenyamanannya.",
  },
];

export default function HowToOrder() {
  return (
    <section
      id="cara-pesan"
      className="scroll-mt-[90px] bg-[#f8f5ef] text-[#100e0b]"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 lg:px-16 lg:py-24">

        {/* HEADER */}
        <div className="text-center">
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-[#c98b28]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c98b28]">
              Simple Process
            </span>
          </div>

          <h2 className="mx-auto max-w-[720px] font-serif text-[52px] leading-[1.08] sm:text-[60px] lg:text-[68px]">
            Bagaimana
            <br />
            Cara Membuat
            <br />
            <span className="italic font-normal text-[#d6a247]">
              Pakaian Custom?
            </span>
          </h2>
        </div>

        {/* STEPS */}
        <div className="relative mt-20 lg:mt-24">

          {/* GARIS HORIZONTAL */}
          <div className="absolute left-0 right-0 top-[30px] hidden h-px bg-[#d8cfc0] lg:block" />

          <div className="relative grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative px-4 text-center lg:px-5"
              >
                {/* NUMBER */}
                <div className="relative z-10 mx-auto flex h-[60px] w-[60px] items-center justify-center border border-[#d6a247] bg-[#f8f5ef] font-serif text-[14px] text-[#c98b28]">
                  {step.number}
                </div>

                {/* TITLE */}
                <h3 className="mt-7 font-serif text-[20px] leading-snug lg:text-[21px]">
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mx-auto mt-4 max-w-[250px] text-[14px] leading-6 text-[#756554]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}