"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    await supabase.auth.signOut();

    localStorage.removeItem("tailorjogja-admin-last-activity");

    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="bg-[#17130f] px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-[#d29a43] hover:text-black disabled:opacity-50"
    >
      {loading ? "KELUAR..." : "LOGOUT"}
    </button>
  );
}