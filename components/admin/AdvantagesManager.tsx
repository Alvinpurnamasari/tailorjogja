"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Advantage = {
  id: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
};

const iconOptions = [
  "Ruler",
  "Scissors",
  "Sparkles",
  "UserRoundCheck",
  "Shirt",
  "MapPin",
];

export default function AdvantagesManager({
  initialData,
}: {
  initialData: Advantage[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Sparkles");
  const [sortOrder, setSortOrder] = useState(0);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setTitle("");
    setDescription("");
    setIcon("Sparkles");
    setSortOrder(0);
    setEditingId(null);
  }

  function handleEdit(item: Advantage) {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setIcon(item.icon);
    setSortOrder(item.sort_order);

    setMessage("");
    setErrorMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      if (!title.trim()) {
        throw new Error("Judul keunggulan wajib diisi.");
      }

      if (!description.trim()) {
        throw new Error("Deskripsi keunggulan wajib diisi.");
      }

      if (editingId) {
        const { error } = await supabase
          .from("advantages")
          .update({
            title,
            description,
            icon,
            sort_order: sortOrder,
          })
          .eq("id", editingId);

        if (error) throw error;

        setMessage("Keunggulan berhasil diperbarui.");
      } else {
        const { error } = await supabase
          .from("advantages")
          .insert({
            title,
            description,
            icon,
            sort_order: sortOrder,
          });

        if (error) throw error;

        setMessage("Keunggulan berhasil ditambahkan.");
      }

      resetForm();
      router.refresh();
    } catch (error: any) {
      setErrorMessage(error.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Yakin ingin menghapus keunggulan ini?"
    );

    if (!confirmed) return;

    setMessage("");
    setErrorMessage("");

    const { error } = await supabase
      .from("advantages")
      .delete()
      .eq("id", id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    setMessage("Keunggulan berhasil dihapus.");
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
          Keunggulan
        </h1>

        <p className="mt-2 text-[#76695d]">
          Kelola daftar keunggulan TailorJogja.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mb-12 border border-[#ddd1bf] bg-white p-8"
      >
        <h2 className="mb-7 font-serif text-2xl text-[#17130f]">
          {editingId ? "Edit Keunggulan" : "Tambah Keunggulan"}
        </h2>

        <div className="space-y-6">
          {/* JUDUL */}
          <div>
            <label className="mb-2 block font-semibold text-[#2a2119]">
              Judul
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Diukur Langsung"
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
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Masukkan deskripsi keunggulan..."
              className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none placeholder:text-gray-400 focus:border-[#c98d2d]"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* ICON */}
            <div>
              <label className="mb-2 block font-semibold text-[#2a2119]">
                Icon
              </label>

              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none focus:border-[#c98d2d]"
              >
                {iconOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* URUTAN */}
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
                : "TAMBAH KEUNGGULAN"}
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

      {/* DAFTAR */}
      <div>
        <p className="mb-3 text-xs font-bold tracking-[0.22em] text-[#c98d2d]">
          DAFTAR
        </p>

        <h2 className="mb-6 font-serif text-3xl text-[#17130f]">
          Daftar Keunggulan
        </h2>

        <div className="space-y-4">
          {initialData.map((item) => (
            <div
              key={item.id}
              className="border border-[#ddd1bf] bg-white p-6"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold tracking-[0.15em] text-[#c98d2d]">
                      {String(item.sort_order).padStart(2, "0")}
                    </span>

                    <span className="border border-[#ddd1bf] px-2 py-1 text-xs text-[#76695d]">
                      {item.icon}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#17130f]">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-[750px] text-sm leading-6 text-[#76695d]">
                    {item.description}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
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

          {initialData.length === 0 && (
            <div className="border border-[#ddd1bf] bg-white p-8 text-center text-[#76695d]">
              Belum ada data keunggulan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}