"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
};

export default function FaqAccordion({
  faqs,
}: {
  faqs: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    faqs.length > 0 ? 0 : null
  );

  const toggleFaq = (index: number) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  if (faqs.length === 0) {
    return (
      <div className="border-t border-[#d9d0c3]">
        <p className="py-7 text-[15px] text-[#756554]">
          Belum ada FAQ.
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-[#d9d0c3]">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.id}
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
  );
}