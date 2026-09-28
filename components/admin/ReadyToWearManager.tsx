"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import { createClient } from "@/utils/supabase/client";

type ReadyToWearItem = {
  id: number;
  title: string;
  category: string;
  description: string | null;
  price: string | null;
  sizes: string | null;
  image_url: string | null;
  sort_order: number | null;
};

type FormData = {
  title: string;
  category: string;
  description: string;
  price: string;
  sizes: string;
  sort_order: string;
};

const emptyForm: FormData = {
  title: "",
  category: "",
  description: "",
  price: "",
  sizes: "",
  sort_order: "0",
};

export default function ReadyToWearManager({
  initialItems,
}: {
  initialItems: ReadyToWearItem[];
}) {
  const supabase = createClient();

  const [items, setItems] =
    useState<ReadyToWearItem[]>(initialItems);

  const [form, setForm] =
    useState<FormData>(emptyForm);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [editingItem, setEditingItem] =
    useState<ReadyToWearItem | null>(null);

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

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);
  }

  function resetForm() {
    setForm(emptyForm);
    setSelectedFile(null);
    setPreviewUrl("");
    setEditingItem(null);
  }

  async function refreshItems() {
    const { data, error } = await supabase
      .from("ready_to_wear")
      .select("*")
      .order("sort_order", {
        ascending: true,
      })
      .order("id", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    setItems(data || []);
  }

  // ==========================
  // TAMBAH / UPDATE
  // ==========================
  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      if (!form.title.trim()) {
        throw new Error(
          "Judul produk wajib diisi."
        );
      }

      if (!form.category.trim()) {
        throw new Error(
          "Kategori wajib diisi."
        );
      }

      let imageUrl =
        editingItem?.image_url || "";

      // ==========================
      // UPLOAD GAMBAR
      // ==========================
      if (selectedFile) {
        const extension =
          selectedFile.name
            .split(".")
            .pop() || "jpg";

        const fileName =
          `ready-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}.${extension}`;

        const { error: uploadError } =
          await supabase.storage
            .from("ready-to-wear-images")
            .upload(
              fileName,
              selectedFile,
              {
                cacheControl: "3600",
                upsert: false,
              }
            );

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } =
          supabase.storage
            .from("ready-to-wear-images")
            .getPublicUrl(fileName);

        imageUrl =
          publicUrlData.publicUrl;
      }

      const payload = {
        title: form.title.trim(),
        category:
          form.category
            .trim()
            .toUpperCase(),

        description:
          form.description.trim(),

        price:
          form.price.trim(),

        sizes:
          form.sizes.trim(),

        image_url:
          imageUrl || null,

        sort_order:
          Number(form.sort_order) || 0,
      };

      // ==========================
      // EDIT
      // ==========================
      if (editingItem) {
        const { error } =
          await supabase
            .from("ready_to_wear")
            .update(payload)
            .eq(
              "id",
              editingItem.id
            );

        if (error) {
          throw error;
        }

        setMessage(
          "Produk Ready to Wear berhasil diperbarui."
        );
      }

      // ==========================
      // TAMBAH
      // ==========================
      else {
        const { error } =
          await supabase
            .from("ready_to_wear")
            .insert(payload);

        if (error) {
          throw error;
        }

        setMessage(
          "Produk Ready to Wear berhasil ditambahkan."
        );
      }

      resetForm();
      await refreshItems();
    } catch (error: any) {
      setErrorMessage(
        error.message ||
          "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // EDIT
  // ==========================
  function handleEdit(
    item: ReadyToWearItem
  ) {
    setEditingItem(item);

    setForm({
      title: item.title || "",
      category: item.category || "",
      description:
        item.description || "",
      price: item.price || "",
      sizes: item.sizes || "",
      sort_order:
        String(
          item.sort_order ?? 0
        ),
    });

    setPreviewUrl(
      item.image_url || ""
    );

    setSelectedFile(null);

    setMessage("");
    setErrorMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ==========================
  // HAPUS
  // ==========================
  async function handleDelete(
    item: ReadyToWearItem
  ) {
    const confirmed =
      window.confirm(
        `Hapus produk "${item.title}"?`
      );

    if (!confirmed) return;

    setMessage("");
    setErrorMessage("");

    try {
      const { error } =
        await supabase
          .from("ready_to_wear")
          .delete()
          .eq("id", item.id);

      if (error) {
        throw error;
      }

      // HAPUS GAMBAR STORAGE
      if (
        item.image_url &&
        item.image_url.includes(
          "/ready-to-wear-images/"
        )
      ) {
        const parts =
          item.image_url.split(
            "/ready-to-wear-images/"
          );

        const filePath =
          parts[1];

        if (filePath) {
          await supabase.storage
            .from(
              "ready-to-wear-images"
            )
            .remove([
              decodeURIComponent(
                filePath
              ),
            ]);
        }
      }

      setMessage(
        "Produk Ready to Wear berhasil dihapus."
      );

      await refreshItems();
    } catch (error: any) {
      setErrorMessage(
        error.message ||
          "Gagal menghapus produk."
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
          Ready to Wear
        </h1>

        <p className="mt-2 text-[#76695d]">
          Kelola produk Ready to Wear
          TailorJogja.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mb-12 border border-[#ddd1bf] bg-white p-8"
      >
        <h2 className="mb-7 font-serif text-3xl text-[#17130f]">
          {editingItem
            ? "Edit Produk"
            : "Tambah Produk"}
        </h2>

        <div className="space-y-6">
          {/* JUDUL */}
          <Field
            label="Nama Produk"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Contoh: The Arjuna Blazer"
          />

          {/* CATEGORY & PRICE */}
          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Kategori"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Contoh: BLAZER"
            />

            <Field
              label="Harga"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Contoh: Rp850.000"
            />
          </div>

          {/* SIZE & ORDER */}
          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Ukuran"
              name="sizes"
              value={form.sizes}
              onChange={handleChange}
              placeholder="Contoh: S • M • L • XL"
            />

            <Field
              label="Urutan Tampil"
              name="sort_order"
              value={form.sort_order}
              onChange={handleChange}
              placeholder="Contoh: 1"
              type="number"
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
              placeholder="Masukkan deskripsi produk..."
              className="w-full border border-[#d8cbb8] bg-white px-4 py-4 text-[#17130f] outline-none placeholder:text-gray-400 focus:border-[#d6a24e]"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="mb-3 block font-semibold text-[#2a2119]">
              Gambar Produk
            </label>

            {previewUrl && (
              <div className="mb-5 max-w-[350px] overflow-hidden border border-[#ddd1bf]">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-[400px] w-full object-cover"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="block w-full border border-[#d8cbb9] p-3 text-[#17130f]"
            />

            <p className="mt-2 text-sm text-[#76695d]">
              Format: JPG, PNG, atau WEBP.
            </p>
          </div>

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

          {/* BUTTON */}
          <div className="flex flex-wrap gap-3 border-t border-[#e5dacb] pt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0d0b08] px-8 py-4 text-xs font-bold tracking-[0.15em] text-white transition hover:bg-[#c98d2d] hover:text-black disabled:opacity-50"
            >
              {loading
                ? "MENYIMPAN..."
                : editingItem
                ? "SIMPAN PERUBAHAN"
                : "TAMBAH PRODUK"}
            </button>

            {editingItem && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-[#0d0b08] px-8 py-4 text-xs font-bold tracking-[0.15em] text-[#0d0b08] transition hover:bg-[#eee5d5]"
              >
                BATAL EDIT
              </button>
            )}
          </div>
        </div>
      </form>

      {/* DAFTAR */}
      <div>
        <p className="text-xs font-bold tracking-[0.22em] text-[#c98d2d]">
          DAFTAR
        </p>

        <h2 className="mb-7 mt-2 font-serif text-3xl text-[#17130f]">
          Daftar Ready to Wear
        </h2>

        {items.length === 0 ? (
          <div className="border border-[#ddd1bf] bg-white p-8 text-[#76695d]">
            Belum ada produk Ready to Wear.
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="grid gap-6 border border-[#ddd1bf] bg-white p-6 md:grid-cols-[130px_1fr_auto] md:items-center"
              >
                {/* IMAGE */}
                <div className="h-[150px] overflow-hidden bg-[#eee5d5]">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-3 text-center text-xs text-[#76695d]">
                      Tidak ada gambar
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-[#c98d2d]">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="border border-[#ddd1bf] px-3 py-1 text-xs text-[#76695d]">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#17130f]">
                    {item.title}
                  </h3>

                  {item.sizes && (
                    <p className="mt-2 text-sm text-[#76695d]">
                      Ukuran: {item.sizes}
                    </p>
                  )}

                  <p className="mt-2 font-medium text-[#17130f]">
                    {item.price ||
                      "Hubungi untuk harga"}
                  </p>

                  {item.description && (
                    <p className="mt-2 max-w-[650px] text-sm leading-6 text-[#76695d]">
                      {item.description}
                    </p>
                  )}

                  <p className="mt-3 text-xs text-[#9a8d7e]">
                    Urutan tampil:{" "}
                    {item.sort_order ?? 0}
                  </p>
                </div>

                {/* ACTION */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(item)
                    }
                    className="bg-[#d6a247] px-6 py-3 text-xs font-bold tracking-[0.1em] text-black"
                  >
                    EDIT
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item)
                    }
                    className="bg-[#0d0b08] px-6 py-3 text-xs font-bold tracking-[0.1em] text-white"
                  >
                    HAPUS
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block font-semibold text-[#2a2119]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none placeholder:text-gray-400 focus:border-[#c98d2d]"
      />
    </div>
  );
}