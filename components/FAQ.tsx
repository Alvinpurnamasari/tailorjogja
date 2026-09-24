"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Apa saja yang bisa dibuat custom?",
    answer:
      "TailorJogja.com melayani pembuatan jas, vest, celana, kemeja, setelan, dan berbagai kebutuhan pakaian custom lainnya.",
  },
  {
    question: "Apakah ukuran dilakukan langsung oleh penjahit?",
    answer:
      "Ya, pengukuran dilakukan langsung oleh penjahit agar pakaian dapat dibuat sesuai ukuran pelanggan.",
  },
  {
    question: "Apakah saya bisa memilih model dan bahan?",
    answer:
      "Ya. Model, bahan, warna, dan detail pakaian dapat dikonsultasikan sesuai kebutuhan.",
  },
  {
    question: "Apakah tersedia Ready to Wear?",
    answer:
      "Ya. Selain pakaian custom, TailorJogja.com juga menyediakan koleksi Ready to Wear.",
  },
  {
    question: "Berapa lama proses pengerjaannya?",
    answer:
      "Waktu pengerjaan menyesuaikan jenis pakaian, jumlah pesanan, dan tingkat kerumitan. Silakan konsultasikan melalui WhatsApp.",
  },
  {
    question: "Bagaimana cara melakukan pemesanan?",
    answer:
      "Hubungi TailorJogja.com melalui WhatsApp 0857-0111-1308 untuk melakukan konsultasi.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="scroll-mt-[90px] bg-[#f7f2e9] text-[#0c0b09]"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[420px_1fr] lg:gap-24">

          {/* LEFT */}
          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-8 bg-[#d6a247]" />

              <span className="text-[12px] font-semibold uppercase tracking-[0.32em] text-[#c98b28]">
                FAQ
              </span>
            </div>

            <h2 className="font-serif text-[52px] leading-[0.98] sm:text-[60px] lg:text-[68px]">
              Pertanyaan
              <br />
              yang Sering
              <br />

              <span className="italic font-normal text-[#d6a247]">
                Diajukan
              </span>
            </h2>

            <p className="mt-8 max-w-[340px] text-[16px] leading-8 text-[#756554]">
              Temukan jawaban singkat sebelum memulai konsultasi pakaian Anda.
            </p>
          </div>

          {/* RIGHT */}
          <div className="border-t border-[#d9d0c3]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-[#d9d0c3]"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="font-serif text-[20px] leading-snug md:text-[22px]">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={20}
                      strokeWidth={1.5}
                      className={`shrink-0 text-[#c98b28] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pr-10 text-[15px] leading-7 text-[#756554] md:text-[16px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}