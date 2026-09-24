"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "Banner", href: "/admin/banner" },
  { name: "Tentang", href: "/admin/about" },
  { name: "Layanan", href: "/admin/services" },
  { name: "Keunggulan", href: "/admin/advantages" },
  { name: "Koleksi", href: "/admin/collections" },
  { name: "Ready to Wear", href: "/admin/ready-to-wear" },
  { name: "Cara Pesan", href: "/admin/order-steps" },
  { name: "FAQ", href: "/admin/faqs" },
  { name: "CTA", href: "/admin/cta" },
];

const settingItems = [
  { name: "Pengaturan Website", href: "/admin/settings" },
  { name: "Akun Admin", href: "/admin/account" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-[#ddd3c4] bg-[#17130f] lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-white/10 px-8 py-7">
          <Link href="/admin">
            <h1 className="font-serif text-3xl text-white">
              Tailor<span className="text-[#d29a43]">Jogja</span>
            </h1>
          </Link>

          <p className="mt-2 text-xs font-semibold tracking-[0.25em] text-[#d29a43]">
            ADMIN PANEL
          </p>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-4 text-[11px] font-semibold tracking-[0.2em] text-white/40">
            MENU UTAMA
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 text-sm transition ${
                  isActive(item.href)
                    ? "bg-[#d29a43] text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <p className="mb-3 mt-8 px-4 text-[11px] font-semibold tracking-[0.2em] text-white/40">
            PENGATURAN
          </p>

          <nav className="space-y-1">
            {settingItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 text-sm transition ${
                  isActive(item.href)
                    ? "bg-[#d29a43] text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 px-8 py-5">
          <p className="text-xs text-white/40">TailorJogja.com</p>
        </div>
      </div>
    </aside>
  );
}