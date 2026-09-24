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

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Advantages/>
      <Collection/>
      <ReadyToWear/>
      <HowToOrder/>
      <CTASection/>
      <Faq/>
      <Footer/>

    </main>
  );
}