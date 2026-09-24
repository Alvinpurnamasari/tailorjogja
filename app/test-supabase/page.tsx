import { createClient } from "@/utils/supabase/server";

export default async function TestSupabasePage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("test_connection")
    .select("*");

  if (error) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold text-red-600">
          Koneksi Supabase gagal
        </h1>

        <p className="mt-4">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">
        Koneksi Supabase berhasil ✅
      </h1>

      <div className="mt-5">
        {data?.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
    </main>
  );
}