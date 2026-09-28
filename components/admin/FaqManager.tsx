"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Faq = {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
};

export default function FaqManager({
  initialFaqs,
}: {
  initialFaqs: Faq[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
    setSortOrder(0);
    setEditingId(null);
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      setMessage("Pertanyaan dan jawaban wajib diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    if (editingId) {
      const { error } = await supabase
        .from("faqs")
        .update({
          question: question.trim(),
          answer: answer.trim(),
          sort_order: sortOrder,
        })
        .eq("id", editingId);

      if (error) {
        setMessage(`Gagal mengubah FAQ: ${error.message}`);
        setLoading(false);
        return;
      }

      setMessage("FAQ berhasil diubah.");
    } else {
      const { error } = await supabase.from("faqs").insert({
        question: question.trim(),
        answer: answer.trim(),
        sort_order: sortOrder,
      });

      if (error) {
        setMessage(`Gagal menambahkan FAQ: ${error.message}`);
        setLoading(false);
        return;
      }

      setMessage("FAQ berhasil ditambahkan.");
    }

    setQuestion("");
    setAnswer("");
    setSortOrder(0);
    setEditingId(null);
    setLoading(false);

    router.refresh();
  };

  const handleEdit = (faq: Faq) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setSortOrder(faq.sort_order);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Yakin ingin menghapus FAQ ini?"
    );

    if (!confirmed) return;

    setMessage("");

    const { error } = await supabase
      .from("faqs")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(`Gagal menghapus FAQ: ${error.message}`);
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    setMessage("FAQ berhasil dihapus.");
    router.refresh();
  };

  return (
    <div>
      {/* FORM */}
      <div className="border border-[#ded3c3] bg-white p-8 lg:p-10">
        <h2 className="font-serif text-[30px] text-[#11100d]">
          {editingId ? "Edit FAQ" : "Tambah FAQ"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block font-semibold text-[#11100d]">
              Pertanyaan
            </label>

            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Contoh: Berapa lama proses pengerjaannya?"
              className="w-full border border-[#ded3c3] px-4 py-4 text-[#11100d] outline-none focus:border-[#d6a247]"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-[#11100d]">
              Jawaban
            </label>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Masukkan jawaban FAQ..."
              rows={5}
              className="w-full resize-none border border-[#ded3c3] px-4 py-4 text-[#11100d] outline-none focus:border-[#d6a247]"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-[#11100d]">
              Urutan Tampil
            </label>

            <input
              type="number"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(Number(e.target.value))
              }
              min={0}
              className="w-full border border-[#ded3c3] px-4 py-4 text-[#11100d] outline-none focus:border-[#d6a247]"
            />
          </div>

          {message && (
            <p className="text-sm text-[#756554]">{message}</p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#11100d] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#d69a32] hover:text-black disabled:opacity-50"
            >
              {loading
                ? "Menyimpan..."
                : editingId
                ? "Simpan Perubahan"
                : "Tambah FAQ"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-[#11100d] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#11100d]"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LIST */}
      <div className="mt-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c98b28]">
          Daftar
        </p>

        <h2 className="mt-2 font-serif text-[34px] text-[#11100d]">
          Daftar FAQ
        </h2>

        <div className="mt-7 space-y-4">
          {initialFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className="flex flex-col gap-6 border border-[#ded3c3] bg-white p-7 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <div className="mb-3 flex items-center gap-4">
                  <span className="text-[12px] font-bold text-[#c98b28]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="border border-[#ded3c3] px-3 py-1 text-[11px] text-[#756554]">
                    Urutan {faq.sort_order}
                  </span>
                </div>

                <h3 className="font-serif text-[23px] text-[#11100d]">
                  {faq.question}
                </h3>

                <p className="mt-3 max-w-[850px] text-[14px] leading-7 text-[#756554]">
                  {faq.answer}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(faq)}
                  className="bg-[#d69a32] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-black"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(faq.id)}
                  className="bg-[#11100d] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-white"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

          {initialFaqs.length === 0 && (
            <div className="border border-[#ded3c3] bg-white p-8 text-[#756554]">
              Belum ada FAQ.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}