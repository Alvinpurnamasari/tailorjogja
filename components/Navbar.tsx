"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "BERANDA", href: "#beranda" },
    { label: "LAYANAN", href: "#layanan" },
    { label: "TENTANG", href: "#tentang" },
    { label: "KEUNGGULAN", href: "#keunggulan" },
    { label: "KOLEKSI", href: "#koleksi" },
    { label: "CARA PESAN", href: "#cara-pesan" },
    { label: "FAQ", href: "#faq" },
    { label: "KONTAK", href: "#kontak" },
  ];

  const whatsappUrl =
    "https://wa.me/6285701111308?text=Halo%20TailorJogja.com,%20saya%20ingin%20konsultasi.";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#f5f1e8] shadow-[0_1px_0_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[92px] max-w-[1480px] items-center justify-between px-6 md:px-10 lg:px-16">
        
        {/* LOGO */}
        <a
          href="#beranda"
          className={`font-serif text-[21px] transition-colors duration-500 ${
            scrolled ? "text-[#17130f]" : "text-white"
          }`}
        >
          Tailor<span className="text-[#d29a3a]">Jogja</span>
          <span className="text-[11px]">.com</span>
        </a>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-8 lg:flex">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-[11px] font-semibold tracking-[0.08em] transition-colors duration-300 ${
                scrolled
                  ? "text-[#5f584f] hover:text-[#c99036]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden bg-[#d9a348] px-8 py-[18px] text-[11px] font-bold tracking-[0.12em] text-black transition hover:bg-[#e6b45c] lg:flex lg:items-center lg:gap-5"
        >
          KONSULTASI SEKARANG
          <span className="text-lg leading-none">↗</span>
        </a>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`text-2xl lg:hidden ${
            scrolled ? "text-black" : "text-white"
          }`}
          aria-label="Buka menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-black/10 bg-[#f5f1e8] px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-[12px] font-semibold tracking-[0.1em] text-[#17130f]"
              >
                {item.label}
              </a>
            ))}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-[#d9a348] px-6 py-4 text-center text-[11px] font-bold tracking-[0.12em] text-black"
            >
              KONSULTASI SEKARANG ↗
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}