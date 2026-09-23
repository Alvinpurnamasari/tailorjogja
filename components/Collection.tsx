"use client";

import { useState } from "react";

type CollectionItem = {
  id: number;
  category: string;
  title: string;
  image: string;
};

const collections: CollectionItem[] = [
  {
    id: 1,
    category: "JAS",
    title: "Charcoal Business Suit",
    image: "/images/jas.jpg",
  },
  {
    id: 2,
    category: "VEST",
    title: "Classic Bronze Vest",
    image: "/images/jas1.jpg",
  },
  {
    id: 3,
    category: "KEMEJA",
    title: "Ivory Dress Shirt",
    image: "/images/hero-tailor.jpg",
  },
  {
    id: 4,
    category: "CELANA",
    title: "Tailored Formal Trousers",
    image: "/images/hero-tailor.jpg",
  },
  {
    id: 5,
    category: "SETELAN",
    title: "The Signature Set",
    image: "/images/hero-tailor.jpg",
  },
  {
    id: 6,
    category: "JAS",
    title: "Hand-finished Lapel",
    image: "/images/hero-tailor.jpg",
  },
];

const filters = ["SEMUA", "JAS", "VEST", "KEMEJA", "CELANA", "SETELAN"];

export default function Collection() {
  const [activeFilter, setActiveFilter] = useState("SEMUA");
  const [selectedItem, setSelectedItem] =
    useState<CollectionItem | null>(null);

  const filteredCollections =
    activeFilter === "SEMUA"
      ? collections
      : collections.filter(
          (item) => item.category === activeFilter
        );

  return (
    <>
      <section
        id="koleksi"
        className="bg-[#f4f0e8] text-[#11100d]"
      >
        <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 lg:px-16 lg:py-24">

          {/* HEADER */}
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-8 bg-[#c99036]" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c99036]">
                Our Collection
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <h2 className="font-serif text-[48px] leading-[1] md:text-[65px] lg:text-[72px]">
                  Hasil Karya{" "}
                  <span className="italic text-[#c99036]">
                    TailorJogja.com
                  </span>
                </h2>

                <p className="mt-5 text-[16px] text-[#71675c]">
                  Beberapa hasil pakaian yang telah kami kerjakan.
                </p>
              </div>

              {/* FILTER */}
              <div className="flex flex-nowrap items-center gap-2 lg:justify-end">
                {filters.map((filter) => (
                    <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`shrink-0 border-b px-4 py-3 text-[11px] font-semibold tracking-[0.08em] transition ${
                        activeFilter === filter
                        ? "border-[#c99036] text-[#11100d]"
                        : "border-[#d8d0c4] text-[#685f55] hover:border-[#c99036]"
                    }`}
                    >
                    {filter}
                    </button>
                ))}
                </div>
            </div>
          </div>

          {/* GALLERY */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filteredCollections.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative h-[360px] overflow-hidden text-left lg:h-[390px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* DARK GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* TEXT */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.2em] text-[#d9a548]">
                    {item.category}
                  </p>

                  <div className="flex items-end justify-between gap-5">
                    <h3 className="font-serif text-[26px] text-white">
                      {item.title}
                    </h3>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/70 text-xl text-white transition group-hover:bg-white group-hover:text-black">
                      +
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL / POPUP */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-5"
          onClick={() => setSelectedItem(null)}
        >
          {/* CLOSE */}
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center bg-[#f4f0e8] text-2xl text-black transition hover:bg-[#c99036]"
          >
            ×
          </button>

          <div
            className="w-full max-w-[520px]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="max-h-[70vh] w-full object-cover"
            />

            <div className="bg-[#11100d] px-6 py-5">
              <p className="mb-2 text-[10px] font-semibold tracking-[0.22em] text-[#c99036]">
                {selectedItem.category}
              </p>

              <h3 className="font-serif text-[24px] text-[#f4f0e8]">
                {selectedItem.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}