import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Advantages from "@/components/Advantages";
import Collection from "@/components/Collection";
import ReadyToWear from "@/components/ReadyToWear";
import HowToOrder from "@/components/HowToOrder";

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
    </main>
  );
}