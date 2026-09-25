"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type AboutData = {
  id: number;
  section_label: string;
  title: string;
  title_highlight: string;
  description: string;
  image_url: string;
  image_number: string;
  image_label: string;
  checklist_1: string;
  checklist_2: string;
  checklist_3: string;
  checklist_4: string;
  checklist_5: string;
  checklist_6: string;
  button_text: string;
};

export default function AboutManager({
  initialData,
}: {
  initialData: AboutData;
}) {
  const supabase = createClient();

  const [form, setForm] = useState<AboutData>(initialData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(
    initialData.image_url || ""
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      let imageUrl = form.image_url;

      // =========================
      // UPLOAD GAMBAR
      // =========================
      if (selectedFile) {
        const extension = selectedFile.name.split(".").pop();

        const fileName = `about-${Date.now()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("about-images")
          .upload(fileName, selectedFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("about-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      // =========================
      // UPDATE DATABASE
      // =========================
      const { error } = await supabase
        .from("about_section")
        .update({
          section_label: form.section_label,
          title: form.title,
          title_highlight: form.title_highlight,
          description: form.description,

          image_url: imageUrl,

          image_number: form.image_number,
          image_label: form.image_label,

          checklist_1: form.checklist_1,
          checklist_2: form.checklist_2,
          checklist_3: form.checklist_3,
          checklist_4: form.checklist_4,
          checklist_5: form.checklist_5,
          checklist_6: form.checklist_6,

          button_text: form.button_text,
        })
        .eq("id", form.id);

      if (error) {
        throw error;
      }

      setForm((prev) => ({
        ...prev,
        image_url: imageUrl,
      }));

      setPreviewUrl(imageUrl);
      setSelectedFile(null);

      setMessage("Bagian Tentang berhasil diperbarui.");
    } catch (error: any) {
      setErrorMessage(error.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-[1100px]">
      {/* HEADER */}
      <div className="mb-9">
        <p className="text-xs font-bold tracking-[0.22em] text-[#c98d2d]">
          KONTEN WEBSITE
        </p>

        <h1 className="mt-2 font-serif text-4xl text-[#17130f]">
          Tentang
        </h1>

        <p className="mt-2 text-[#76695d]">
          Atur konten bagian Tentang pada website TailorJogja.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="border border-[#ddd1bf] bg-white p-8"
      >
        <div className="space-y-7">
          <Field
            label="Label"
            name="section_label"
            value={form.section_label}
            onChange={handleChange}
          />

          <Field
            label="Judul"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <Field
            label="Highlight Judul"
            name="title_highlight"
            value={form.title_highlight}
            onChange={handleChange}
          />

          {/* DESCRIPTION */}
          <div>
            <label className="mb-2 block font-semibold text-[#2a2119]">
              Deskripsi
            </label>

            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              rows={5}
              className="w-full border border-[#d8cbb8] bg-white px-4 py-4 text-[#17130f] outline-none placeholder:text-gray-400 focus:border-[#d6a24e]"
            />
          </div>

          {/* IMAGE LABEL */}
          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Nomor Gambar"
              name="image_number"
              value={form.image_number}
              onChange={handleChange}
            />

            <Field
              label="Label Gambar"
              name="image_label"
              value={form.image_label}
              onChange={handleChange}
            />
          </div>

          {/* CHECKLIST */}
          <div>
            <h2 className="mb-4 font-serif text-2xl text-[#17130f]">
              Checklist
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4, 5, 6].map((number) => {
                const name =
                  `checklist_${number}` as keyof AboutData;

                return (
                  <div key={number}>
                    <label className="mb-2 block text-sm font-semibold text-[#2a2119]">
                      Checklist {number}
                    </label>

                    <input
                        type="text"
                        name={name}
                        value={(form[name] as string) || ""}
                        onChange={handleChange}
                        className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none transition focus:border-[#c98d2d]"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <Field
            label="Teks Tombol"
            name="button_text"
            value={form.button_text}
            onChange={handleChange}
          />

          {/* IMAGE */}
          <div>
            <label className="mb-3 block font-semibold text-[#2a2119]">
              Gambar Tentang
            </label>

            {previewUrl && (
              <div className="mb-5 overflow-hidden border border-[#ddd1bf]">
                <img
                  src={previewUrl}
                  alt="Preview Tentang"
                  className="h-[350px] w-full object-cover"
                />
              </div>
            )}

            <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="block w-full border border-[#d8cbb9] bg-white p-3 text-[#17130f]
                        file:mr-4 file:border-0 file:bg-[#0d0b08] file:px-5 file:py-3
                        file:text-xs file:font-bold file:tracking-[0.08em] file:text-white
                        hover:file:bg-[#c98d2d] hover:file:text-black"
            />

            <p className="mt-2 text-sm text-[#76695d]">
              Format: JPG, PNG, atau WEBP.
            </p>
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="border border-green-200 bg-green-50 px-4 py-4 text-green-700">
              {message}
            </div>
          )}

          {errorMessage && (
            <div className="border border-red-200 bg-red-50 px-4 py-4 text-red-600">
              {errorMessage}
            </div>
          )}

          <div className="border-t border-[#e5dacb] pt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0d0b08] px-8 py-4 text-xs font-bold tracking-[0.15em] text-white transition hover:bg-[#c98d2d] hover:text-black disabled:opacity-50"
            >
              {loading ? "MENYIMPAN..." : "SIMPAN PERUBAHAN"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div>
      <label className="mb-2 block font-semibold text-[#2a2119]">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none transition focus:border-[#c98d2d]"
        />
    </div>
  );
}