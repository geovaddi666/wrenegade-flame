import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FlameSigil from "@/components/FlameSigil";

function Divider() {
  return (
    <div className="flame-divider" aria-hidden="true">
      <FlameSigil />
    </div>
  );
}

export default function FlamePage() {
  return (
    <main className="flame-page">
      {/* Watercolour night, fixed behind the whole page */}
      <div className="flame-bg" aria-hidden="true" />
      <Hero />
      <About />
      <Divider />
      <Services />
      <Gallery />
      <Divider />
      <Contact />
      <Footer />
    </main>
  );
}
