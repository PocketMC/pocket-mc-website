import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/pmc/Navbar";
import Hero from "@/components/pmc/Hero";
import TrustedByTicker from "@/components/pmc/TrustedByTicker";
import FeaturesGrid from "@/components/pmc/FeaturesGrid";
import Screenshots from "@/components/pmc/Screenshots";
import HowItWorks from "@/components/pmc/HowItWorks";
import ComparisonTable from "@/components/pmc/ComparisonTable";
import ServerTypes from "@/components/pmc/ServerTypes";
import SystemRequirements from "@/components/pmc/SystemRequirements";
import FAQ from "@/components/pmc/FAQ";
import OpenSource from "@/components/pmc/OpenSource";
import DownloadCTA from "@/components/pmc/DownloadCTA";
import Roadmap from "@/components/pmc/Roadmap";
import Changelog from "@/components/pmc/Changelog";
import PrivacyPolicy from "@/components/pmc/PrivacyPolicy";
import MITLicense from "@/components/pmc/MITLicense";
import Footer from "@/components/pmc/Footer";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <TrustedByTicker />
      <FeaturesGrid />
      <Screenshots />
      <HowItWorks />
      <ComparisonTable />
      <ServerTypes />
      <SystemRequirements />
      <FAQ />
      <OpenSource />
      <DownloadCTA />
      <Roadmap />
      <Changelog />
      <PrivacyPolicy />
      <MITLicense />
      <Footer />
    </div>
  );
};

export default Index;
