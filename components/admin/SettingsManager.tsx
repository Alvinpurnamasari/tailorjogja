"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Settings = {
  id: number;
  whatsapp_number: string | null;
  phone_number: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  email: string | null;
  address: string | null;
};

export default function SettingsManager({
  settings,
}: {
  settings: Settings;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    whatsapp_number: settings.whatsapp_number ?? "",
    phone_number: settings.phone_number ?? "",
    instagram_url: settings.instagram_url ?? "",
    facebook_url: settings.facebook_url ?? "",
    tiktok_url: settings.tiktok_url ?? "",
    email: settings.email ?? "",
    address: settings.address ?? "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("site_settings")
      .update({
        whatsapp_number: form.whatsapp_number.trim(),
        phone_number: form.phone_number.trim(),
        instagram_url: form.instagram_url.trim(),
        facebook_url: form.facebook_url.trim(),
        tiktok_url: form.tiktok_url.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
      })
      .eq("id", settings.id);

    if (error) {
      setMessage(`Gagal menyimpan: ${error.message}`);
      setLoading(false);
      return;
    }

    setMessage("Pengaturan website berhasil disimpan.");
    setLoading(false);

    router.refresh();
  };

  const inputClass =
    "mt-2 w-full border border-[#d9cdbb] bg-white px-4 py-3 text-[#17130f] outline-none transition focus:border-[#d6a247]";

  const labelClass =
    "text-[13px] font-semibold uppercase tracking-[0.08em] text-[#55493d]";

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#dfd4c4] bg-white p-6 md:p-8"
    >
      <div className="grid gap-6 md:grid-cols-2">

        {/* WHATSAPP */}
        <div>
          <label className={labelClass}>
            Nomor WhatsApp
          </label>

          <input
            type="text"
            name="whatsapp_number"
            value={form.whatsapp_number}
            onChange={handleChange}
            placeholder="6285701111308"
            className={inputClass}
          />

          <p className="mt-2 text-[12px] text-[#85776a]">
            Gunakan format 62 tanpa tanda +.
          </p>
        </div>

        {/* PHONE */}
        <div>
          <label className={labelClass}>
            Nomor Telepon
          </label>

          <input
            type="text"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            placeholder="0857-0111-1308"
            className={inputClass}
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className={labelClass}>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="contoh@email.com"
            className={inputClass}
          />
        </div>

        {/* INSTAGRAM */}
        <div>
          <label className={labelClass}>
            Instagram
          </label>

          <input
            type="text"
            name="instagram_url"
            value={form.instagram_url}
            onChange={handleChange}
            placeholder="https://instagram.com/..."
            className={inputClass}
          />
        </div>

        {/* FACEBOOK */}
        <div>
          <label className={labelClass}>
            Facebook
          </label>

          <input
            type="text"
            name="facebook_url"
            value={form.facebook_url}
            onChange={handleChange}
            placeholder="https://facebook.com/..."
            className={inputClass}
          />
        </div>

        {/* TIKTOK */}
        <div>
          <label className={labelClass}>
            TikTok
          </label>

          <input
            type="text"
            name="tiktok_url"
            value={form.tiktok_url}
            onChange={handleChange}
            placeholder="https://tiktok.com/@..."
            className={inputClass}
          />
        </div>

        {/* ADDRESS */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            Alamat / Area Layanan
          </label>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={4}
            placeholder="Masukkan alamat atau area layanan TailorJogja..."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {message && (
        <div
          className={`mt-6 border px-4 py-3 text-[14px] ${
            message.startsWith("Gagal")
              ? "border-red-200 bg-red-50 text-red-600"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="mt-8 border-t border-[#eee5d8] pt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#15110d] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#d6a247] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
      </div>
    </form>
  );
}