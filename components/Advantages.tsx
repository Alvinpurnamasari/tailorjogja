import {
    Ruler,
    Scissors,
    Sparkles,
    UserRoundCheck,
    Shirt,
    MapPin,
  } from "lucide-react";
  
  const advantages = [
    {
      icon: Ruler,
      title: "Diukur Langsung",
      description:
        "Pengukuran dilakukan langsung oleh penjahit untuk mendapatkan ukuran yang sesuai.",
    },
    {
      icon: Scissors,
      title: "Custom Sesuai Keinginan",
      description:
        "Model, ukuran, bahan, warna, dan detail dapat disesuaikan dengan kebutuhan.",
    },
    {
      icon: Sparkles,
      title: "Jahitan Berkualitas",
      description:
        "Setiap pakaian dikerjakan dengan memperhatikan kerapian dan detail.",
    },
    {
      icon: UserRoundCheck,
      title: "Konsultasi Personal",
      description:
        "Diskusikan model dan kebutuhan pakaian sebelum proses pengerjaan dimulai.",
    },
    {
      icon: Shirt,
      title: "Custom & Ready to Wear",
      description:
        "Tersedia pakaian custom sekaligus koleksi pakaian siap pakai untuk kebutuhan Anda.",
    },
    {
      icon: MapPin,
      title: "Tailor Jogja",
      description:
        "Melayani kebutuhan pembuatan pakaian custom di Yogyakarta dengan proses yang mudah.",
    },
  ];
  
  export default function Advantages() {
    return (
      <section
        id="keunggulan"
        className="scroll-mt-[90px] bg-[#0c0b09] text-[#f7f2e9]"
      >
        <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
  
          {/* HEADING */}
          <div className="mb-16 text-center">
            <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e0aa4b]">
              Built With Precision
            </p>
  
            <h2 className="font-serif text-[45px] leading-[1.05] sm:text-[55px] lg:text-[66px]">
              Kenapa Memilih
              <br />
              <span className="italic font-normal text-[#d6a247]">
                TailorJogja.com?
              </span>
            </h2>
          </div>
  
          {/* GRID */}
          <div className="grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((item) => {
              const Icon = item.icon;
  
              return (
                <div
                  key={item.title}
                  className="group min-h-[245px] border-b border-r border-white/15 p-10 transition-colors duration-300 hover:bg-white/[0.03] lg:p-11"
                >
                  {/* ICON */}
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="mb-9 text-[#d6a247]"
                  />
  
                  {/* TITLE */}
                  <h3 className="mb-5 font-serif text-[25px] leading-tight text-[#f7f2e9]">
                    {item.title}
                  </h3>
  
                  {/* DESCRIPTION */}
                  <p className="max-w-[380px] text-[15px] leading-7 text-[#b7afa5]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
  
        </div>
      </section>
    );
  }