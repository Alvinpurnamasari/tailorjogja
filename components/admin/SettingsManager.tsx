"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
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
  logo_url: string | null;
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
    logo_url: settings.logo_url ?? "",
  });

  const [selectedLogo, setSelectedLogo] =
    useState<File | null>(null);

  const [previewLogo, setPreviewLogo] = useState(
    settings.logo_url ?? ""
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ==========================================
  // PREVIEW LOGO
  // ==========================================
  useEffect(() => {
    if (!selectedLogo) {
      setPreviewLogo(form.logo_url);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedLogo);
    setPreviewLogo(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedLogo, form.logo_url]);

  // ==========================================
  // INPUT TEXT
  // ==========================================
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // PILIH LOGO
  // ==========================================
  const handleLogoChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // maksimal 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Gagal: ukuran logo maksimal 5 MB.");
      e.target.value = "";
      return;
    }

    setSelectedLogo(file);
    setMessage("");
  };

  // ==========================================
  // SIMPAN
  // ==========================================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      let logoUrl = form.logo_url;

      // ======================================
      // UPLOAD LOGO BARU
      // ======================================
      if (selectedLogo) {
        const extension =
          selectedLogo.name.split(".").pop()?.toLowerCase() || "png";

        const fileName = `logo-${Date.now()}.${extension}`;

        const { error: uploadError } =
          await supabase.storage
            .from("logo-images")
            .upload(fileName, selectedLogo, {
              cacheControl: "3600",
              upsert: false,
            });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } =
          supabase.storage
            .from("logo-images")
            .getPublicUrl(fileName);

        logoUrl = publicUrlData.publicUrl;
      }

      // ======================================
      // UPDATE SITE SETTINGS
      // ======================================
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
          logo_url: logoUrl,
        })
        .eq("id", settings.id);

      if (error) {
        throw error;
      }

      setForm((prev) => ({
        ...prev,
        logo_url: logoUrl,
      }));

      setPreviewLogo(logoUrl);
      setSelectedLogo(null);

      setMessage("Pengaturan website berhasil disimpan.");

      router.refresh();
    } catch (error: any) {
      setMessage(
        `Gagal menyimpan: ${
          error.message || "Terjadi kesalahan."
        }`
      );
    } finally {
      setLoading(false);
    }
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
      {/* ======================================
          LOGO WEBSITE
      ====================================== */}
      <div className="mb-8 border-b border-[#eee5d8] pb-8">
        <label className={labelClass}>
          Logo Website
        </label>

        <p className="mt-2 text-[13px] text-[#85776a]">
          Logo ini akan digunakan pada Navbar dan Footer website.
        </p>

        {/* PREVIEW */}
        <div className="mt-5 flex min-h-[150px] items-center justify-center border border-[#d9cdbb] bg-[#f8f5ef] p-6">
          {previewLogo ? (
            <img
              src={previewLogo}
              alt="Logo TailorJogja"
              className="max-h-[100px] max-w-[280px] object-contain"
            />
          ) : (
            <div className="text-center">
              <p className="text-sm font-semibold text-[#55493d]">
                Belum ada logo
              </p>

              <p className="mt-1 text-xs text-[#998b7d]">
                Pilih gambar logo di bawah.
              </p>
            </div>
          )}
        </div>

        {/* FILE INPUT */}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleLogoChange}
          className="mt-4 block w-full border border-[#d9cdbb] bg-white p-3 text-sm text-[#17130f]
                     file:mr-4 file:border-0 file:bg-[#15110d]
                     file:px-5 file:py-3 file:text-xs
                     file:font-semibold file:uppercase
                     file:tracking-[0.08em] file:text-white
                     hover:file:bg-[#d6a247]
                     hover:file:text-black"
        />

        <p className="mt-2 text-[12px] text-[#85776a]">
          Format JPG, PNG, atau WEBP. Disarankan PNG
          transparan. Maksimal 5 MB.
        </p>
      </div>

      {/* ======================================
          DATA WEBSITE
      ====================================== */}
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

      {/* MESSAGE */}
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

      {/* BUTTON */}
      <div className="mt-8 border-t border-[#eee5d8] pt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#15110d] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#d6a247] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Menyimpan..."
            : "Simpan Pengaturan"}
        </button>
      </div>
    </form>
  );
}