import type { LightboxData, ProofModalData } from "../types";
import HeroSection from "../components/sections/HeroSection";
import TourSection from "../components/sections/TourSection";
import SoftwaresSection from "../components/sections/SoftwaresSection";
import ComparisonSection from "../components/sections/ComparisonSection";
import StabilitySection from "../components/sections/StabilitySection";
import FaqSection from "../components/sections/FaqSection";
import CtaSection from "../components/sections/CtaSection";

interface HomePageProps {
  onOpenLightbox: (data: LightboxData) => void;
  onOpenProofModal: (data: ProofModalData) => void;
}

export default function HomePage({
  onOpenLightbox,
  onOpenProofModal,
}: HomePageProps) {
  return (
    <main className="overflow-x-clip">
      <HeroSection />
      <TourSection onOpenLightbox={onOpenLightbox} />
      <SoftwaresSection />
      <ComparisonSection onOpenProofModal={onOpenProofModal} />
      <StabilitySection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
