import { ArrowRight } from "lucide-react";

const whatsappNumber = "6285701111308";

const products = [
  {
    category: "BLAZER",
    name: "The Arjuna Blazer",
    sizes: "M • L • XL",
    image: "/images/ready-blazer.jpg",
  },
  {
    category: "KEMEJA",
    name: "The Seta Shirt",
    sizes: "S • M • L • XL",
    image: "/images/ready-shirt.jpg",
  },
  {
    category: "VEST",
    name: "The Prambanan Vest",
    sizes: "M • L • XL",
    image: "/images/ready-vest.jpg",
  },
];

export default function ReadyToWear() {
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

        <div className="grid items-center gap-14 lg:grid-cols-[430px_1fr] lg:gap-16">

          {/* LEFT */}
          <div>
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
          <div className="grid gap-4 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className="overflow-hidden border border-[#d8cebf] bg-[#f8f4ed]"
              >
                {/* IMAGE */}
                <div className="h-[380px] overflow-hidden lg:h-[390px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c98b28]">
                    {product.category}
                  </p>

                  <h3 className="font-serif text-[21px]">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-[13px] text-[#756554]">
                    Ukuran: {product.sizes}
                  </p>

                  <p className="mt-5 text-[14px] font-medium">
                    Hubungi untuk harga
                  </p>

                  <a
                    href={createWhatsAppUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-5 text-[12px] font-bold uppercase tracking-[0.15em] transition-all hover:text-[#c98b28]"
                  >
                    Tanya Produk

                    <ArrowRight size={16} strokeWidth={1.5} />
                  </a>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}