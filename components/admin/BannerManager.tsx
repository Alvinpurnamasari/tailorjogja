"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Hero = {
  id: number;
  badge: string | null;
  title: string | null;
  title_highlight: string | null;
  description: string | null;
  button_text: string | null;
  background_url: string | null;
};

export default function BannerManager({ hero }: { hero: Hero }) {
  const supabase = createClient();

  const [badge, setBadge] = useState(hero.badge ?? "");
  const [title, setTitle] = useState(hero.title ?? "");
  const [titleHighlight, setTitleHighlight] = useState(
    hero.title_highlight ?? ""
  );
  const [description, setDescription] = useState(hero.description ?? "");
  const [buttonText, setButtonText] = useState(hero.button_text ?? "");

  const [backgroundUrl, setBackgroundUrl] = useState(
    hero.background_url ?? ""
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      let finalBackgroundUrl = backgroundUrl;

      if (selectedFile) {
        const extension = selectedFile.name.split(".").pop();
        const fileName = `hero-${Date.now()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("banner-images")
          .upload(fileName, selectedFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from("banner-images")
          .getPublicUrl(fileName);

        finalBackgroundUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from("hero_section")
        .update({
          badge,
          title,
          title_highlight: titleHighlight,
          description,
          button_text: buttonText,
          background_url: finalBackgroundUrl || null,
        })
        .eq("id", hero.id);

      if (error) {
        throw error;
      }

      setBackgroundUrl(finalBackgroundUrl);
      setSelectedFile(null);

      setMessage("Banner berhasil diperbarui.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? `Gagal menyimpan: ${error.message}`
          : "Gagal menyimpan perubahan."
      );
    } finally {
      setLoading(false);
    }
  }

  const displayedImage = previewUrl || backgroundUrl;

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#4f4339]";

  const inputClass =
    "w-full border border-[#cfc1ae] bg-white px-4 py-3 text-[#17120e] " +
    "placeholder:text-[#9b9188] outline-none transition " +
    "focus:border-[#c8892f] focus:ring-1 focus:ring-[#c8892f]";

  return (
    <div className="max-w-5xl text-[#17120e]">
      {/* HEADER */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#c8892f]">
          Konten Website
        </p>

        <h1 className="font-serif text-4xl font-semibold text-[#17120e]">
          Banner / Hero
        </h1>

        <p className="mt-2 text-[#6f6257]">
          Atur konten utama yang tampil pada bagian atas website TailorJogja.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="border border-[#ded5c8] bg-white p-8 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">

          {/* BADGE */}
          <div className="md:col-span-2">
            <label className={labelClass}>Badge</label>

            <input
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* JUDUL */}
          <div>
            <label className={labelClass}>Judul</label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* HIGHLIGHT */}
          <div>
            <label className={labelClass}>Highlight Judul</label>

            <input
              value={titleHighlight}
              onChange={(e) => setTitleHighlight(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* DESKRIPSI */}
          <div className="md:col-span-2">
            <label className={labelClass}>Deskripsi</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* TOMBOL */}
          <div className="md:col-span-2">
            <label className={labelClass}>Teks Tombol</label>

            <input
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* BACKGROUND */}
          <div className="md:col-span-2">
            <label className={labelClass}>Gambar Background</label>

            {displayedImage && (
              <div className="mb-4 overflow-hidden border border-[#ded5c8] bg-[#f5f0e6]">
                <img
                  src={displayedImage}
                  alt="Preview banner"
                  className="h-72 w-full object-cover"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) =>
                setSelectedFile(e.target.files?.[0] ?? null)
              }
              className="
                block w-full
                border border-[#cfc1ae]
                bg-white
                p-3
                text-sm
                text-[#17120e]

                file:mr-4
                file:border-0
                file:bg-[#17120e]
                file:px-5
                file:py-2
                file:text-sm
                file:font-semibold
                file:text-white
                file:cursor-pointer

                hover:file:bg-[#c8892f]
              "
            />

            <p className="mt-2 text-sm text-[#75695f]">
              Format: JPG, PNG, atau WEBP.
            </p>
          </div>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mt-6 border px-4 py-3 text-sm font-medium ${
              message.startsWith("Gagal")
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* BUTTON */}
        <div className="mt-8 border-t border-[#eee5d9] pt-6">
          <button
            type="submit"
            disabled={loading}
            className="
              bg-[#17120e]
              px-7
              py-3
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-white
              transition
              hover:bg-[#c8892f]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}