import Footer from "../components/common/Footer";
import { FloatingWhatsAppButton } from "../components/common/FloatingWhatsAppButton";
import { Navbar } from "../components/navigation/Navbar";
import { AboutSection } from "../sections/AboutSection";
import { ContactSection } from "../sections/ContactSection";
import { HeroSection } from "../sections/HeroSection";
import { InfoBoardSection } from "../sections/InfoBoardSection";
import { SubjectsSection } from "../sections/SubjectsSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SubjectsSection />
        <TestimonialsSection />
        <InfoBoardSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
