import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Advantages from "@/components/Advantages";
import Collection from "@/components/Collection";
import ReadyToWear from "@/components/ReadyToWear";
import HowToOrder from "@/components/HowToOrder";
import CTASection from "@/components/CTASection";
import Faq from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Advantages />
        <Collection/>
        <ReadyToWear />
        <HowToOrder />
        <Faq/>
        <CTASection />
      </main>

      <Footer />

      <FloatingWhatsApp />
    </>
  );
}