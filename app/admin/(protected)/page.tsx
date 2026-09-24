import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-[#f5f0e6] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#c88c2d]">
            Admin Panel
          </p>

          <h1 className="font-serif text-4xl text-[#17130f]">
            Dashboard TailorJogja
          </h1>

          <p className="mt-3 text-[#746b60]">
            Login sebagai {user?.email}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="border border-[#ded5c5] bg-white p-6">
            <p className="text-sm text-[#746b60]">Layanan</p>
            <p className="mt-3 font-serif text-3xl">0</p>
          </div>

          <div className="border border-[#ded5c5] bg-white p-6">
            <p className="text-sm text-[#746b60]">Koleksi</p>
            <p className="mt-3 font-serif text-3xl">0</p>
          </div>

          <div className="border border-[#ded5c5] bg-white p-6">
            <p className="text-sm text-[#746b60]">FAQ</p>
            <p className="mt-3 font-serif text-3xl">0</p>
          </div>

          <div className="border border-[#ded5c5] bg-white p-6">
            <p className="text-sm text-[#746b60]">Pengaturan</p>
            <p className="mt-3 font-serif text-3xl">—</p>
          </div>
        </div>
      </div>
    </main>
  );
}