import { AboutSection } from "@/components/about";
import { HeroSection } from "@/components/hero";

export default function Home() {
  return (
    <div>
      <div className="bg-[linear-gradient(100.29deg,rgba(137,255,150,0.06)_0.21%,rgba(139,189,255,0.06)_45.91%,rgba(173,148,255,0.06)_87.43%)]">
        <HeroSection />
      </div>
      <AboutSection />
    </div>
  );
}
