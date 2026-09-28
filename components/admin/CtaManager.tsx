"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type CTAData = {
  id: number;
  badge: string | null;
  title: string | null;
  title_highlight: string | null;
  description: string | null;
  button_text: string | null;
  background_url: string | null;
};

export default function CtaManager({
  initialData,
}: {
  initialData: CTAData | null;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [badge, setBadge] = useState(initialData?.badge ?? "");
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [titleHighlight, setTitleHighlight] = useState(
    initialData?.title_highlight ?? ""
  );
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [buttonText, setButtonText] = useState(
    initialData?.button_text ?? ""
  );

  const [backgroundUrl, setBackgroundUrl] = useState(
    initialData?.background_url ?? ""
  );

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

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

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    let finalBackgroundUrl = backgroundUrl;

    // UPLOAD GAMBAR BARU
    if (selectedFile) {
      const extension =
        selectedFile.name.split(".").pop() || "jpg";

      const fileName = `cta-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("cta-images")
        .upload(fileName, selectedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        setMessage(
          `Gagal upload gambar: ${uploadError.message}`
        );
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("cta-images")
        .getPublicUrl(fileName);

      finalBackgroundUrl = publicUrlData.publicUrl;
    }

    const payload = {
      badge: badge.trim(),
      title: title.trim(),
      title_highlight: titleHighlight.trim(),
      description: description.trim(),
      button_text: buttonText.trim(),
      background_url: finalBackgroundUrl,
    };

    let error;

    if (initialData?.id) {
      const result = await supabase
        .from("cta_section")
        .update(payload)
        .eq("id", initialData.id);

      error = result.error;
    } else {
      const result = await supabase
        .from("cta_section")
        .insert(payload);

      error = result.error;
    }

    if (error) {
      setMessage(`Gagal menyimpan CTA: ${error.message}`);
      setLoading(false);
      return;
    }

    setBackgroundUrl(finalBackgroundUrl);
    setSelectedFile(null);
    setMessage("CTA berhasil disimpan.");
    setLoading(false);

    router.refresh();
  };

  return (
    <div className="border border-[#ded3c3] bg-white p-8 lg:p-10">
      <h2 className="font-serif text-[30px] text-[#11100d]">
        Edit CTA
      </h2>

      <p className="mt-2 text-[14px] text-[#756554]">
        Atur konten CTA yang tampil pada landing page.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        {/* BADGE */}
        <div>
          <label className="mb-2 block font-semibold text-[#11100d]">
            Badge
          </label>

          <input
            type="text"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="w-full border border-[#ded3c3] px-4 py-4 text-[#11100d] outline-none focus:border-[#d6a247]"
          />
        </div>

        {/* TITLE */}
        <div>
          <label className="mb-2 block font-semibold text-[#11100d]">
            Judul
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-[#ded3c3] px-4 py-4 text-[#11100d] outline-none focus:border-[#d6a247]"
          />
        </div>

        {/* HIGHLIGHT */}
        <div>
          <label className="mb-2 block font-semibold text-[#11100d]">
            Judul Highlight
          </label>

          <input
            type="text"
            value={titleHighlight}
            onChange={(e) =>
              setTitleHighlight(e.target.value)
            }
            className="w-full border border-[#ded3c3] px-4 py-4 text-[#11100d] outline-none focus:border-[#d6a247]"
          />

          <p className="mt-2 text-[12px] text-[#756554]">
            Bagian ini akan tampil berwarna emas dan italic.
          </p>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="mb-2 block font-semibold text-[#11100d]">
            Deskripsi
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full resize-none border border-[#ded3c3] px-4 py-4 text-[#11100d] outline-none focus:border-[#d6a247]"
          />
        </div>

        {/* BUTTON */}
        <div>
          <label className="mb-2 block font-semibold text-[#11100d]">
            Teks Tombol
          </label>

          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full border border-[#ded3c3] px-4 py-4 text-[#11100d] outline-none focus:border-[#d6a247]"
          />
        </div>

        {/* BACKGROUND */}
        <div>
          <label className="mb-2 block font-semibold text-[#11100d]">
            Background CTA
          </label>

          {(previewUrl || backgroundUrl) && (
            <div className="mb-4 overflow-hidden border border-[#ded3c3]">
              <img
                src={previewUrl || backgroundUrl}
                alt="Preview CTA"
                className="h-[280px] w-full object-cover"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-[#ded3c3] p-4 text-[#11100d]"
          />

          <p className="mt-2 text-[12px] text-[#756554]">
            Kosongkan jika tidak ingin mengganti gambar.
          </p>
        </div>

        {message && (
          <p className="text-[14px] text-[#756554]">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#11100d] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#d69a32] hover:text-black disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}