import Footer from "../components/common/Footer";
import { FloatingWhatsAppButton } from "../components/common/FloatingWhatsAppButton";
import { TopBarSection } from "../sections/TopBarSection";
import { HeaderSection } from "../sections/HeaderSection";
import { HeroSection } from "../sections/HeroSection";
import { StatsSection } from "../sections/StatsSection";
import { AboutSection } from "../sections/AboutSection";
import { ProgramsSection } from "../sections/ProgramsSection";
import { WhyChooseUsSection } from "../sections/WhyChooseUsSection";
import { LearningMethodSection } from "../sections/LearningMethodSection";
import { GallerySection } from "../sections/GallerySection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { FinalCtaSection } from "../sections/FinalCtaSection";
import { ContactSection } from "../sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <TopBarSection />
      <HeaderSection />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ProgramsSection />
        <WhyChooseUsSection />
        <LearningMethodSection />
        <GallerySection />
        <TestimonialsSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
