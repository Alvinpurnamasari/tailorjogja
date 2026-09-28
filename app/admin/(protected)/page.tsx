import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // =========================
  // USER LOGIN
  // =========================
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // =========================
  // HITUNG DATA
  // =========================
  const [
    servicesResult,
    advantagesResult,
    collectionsResult,
    readyToWearResult,
    orderStepsResult,
    faqsResult,
  ] = await Promise.all([
    supabase
      .from("services")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("advantages")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("collections")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("ready_to_wear")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("order_steps")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("faqs")
      .select("*", { count: "exact", head: true }),
  ]);

  // =========================
  // JUMLAH DATA
  // =========================
  const serviceCount = servicesResult.count ?? 0;
  const advantageCount = advantagesResult.count ?? 0;
  const collectionCount = collectionsResult.count ?? 0;
  const readyToWearCount = readyToWearResult.count ?? 0;
  const orderStepCount = orderStepsResult.count ?? 0;
  const faqCount = faqsResult.count ?? 0;

  // =========================
  // DATA CARD
  // =========================
  const cards = [
    {
      title: "Layanan",
      count: serviceCount,
      href: "/admin/services",
      description: "Layanan tailor",
    },
    {
      title: "Keunggulan",
      count: advantageCount,
      href: "/admin/advantages",
      description: "Keunggulan layanan",
    },
    {
      title: "Koleksi",
      count: collectionCount,
      href: "/admin/collections",
      description: "Foto koleksi",
    },
    {
      title: "Ready to Wear",
      count: readyToWearCount,
      href: "/admin/ready-to-wear",
      description: "Produk siap pakai",
    },
    {
      title: "Cara Pesan",
      count: orderStepCount,
      href: "/admin/how-to-order",
      description: "Tahapan pemesanan",
    },
    {
      title: "FAQ",
      count: faqCount,
      href: "/admin/faqs",
      description: "Pertanyaan & jawaban",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f0e6] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#c88c2d]">
            Admin Panel
          </p>

          <h1 className="font-serif text-4xl text-[#17130f]">
            Dashboard TailorJogja
          </h1>

          <p className="mt-3 text-[#746b60]">
            Kelola seluruh konten website TailorJogja.com
            dari satu tempat.
          </p>

          {user?.email && (
            <p className="mt-2 text-sm text-[#9a9186]">
              Login sebagai {user.email}
            </p>
          )}
        </div>

        {/* =========================
            STATISTIC CARDS
        ========================= */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group border border-[#ded5c5] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c88c2d] hover:shadow-lg"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-[#746b60]">
                    {card.title}
                  </p>

                  <p className="mt-4 font-serif text-4xl text-[#17130f]">
                    {card.count}
                  </p>
                </div>

                <span className="text-xl text-[#c88c2d] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </div>

              <p className="mt-5 border-t border-[#eee7dc] pt-4 text-xs uppercase tracking-[0.1em] text-[#9a9186]">
                {card.description}
              </p>
            </a>
          ))}
        </div>

        {/* =========================
            QUICK ACCESS
        ========================= */}
        <div className="mt-10 border border-[#ded5c5] bg-[#17130f] p-8 text-white md:p-10">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d6a247]">
            Quick Access
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>
              <h2 className="font-serif text-2xl">
                Pengaturan Website
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                Atur nomor WhatsApp, email, media sosial,
                alamat, dan informasi kontak TailorJogja.com.
              </p>
            </div>

            <a
              href="/admin/settings"
              className="inline-flex shrink-0 items-center justify-center bg-[#d6a247] px-7 py-4 text-xs font-bold tracking-[0.1em] text-black transition hover:bg-[#e5b45e]"
            >
              BUKA PENGATURAN →
            </a>

          </div>
        </div>

      </div>
    </main>
  );
}