"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import { createClient } from "@/utils/supabase/client";

type Service = {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  button_text: string | null;
  sort_order: number | null;
};

type FormData = {
  title: string;
  description: string;
  button_text: string;
  sort_order: string;
};

const emptyForm: FormData = {
  title: "",
  description: "",
  button_text: "KONSULTASI SEKARANG",
  sort_order: "0",
};

export default function ServicesManager({
  initialServices,
}: {
  initialServices: Service[];
}) {
  const supabase = createClient();

  const [services, setServices] =
    useState<Service[]>(initialServices);

  const [form, setForm] =
    useState<FormData>(emptyForm);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  function handleChange(
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    const objectUrl =
      URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setSelectedFile(null);
    setPreviewUrl("");
    setErrorMessage("");
  }

  function handleEdit(service: Service) {
    setEditingId(service.id);

    setForm({
      title: service.title || "",
      description: service.description || "",
      button_text:
        service.button_text ||
        "KONSULTASI SEKARANG",
      sort_order:
        service.sort_order?.toString() || "0",
    });

    setPreviewUrl(service.image_url || "");
    setSelectedFile(null);

    setMessage("");
    setErrorMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function uploadImage() {
    if (!selectedFile) {
      return null;
    }

    const extension =
      selectedFile.name.split(".").pop();

    const fileName =
      `service-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${extension}`;

    const { error } =
      await supabase.storage
        .from("service-images")
        .upload(fileName, selectedFile, {
          cacheControl: "3600",
          upsert: false,
        });

    if (error) {
      throw error;
    }

    const { data } =
      supabase.storage
        .from("service-images")
        .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      let imageUrl = "";

      if (editingId) {
        const currentService =
          services.find(
            (item) => item.id === editingId
          );

        imageUrl =
          currentService?.image_url || "";
      }

      if (selectedFile) {
        const uploadedUrl =
          await uploadImage();

        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const payload = {
        title: form.title.trim(),
        description:
          form.description.trim(),
        button_text:
          form.button_text.trim(),
        sort_order:
          Number(form.sort_order) || 0,
        image_url: imageUrl || null,
      };

      if (!payload.title) {
        throw new Error(
          "Nama layanan wajib diisi."
        );
      }

      // =========================
      // EDIT
      // =========================

      if (editingId) {
        const { data, error } =
          await supabase
            .from("services")
            .update(payload)
            .eq("id", editingId)
            .select()
            .single();

        if (error) {
          throw error;
        }

        setServices((prev) =>
          prev
            .map((item) =>
              item.id === editingId
                ? data
                : item
            )
            .sort(
              (a, b) =>
                (a.sort_order || 0) -
                (b.sort_order || 0)
            )
        );

        setMessage(
          "Layanan berhasil diperbarui."
        );
      }

      // =========================
      // TAMBAH
      // =========================

      else {
        const { data, error } =
          await supabase
            .from("services")
            .insert(payload)
            .select()
            .single();

        if (error) {
          throw error;
        }

        setServices((prev) =>
          [...prev, data].sort(
            (a, b) =>
              (a.sort_order || 0) -
              (b.sort_order || 0)
          )
        );

        setMessage(
          "Layanan berhasil ditambahkan."
        );
      }

      resetForm();
    } catch (error: any) {
      setErrorMessage(
        error.message ||
          "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    service: Service
  ) {
    const confirmed =
      window.confirm(
        `Hapus layanan "${service.title}"?`
      );

    if (!confirmed) return;

    setMessage("");
    setErrorMessage("");

    try {
      const { error } =
        await supabase
          .from("services")
          .delete()
          .eq("id", service.id);

      if (error) {
        throw error;
      }

      setServices((prev) =>
        prev.filter(
          (item) =>
            item.id !== service.id
        )
      );

      if (editingId === service.id) {
        resetForm();
      }

      setMessage(
        "Layanan berhasil dihapus."
      );
    } catch (error: any) {
      setErrorMessage(
        error.message ||
          "Gagal menghapus layanan."
      );
    }
  }

  return (
    <div className="max-w-[1200px]">

      {/* HEADER */}

      <div className="mb-9">
        <p className="text-xs font-bold tracking-[0.22em] text-[#c98d2d]">
          KONTEN WEBSITE
        </p>

        <h1 className="mt-2 font-serif text-4xl text-[#17130f]">
          Layanan
        </h1>

        <p className="mt-2 text-[#76695d]">
          Tambah, edit, dan hapus layanan
          TailorJogja.
        </p>
      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="mb-10 border border-[#ddd1bf] bg-white p-8"
      >
        <div className="mb-7 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[#17130f]">
            {editingId
              ? "Edit Layanan"
              : "Tambah Layanan"}
          </h2>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm font-semibold text-[#8a7969] hover:text-black"
            >
              BATAL EDIT
            </button>
          )}
        </div>

        <div className="space-y-6">

          {/* TITLE */}

          <div>
            <label className="mb-2 block font-semibold text-[#2a2119]">
              Nama Layanan
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Contoh: Jas Custom"
              className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none placeholder:text-gray-400 focus:border-[#c98d2d]"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="mb-2 block font-semibold text-[#2a2119]">
              Deskripsi
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Masukkan deskripsi layanan..."
              className="w-full resize-none border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none placeholder:text-gray-400 focus:border-[#c98d2d]"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* BUTTON TEXT */}

            <div>
              <label className="mb-2 block font-semibold text-[#2a2119]">
                Teks Tombol
              </label>

              <input
                type="text"
                name="button_text"
                value={form.button_text}
                onChange={handleChange}
                className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none focus:border-[#c98d2d]"
              />
            </div>

            {/* SORT ORDER */}

            <div>
              <label className="mb-2 block font-semibold text-[#2a2119]">
                Urutan Tampil
              </label>

              <input
                type="number"
                name="sort_order"
                value={form.sort_order}
                onChange={handleChange}
                min="0"
                className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none focus:border-[#c98d2d]"
              />
            </div>

          </div>

          {/* IMAGE */}

          <div>
            <label className="mb-3 block font-semibold text-[#2a2119]">
              Gambar Layanan
            </label>

            {previewUrl && (
              <div className="mb-5 max-w-[500px] overflow-hidden border border-[#ddd1bf]">
                <img
                  src={previewUrl}
                  alt="Preview layanan"
                  className="h-[280px] w-full object-cover"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="block w-full border border-[#d8cbb9] bg-white p-3 text-[#17130f]
              file:mr-4 file:border-0 file:bg-[#0d0b08] file:px-5 file:py-3
              file:text-xs file:font-bold file:text-white
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

          {/* SUBMIT */}

          <div className="border-t border-[#e5dacb] pt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0d0b08] px-8 py-4 text-xs font-bold tracking-[0.15em] text-white transition hover:bg-[#c98d2d] hover:text-black disabled:opacity-50"
            >
              {loading
                ? "MENYIMPAN..."
                : editingId
                ? "SIMPAN PERUBAHAN"
                : "TAMBAH LAYANAN"}
            </button>
          </div>

        </div>
      </form>

      {/* =========================
          DAFTAR LAYANAN
      ========================= */}

      <div>
        <div className="mb-5">
          <p className="text-xs font-bold tracking-[0.22em] text-[#c98d2d]">
            DAFTAR
          </p>

          <h2 className="mt-2 font-serif text-3xl text-[#17130f]">
            Layanan Saat Ini
          </h2>
        </div>

        {services.length === 0 ? (
          <div className="border border-[#ddd1bf] bg-white p-8 text-[#76695d]">
            Belum ada layanan.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">

            {services.map((service) => (
              <div
                key={service.id}
                className="overflow-hidden border border-[#ddd1bf] bg-white"
              >

                {/* IMAGE */}

                <div className="h-[240px] bg-[#eee8df]">
                  {service.image_url ? (
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#8a7969]">
                      Belum ada gambar
                    </div>
                  )}
                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <div className="mb-2 flex items-start justify-between gap-4">

                    <h3 className="font-serif text-2xl text-[#17130f]">
                      {service.title}
                    </h3>

                    <span className="border border-[#ddd1bf] px-3 py-1 text-xs text-[#76695d]">
                      #{service.sort_order ?? 0}
                    </span>

                  </div>

                  <p className="min-h-[72px] text-sm leading-6 text-[#76695d]">
                    {service.description ||
                      "Belum ada deskripsi."}
                  </p>

                  <p className="mt-4 text-xs font-semibold tracking-[0.1em] text-[#c98d2d]">
                    {service.button_text ||
                      "KONSULTASI SEKARANG"}
                  </p>

                  {/* ACTION */}

                  <div className="mt-6 flex gap-3 border-t border-[#eee5d9] pt-5">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(service)
                      }
                      className="bg-[#0d0b08] px-5 py-3 text-xs font-bold tracking-[0.1em] text-white transition hover:bg-[#c98d2d] hover:text-black"
                    >
                      EDIT
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(service)
                      }
                      className="border border-red-300 px-5 py-3 text-xs font-bold tracking-[0.1em] text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                      HAPUS
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}