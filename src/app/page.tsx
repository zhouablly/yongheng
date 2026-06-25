'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { StorySection } from '@/components/sections/story-section';
import { ScrollFilm } from '@/components/sections/scroll-film';
import { FeaturesSection } from '@/components/sections/features-section';
import { TimelineSection } from '@/components/sections/timeline-section';
import { LettersSection } from '@/components/sections/letters-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { TestimonialSection } from '@/components/sections/testimonial-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { QuoteSection } from '@/components/sections/quote-section';
import { CTASection } from '@/components/sections/cta-section';
import { CursorGlow } from '@/components/effects/cursor-glow';
import { ScrollProgress } from '@/components/effects/scroll-progress';
import { SmoothScroll } from '@/components/providers/smooth-scroll';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-milk">
        <CursorGlow />
        <ScrollProgress />
        <Header />

        <HeroSection />
        <StorySection />
        <ScrollFilm />
        <FeaturesSection />
        <TimelineSection />
        <LettersSection />
        <GallerySection />
        <TestimonialSection />
        <PricingSection />
        <QuoteSection />
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
