"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Collection = {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string | null;
  sort_order: number;
};

export default function CollectionsManager({
  initialData,
}: {
  initialData: Collection[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setCategory("");
    setDescription("");
    setSortOrder(0);
    setSelectedFile(null);
    setPreviewUrl("");
  }

  function handleFileChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  }

  function handleEdit(item: Collection) {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category || "");
    setDescription(item.description || "");
    setSortOrder(item.sort_order);
    setPreviewUrl(item.image_url || "");
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
      selectedFile.name.split(".").pop() || "jpg";

    const fileName =
      `collection-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}.${extension}`;

    const { error } = await supabase.storage
      .from("collection-images")
      .upload(fileName, selectedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("collection-images")
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
      if (!title.trim()) {
        throw new Error("Judul koleksi wajib diisi.");
      }

      let imageUrl: string | null = null;

      if (editingId) {
        const currentItem = initialData.find(
          (item) => item.id === editingId
        );

        imageUrl = currentItem?.image_url || null;
      }

      // Upload gambar baru jika dipilih
      if (selectedFile) {
        imageUrl = await uploadImage();
      }

      if (editingId) {
        const { error } = await supabase
          .from("collections")
          .update({
            title,
            category,
            description,
            image_url: imageUrl,
            sort_order: sortOrder,
          })
          .eq("id", editingId);

        if (error) throw error;

        setMessage("Koleksi berhasil diperbarui.");
      } else {
        const { error } = await supabase
          .from("collections")
          .insert({
            title,
            category,
            description,
            image_url: imageUrl,
            sort_order: sortOrder,
          });

        if (error) throw error;

        setMessage("Koleksi berhasil ditambahkan.");
      }

      resetForm();
      router.refresh();
    } catch (error: any) {
      setErrorMessage(
        error.message || "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Yakin ingin menghapus koleksi ini?"
    );

    if (!confirmed) return;

    setMessage("");
    setErrorMessage("");

    const { error } = await supabase
      .from("collections")
      .delete()
      .eq("id", id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    setMessage("Koleksi berhasil dihapus.");
    router.refresh();
  }

  return (
    <div className="max-w-[1200px]">
      {/* HEADER */}
      <div className="mb-9">
        <p className="text-xs font-bold tracking-[0.22em] text-[#c98d2d]">
          KONTEN WEBSITE
        </p>

        <h1 className="mt-2 font-serif text-4xl text-[#17130f]">
          Koleksi
        </h1>

        <p className="mt-2 text-[#76695d]">
          Kelola koleksi pakaian TailorJogja.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mb-12 border border-[#ddd1bf] bg-white p-8"
      >
        <h2 className="mb-7 font-serif text-2xl text-[#17130f]">
          {editingId ? "Edit Koleksi" : "Tambah Koleksi"}
        </h2>

        <div className="space-y-6">
          {/* TITLE */}
          <div>
            <label className="mb-2 block font-semibold text-[#2a2119]">
              Judul
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Jas Custom"
              className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none placeholder:text-gray-400 focus:border-[#c98d2d]"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="mb-2 block font-semibold text-[#2a2119]">
              Kategori
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Contoh: CUSTOM"
              className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none placeholder:text-gray-400 focus:border-[#c98d2d]"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="mb-2 block font-semibold text-[#2a2119]">
              Deskripsi
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={4}
              placeholder="Masukkan deskripsi koleksi..."
              className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none placeholder:text-gray-400 focus:border-[#c98d2d]"
            />
          </div>

          {/* SORT */}
          <div>
            <label className="mb-2 block font-semibold text-[#2a2119]">
              Urutan Tampil
            </label>

            <input
              type="number"
              min="0"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(Number(e.target.value))
              }
              className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none focus:border-[#c98d2d]"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="mb-3 block font-semibold text-[#2a2119]">
              Gambar Koleksi
            </label>

            {previewUrl && (
              <div className="mb-5 max-w-[500px] overflow-hidden border border-[#ddd1bf]">
                <img
                  src={previewUrl}
                  alt="Preview Koleksi"
                  className="h-[320px] w-full object-cover"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="block w-full border border-[#d8cbb9] bg-white p-3 text-[#17130f]"
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

          {/* BUTTON */}
          <div className="flex flex-wrap gap-3 border-t border-[#e5dacb] pt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0d0b08] px-8 py-4 text-xs font-bold tracking-[0.12em] text-white transition hover:bg-[#c98d2d] hover:text-black disabled:opacity-50"
            >
              {loading
                ? "MENYIMPAN..."
                : editingId
                  ? "SIMPAN PERUBAHAN"
                  : "TAMBAH KOLEKSI"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-[#d8cbb9] px-8 py-4 text-xs font-bold tracking-[0.12em] text-[#17130f]"
              >
                BATAL
              </button>
            )}
          </div>
        </div>
      </form>

      {/* LIST */}
      <div>
        <p className="mb-3 text-xs font-bold tracking-[0.22em] text-[#c98d2d]">
          DAFTAR
        </p>

        <h2 className="mb-6 font-serif text-3xl text-[#17130f]">
          Daftar Koleksi
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {initialData.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden border border-[#ddd1bf] bg-white"
            >
              {/* IMAGE */}
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-[260px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[260px] items-center justify-center bg-[#eee8de] text-sm text-[#76695d]">
                  Belum ada gambar
                </div>
              )}

              {/* CONTENT */}
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold tracking-[0.15em] text-[#c98d2d]">
                    {item.category || "KOLEKSI"}
                  </span>

                  <span className="text-xs text-[#76695d]">
                    Urutan {item.sort_order}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#17130f]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#76695d]">
                  {item.description}
                </p>

                <div className="mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="bg-[#c98d2d] px-5 py-3 text-xs font-bold tracking-[0.1em] text-black"
                  >
                    EDIT
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="bg-[#17130f] px-5 py-3 text-xs font-bold tracking-[0.1em] text-white"
                  >
                    HAPUS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {initialData.length === 0 && (
          <div className="border border-[#ddd1bf] bg-white p-8 text-center text-[#76695d]">
            Belum ada koleksi.
          </div>
        )}
      </div>
    </div>
  );
}