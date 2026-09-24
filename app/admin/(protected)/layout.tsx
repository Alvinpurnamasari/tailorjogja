import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import AdminSidebar from "@/components/admin/AdminSidebar";
import LogoutButton from "@/components/admin/LogoutButton";
import AdminIdleLogout from "@/components/admin/AdminIdleLogout";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f5f0e6]">
      <AdminIdleLogout />

      <AdminSidebar />

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-[82px] items-center justify-between border-b border-[#ddd3c4] bg-[#f5f0e6]/95 px-8 backdrop-blur lg:px-10">
           <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#c9872a]">
              TAILORJOGJA
            </p>

            <p className="mt-1 text-sm text-[#6f6255]">
              Login sebagai {user.email}
            </p>
          </div>

          <LogoutButton />
        </header>

        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}