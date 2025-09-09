import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServiceFeaturesCarousel } from "@/components/service-features-carousel"
import { PlatformVisibilitySection } from "@/components/platform-visibility-section"
import { ServicesCarouselSection } from "@/components/services-carousel-section"
import { TeamCarouselSection } from "@/components/team-carousel-section"
import { RentalAdviceFormSection } from "@/components/rental-advice-form-section"
import { MinimalTestimonialsSection } from "@/components/minimal-testimonials-section"
import { ContactFormSection } from "@/components/contact-form-section"
import { ReadyToStartSection } from "@/components/ready-to-start-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="features" className="bg-green-50">
          <ServiceFeaturesCarousel />
        </section>
        <section id="why-choose-us" className="bg-white">
          <ServicesCarouselSection />
        </section>
        <section id="platforms" className="bg-green-50">
          <PlatformVisibilitySection />
        </section>
        <section id="team" className="bg-white">
          <TeamCarouselSection />
        </section>
        <section id="rental-advice" className="bg-green-50">
          <RentalAdviceFormSection />
        </section>
        <section id="testimonials" className="bg-white">
          <MinimalTestimonialsSection />
        </section>
         <section id="ready-to-start" className="bg-white">
          <ReadyToStartSection />
        </section>
        <section id="contact" className="bg-green-50">
          <ContactFormSection />
        </section>
      </main>
      <Footer />
    </div>
  )
}
