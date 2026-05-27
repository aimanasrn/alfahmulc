import Footer from "../components/common/Footer";
import { FloatingWhatsAppButton } from "../components/common/FloatingWhatsAppButton";
import { Navbar } from "../components/navigation/Navbar";
import { AboutSection } from "../sections/AboutSection";
import { FuturePortalSection } from "../sections/FuturePortalSection";
import { HeroSection } from "../sections/HeroSection";
import { SubjectsSection } from "../sections/SubjectsSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SubjectsSection />
        <FuturePortalSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
