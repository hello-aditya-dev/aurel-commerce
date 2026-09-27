import { HeroSection } from "@/components/home/hero";
import { BestsellersSection } from "@/components/home/bestsellers";
import { BrandStatementSection } from "@/components/home/brand-statement";
import { DiagnosticIntroSection } from "@/components/home/diagnostic-intro";
import { IngredientStorySection } from "@/components/home/ingredient-story";
import { MethodSection } from "@/components/home/method";
import { FilmSection } from "@/components/home/film";
import { ResultsSection } from "@/components/home/results";
import { BundleSection } from "@/components/home/bundle";
import { SocialProofSection } from "@/components/home/social-proof";
import { JournalSection } from "@/components/home/journal";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BestsellersSection />
      <BrandStatementSection />
      <DiagnosticIntroSection />
      <IngredientStorySection />
      <MethodSection />
      <FilmSection />
      <ResultsSection />
      <BundleSection />
      <SocialProofSection />
      <JournalSection />
    </>
  );
}
