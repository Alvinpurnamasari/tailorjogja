"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const IDLE_TIME = 30 * 60 * 1000;
const STORAGE_KEY = "tailorjogja-admin-last-activity";

export default function AdminIdleLogout() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    let lastRecordedActivity = Date.now();

    const logout = async () => {
      await supabase.auth.signOut();
      localStorage.removeItem(STORAGE_KEY);

      router.replace("/admin/login");
      router.refresh();
    };

    const updateActivity = () => {
      const now = Date.now();

      // Jangan menulis localStorage terlalu sering.
      if (now - lastRecordedActivity >= 1000) {
        localStorage.setItem(STORAGE_KEY, now.toString());
        lastRecordedActivity = now;
      }
    };

    const checkIdle = () => {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
        return;
      }

      const lastActivity = Number(stored);

      if (
        Number.isNaN(lastActivity) ||
        Date.now() - lastActivity >= IDLE_TIME
      ) {
        logout();
      }
    };

    checkIdle();

    const events = ["mousedown", "keydown", "scroll", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    const interval = window.setInterval(checkIdle, 60 * 1000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });

      window.clearInterval(interval);
    };
  }, [router]);

  return null;
}