import { createClient } from "@/utils/supabase/server";

type Service = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  button_text: string | null;
  sort_order: number | null;
};

export default async function Services() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select(`
      id,
      title,
      description,
      image_url,
      button_text,
      sort_order
    `)
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    console.error("Gagal mengambil layanan:", error);
  }

  const services: Service[] = data || [];

  return (
    <section
      id="layanan"
      className="bg-[#f4efe5] px-6 py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1480px]">

        {/* HEADER */}
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-8 bg-[#c99643]" />

              <p className="text-[11px] font-semibold tracking-[0.25em] text-[#c99643]">
                TAILORED FOR YOU
              </p>
            </div>

            <h2 className="font-serif text-[48px] leading-none text-[#17130f] sm:text-[60px] lg:text-[72px]">
              Layanan Tailor{" "}
              <span className="italic text-[#c99643]">
                Kami
              </span>
            </h2>
          </div>

          <p className="max-w-[520px] text-[16px] leading-7 text-[#6f675d] lg:pb-1">
            Temukan pakaian yang dibuat sesuai ukuran, kebutuhan, dan gaya Anda.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 border-l border-t border-[#d8d0c4] md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const number = String(index + 1).padStart(2, "0");

            const image =
              service.image_url || "/images/hero-tailor.jpg";

            const buttonText =
              service.button_text || "KONSULTASIKAN";

            const whatsappUrl =
              "https://wa.me/6285701111308?text=" +
              encodeURIComponent(
                `Halo TailorJogja.com, saya ingin konsultasi mengenai ${service.title}.`
              );

            return (
              <article
                key={service.id}
                className="group border-b border-r border-[#d8d0c4] bg-[#f8f4ec]"
              >
                {/* IMAGE */}
                <div className="relative h-[340px] overflow-hidden lg:h-[370px]">
                  <img
                    src={image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10" />
                </div>

                {/* CONTENT */}
                <div className="flex min-h-[260px] flex-col p-8 lg:p-9">
                  <span className="mb-5 text-[12px] font-semibold tracking-[0.25em] text-[#c99643]">
                    {number}
                  </span>

                  <h3 className="font-serif text-[30px] text-[#17130f]">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-7 text-[#746d64]">
                    {service.description}
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex w-fit items-center gap-4 pt-8 text-[12px] font-bold tracking-[0.12em] text-[#17130f] transition-colors hover:text-[#c99643]"
                  >
                    {buttonText}

                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* JIKA DATA KOSONG */}
        {services.length === 0 && (
          <div className="border border-[#d8d0c4] bg-[#f8f4ec] px-8 py-12 text-center">
            <p className="text-[#746d64]">
              Belum ada layanan yang tersedia.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}