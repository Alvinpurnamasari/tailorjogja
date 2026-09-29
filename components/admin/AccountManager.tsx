"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type AccountManagerProps = {
  currentEmail: string;
};

export default function AccountManager({
  currentEmail,
}: AccountManagerProps) {
  const router = useRouter();
  const supabase = createClient();

  // =========================
  // EMAIL
  // =========================
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  // =========================
  // PASSWORD
  // =========================
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordLoading, setPasswordLoading] =
    useState(false);

  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  // =========================
  // UPDATE EMAIL
  // =========================
  const handleUpdateEmail = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setEmailMessage("");
    setEmailError("");

    const email = newEmail.trim().toLowerCase();

    if (!email) {
      setEmailError("Email baru wajib diisi.");
      return;
    }

    if (email === currentEmail.toLowerCase()) {
      setEmailError(
        "Email baru masih sama dengan email saat ini."
      );
      return;
    }

    setEmailLoading(true);

    try {
      const response = await fetch("/api/admin/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update-email",
          email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setEmailError(
          result?.error ||
            "Gagal mengubah email admin."
        );
        return;
      }

      setEmailMessage(
        "Email admin berhasil diubah. Anda akan diarahkan ke halaman login."
      );

      setNewEmail(email);

      // Logout karena email login sudah berubah
      setTimeout(async () => {
        await supabase.auth.signOut();

        router.replace("/admin/login");
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengubah email:",
        error
      );

      setEmailError(
        "Terjadi kesalahan saat mengubah email."
      );
    } finally {
      setEmailLoading(false);
    }
  };

  // =========================
  // UPDATE PASSWORD
  // =========================
  const handleUpdatePassword = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError(
        "Password saat ini wajib diisi."
      );
      return;
    }

    if (!newPassword) {
      setPasswordError(
        "Password baru wajib diisi."
      );
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(
        "Password baru minimal 6 karakter."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        "Konfirmasi password baru tidak sama."
      );
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError(
        "Password baru harus berbeda dari password saat ini."
      );
      return;
    }

    setPasswordLoading(true);

    try {
      // =========================
      // AMBIL USER LOGIN
      // =========================
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        setPasswordError(
          "Sesi login tidak ditemukan. Silakan login kembali."
        );
        return;
      }

      // =========================
      // VERIFIKASI PASSWORD LAMA
      // =========================
      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: user.email,
          password: currentPassword,
        });

      if (signInError) {
        setPasswordError(
          "Password saat ini salah."
        );
        return;
      }

      // =========================
      // UPDATE PASSWORD BARU
      // =========================
      const { error: updateError } =
        await supabase.auth.updateUser({
          password: newPassword,
        });

      if (updateError) {
        setPasswordError(updateError.message);
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setPasswordMessage(
        "Password berhasil diubah."
      );
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengubah password:",
        error
      );

      setPasswordError(
        "Terjadi kesalahan saat mengubah password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* =========================
          EMAIL
      ========================= */}
      <section className="border border-[#ded5c5] bg-white p-7 md:p-8">
        <div className="border-b border-[#eee7dc] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c88c2d]">
            Email Login
          </p>

          <h2 className="mt-2 font-serif text-2xl text-[#17130f]">
            Ubah Email Admin
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#746b60]">
            Email ini digunakan untuk login ke panel admin.
          </p>
        </div>

        <form
          onSubmit={handleUpdateEmail}
          className="mt-7"
        >
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#17130f]">
            Email Saat Ini
          </label>

          <input
            type="email"
            value={currentEmail}
            disabled
            className="mt-3 w-full border border-[#ded5c5] bg-[#f7f3eb] px-4 py-4 text-sm text-[#17130f] outline-none disabled:opacity-100"
          />

          <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.12em] text-[#17130f]">
            Email Baru
          </label>

          <input
            type="email"
            value={newEmail}
            onChange={(e) =>
              setNewEmail(e.target.value)
            }
            placeholder="Masukkan email baru"
            autoComplete="email"
            className="mt-3 w-full border border-[#ded5c5] bg-white px-4 py-4 text-sm text-[#17130f] placeholder:text-[#a59c91] outline-none transition focus:border-[#c88c2d]"
          />

          {emailError && (
            <div className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {emailError}
            </div>
          )}

          {emailMessage && (
            <div className="mt-5 border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
              {emailMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={emailLoading}
            className="mt-6 bg-[#17130f] px-7 py-4 text-xs font-bold tracking-[0.1em] text-white transition hover:bg-[#c88c2d] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {emailLoading
              ? "MENYIMPAN..."
              : "UBAH EMAIL"}
          </button>
        </form>
      </section>

      {/* =========================
          PASSWORD
      ========================= */}
      <section className="border border-[#ded5c5] bg-white p-7 md:p-8">
        <div className="border-b border-[#eee7dc] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c88c2d]">
            Keamanan
          </p>

          <h2 className="mt-2 font-serif text-2xl text-[#17130f]">
            Ubah Password
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#746b60]">
            Masukkan password saat ini sebelum membuat
            password login yang baru.
          </p>
        </div>

        <form
          onSubmit={handleUpdatePassword}
          className="mt-7"
        >
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#17130f]">
            Password Saat Ini
          </label>

          <input
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            placeholder="Masukkan password saat ini"
            autoComplete="current-password"
            className="mt-3 w-full border border-[#ded5c5] bg-white px-4 py-4 text-sm text-[#17130f] placeholder:text-[#a59c91] outline-none transition focus:border-[#c88c2d]"
          />

          <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.12em] text-[#17130f]">
            Password Baru
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            placeholder="Minimal 6 karakter"
            autoComplete="new-password"
            className="mt-3 w-full border border-[#ded5c5] bg-white px-4 py-4 text-sm text-[#17130f] placeholder:text-[#a59c91] outline-none transition focus:border-[#c88c2d]"
          />

          <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.12em] text-[#17130f]">
            Konfirmasi Password Baru
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="Ulangi password baru"
            autoComplete="new-password"
            className="mt-3 w-full border border-[#ded5c5] bg-white px-4 py-4 text-sm text-[#17130f] placeholder:text-[#a59c91] outline-none transition focus:border-[#c88c2d]"
          />

          {passwordError && (
            <div className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {passwordError}
            </div>
          )}

          {passwordMessage && (
            <div className="mt-5 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {passwordMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={passwordLoading}
            className="mt-6 bg-[#17130f] px-7 py-4 text-xs font-bold tracking-[0.1em] text-white transition hover:bg-[#c88c2d] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {passwordLoading
              ? "MENYIMPAN..."
              : "UBAH PASSWORD"}
          </button>
        </form>
      </section>
    </div>
  );
}