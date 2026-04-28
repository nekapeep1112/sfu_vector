import {
  LandingNav, HeroSection, MarqueeStrip, FeaturesSection, AudiencesSection,
  HowSection, NumbersSection, StoriesSection, CtaSection, LandingFooter,
} from '@/components/landing/sections';

export default function LandingPage() {
  return (
    <>
      <LandingNav/>
      <HeroSection/>
      <MarqueeStrip/>
      <FeaturesSection/>
      <AudiencesSection/>
      <HowSection/>
      <NumbersSection/>
      <StoriesSection/>
      <CtaSection/>
      <LandingFooter/>
    </>
  );
}
