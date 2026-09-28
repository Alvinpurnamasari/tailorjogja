import { ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

const whatsappNumber = "6285701111308";

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

export default async function ReadyToWear() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ready_to_wear")
    .select(
      "id, title, category, description, price, sizes, image_url, sort_order"
    )
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  const products = (data || []) as ReadyToWearItem[];

  const createWhatsAppUrl = (productName: string) => {
    const message = `Halo TailorJogja.com, saya ingin bertanya mengenai produk ${productName}.`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <section
      id="ready-to-wear"
      className="bg-[#eee5d5] text-[#0c0b09]"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 lg:px-16 lg:py-24">

        <div className="grid items-start gap-14 lg:grid-cols-[430px_1fr] lg:gap-16">

          {/* LEFT */}
          <div className="lg:sticky lg:top-28">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-8 bg-[#d6a247]" />

              <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#c98b28]">
                Ready to Wear
              </span>
            </div>

            <h2 className="font-serif text-[52px] leading-[1.02] sm:text-[60px] lg:text-[68px]">
              Siap Pakai,
              <br />
              Tetap Tampil
              <br />

              <span className="italic font-normal text-[#d6a247]">
                Berkelas
              </span>
            </h2>

            <p className="mt-8 max-w-[390px] text-[16px] leading-8 text-[#756554]">
              Tidak punya waktu menunggu proses pembuatan custom? Temukan
              koleksi Ready to Wear dari TailorJogja.com yang siap digunakan
              untuk menunjang penampilan Anda.
            </p>
          </div>

          {/* PRODUCTS */}
          <div>
            {error ? (
              <p className="text-red-600">
                Gagal mengambil produk Ready to Wear: {error.message}
              </p>
            ) : products.length === 0 ? (
              <div className="border border-[#d8cebf] bg-[#f8f4ed] p-10">
                <p className="text-[#756554]">
                  Produk Ready to Wear belum tersedia.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="flex overflow-hidden border border-[#d8cebf] bg-[#f8f4ed] flex-col"
                  >
                    {/* IMAGE */}
                    <div className="h-[380px] overflow-hidden lg:h-[390px]">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#e5dccd] px-6 text-center text-sm text-[#756554]">
                          Gambar belum tersedia
                        </div>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col p-5">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c98b28]">
                        {product.category}
                      </p>

                      <h3 className="font-serif text-[21px]">
                        {product.title}
                      </h3>

                      {product.description && (
                        <p className="mt-3 text-[13px] leading-6 text-[#756554]">
                          {product.description}
                        </p>
                      )}

                      {product.sizes && (
                        <p className="mt-3 text-[13px] text-[#756554]">
                          Ukuran: {product.sizes}
                        </p>
                      )}

                      <p className="mt-5 text-[14px] font-medium">
                        {product.price || "Hubungi untuk harga"}
                      </p>

                      <a
                        href={createWhatsAppUrl(product.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-5 pt-5 text-[12px] font-bold uppercase tracking-[0.15em] transition-all hover:text-[#c98b28]"
                      >
                        Tanya Produk

                        <ArrowRight
                          size={16}
                          strokeWidth={1.5}
                        />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}