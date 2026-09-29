import { createClient } from "@/utils/supabase/server";
import AccountManager from "@/components/admin/AccountManager";

export const dynamic = "force-dynamic";

export default async function AdminAccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f5f0e6] p-6 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#c88c2d]">
            Pengaturan
          </p>

          <h1 className="font-serif text-4xl text-[#17130f]">
            Akun Admin
          </h1>

          <p className="mt-3 text-[#746b60]">
            Kelola email dan password untuk login ke panel admin
            TailorJogja.com.
          </p>
        </div>

        <AccountManager currentEmail={user.email || ""} />
      </div>
    </main>
  );
}