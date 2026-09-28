"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import { createClient } from "@/utils/supabase/client";

type OrderStep = {
  id: number;
  title: string;
  description: string | null;
  sort_order: number;
};

type FormData = {
  title: string;
  description: string;
  sort_order: number;
};

const emptyForm: FormData = {
  title: "",
  description: "",
  sort_order: 0,
};

export default function HowToOrderManager({
  initialData,
}: {
  initialData: OrderStep[];
}) {
  const supabase = createClient();

  const [items, setItems] =
    useState<OrderStep[]>(initialData);

  const [form, setForm] =
    useState<FormData>(emptyForm);

  const [editingId, setEditingId] =
    useState<number | null>(null);

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

      [name]:
        name === "sort_order"
          ? Number(value)
          : value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(item: OrderStep) {
    setEditingId(item.id);

    setForm({
      title: item.title,
      description: item.description ?? "",
      sort_order: item.sort_order,
    });

    setMessage("");
    setErrorMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      if (!form.title.trim()) {
        throw new Error("Judul wajib diisi.");
      }

      // =========================
      // EDIT
      // =========================
      if (editingId !== null) {
        const { data, error } = await supabase
          .from("order_steps")
          .update({
            title: form.title,
            description: form.description,
            sort_order: form.sort_order,
          })
          .eq("id", editingId)
          .select()
          .single();

        if (error) throw error;

        setItems((prev) =>
          prev
            .map((item) =>
              item.id === editingId
                ? data
                : item
            )
            .sort(
              (a, b) =>
                a.sort_order - b.sort_order
            )
        );

        setMessage(
          "Langkah Cara Pesan berhasil diperbarui."
        );
      }

      // =========================
      // TAMBAH
      // =========================
      else {
        const { data, error } = await supabase
          .from("order_steps")
          .insert({
            title: form.title,
            description: form.description,
            sort_order: form.sort_order,
          })
          .select()
          .single();

        if (error) throw error;

        setItems((prev) =>
          [...prev, data].sort(
            (a, b) =>
              a.sort_order - b.sort_order
          )
        );

        setMessage(
          "Langkah Cara Pesan berhasil ditambahkan."
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

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Yakin ingin menghapus langkah ini?"
    );

    if (!confirmed) return;

    setMessage("");
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from("order_steps")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setItems((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }

      setMessage(
        "Langkah berhasil dihapus."
      );
    } catch (error: any) {
      setErrorMessage(
        error.message ||
          "Gagal menghapus data."
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
          Cara Pesan
        </h1>

        <p className="mt-2 text-[#76695d]">
          Kelola langkah proses pembuatan
          pakaian custom TailorJogja.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="border border-[#ddd1bf] bg-white p-8"
      >
        <h2 className="mb-7 font-serif text-3xl text-[#17130f]">
          {editingId !== null
            ? "Edit Langkah"
            : "Tambah Langkah"}
        </h2>

        <div className="space-y-6">

          {/* JUDUL */}
          <div>
          <label className="mb-2 block font-semibold text-[#17130f]">
              Judul
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Contoh: Konsultasi"
              className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none placeholder:text-[#9b9389] focus:border-[#c98d2d]"
            />
          </div>

          {/* DESKRIPSI */}
          <div>
          <label className="mb-2 block font-semibold text-[#17130f]">
              Deskripsi
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Masukkan deskripsi langkah..."
              className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none placeholder:text-[#9b9389] focus:border-[#c98d2d]"
            />
          </div>

          {/* URUTAN */}
          <div>
          <label className="mb-2 block font-semibold text-[#17130f]">
              Urutan Tampil
            </label>

            <input
              type="number"
              name="sort_order"
              value={form.sort_order}
              onChange={handleChange}
              min={0}
              className="w-full border border-[#d8cbb9] bg-white px-4 py-3 text-[#17130f] outline-none placeholder:text-[#9b9389] focus:border-[#c98d2d]"
            />
          </div>

          {message && (
            <div className="border border-green-200 bg-green-50 px-4 py-3 text-green-700">
              {message}
            </div>
          )}

          {errorMessage && (
            <div className="border border-red-200 bg-red-50 px-4 py-3 text-red-600">
              {errorMessage}
            </div>
          )}

          <div className="flex gap-3 border-t border-[#e5dacb] pt-6">

            <button
              type="submit"
              disabled={loading}
              className="bg-[#0d0b08] px-7 py-4 text-xs font-bold tracking-[0.12em] text-white hover:bg-[#c98d2d] hover:text-black disabled:opacity-50"
            >
              {loading
                ? "MENYIMPAN..."
                : editingId !== null
                ? "SIMPAN PERUBAHAN"
                : "TAMBAH LANGKAH"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-[#d8cbb9] px-7 py-4 text-xs font-bold tracking-[0.12em] text-[#17130f]"
              >
                BATAL
              </button>
            )}
          </div>
        </div>
      </form>

      {/* DAFTAR */}
      <div className="mt-12">

        <p className="text-xs font-bold tracking-[0.22em] text-[#c98d2d]">
          DAFTAR
        </p>

        <h2 className="mb-7 mt-2 font-serif text-3xl text-[#17130f]">
            Daftar Langkah
        </h2>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-6 border border-[#ddd1bf] bg-white p-7 md:flex-row md:items-center"
            >
              <div>
                <div className="mb-3 flex items-center gap-4">
                  <span className="text-xs font-bold tracking-[0.15em] text-[#c98d2d]">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="border border-[#ddd1bf] px-3 py-1 text-xs text-[#76695d]">
                    Urutan {item.sort_order}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#17130f]">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-[700px] text-[#76695d]">
                  {item.description}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">

                <button
                  type="button"
                  onClick={() =>
                    handleEdit(item)
                  }
                  className="bg-[#d89b35] px-6 py-3 text-xs font-bold tracking-[0.1em]"
                >
                  EDIT
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className="bg-[#0d0b08] px-6 py-3 text-xs font-bold tracking-[0.1em] text-white"
                >
                  HAPUS
                </button>

              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="border border-[#ddd1bf] bg-white p-8 text-center text-[#76695d]">
              Belum ada langkah Cara Pesan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}