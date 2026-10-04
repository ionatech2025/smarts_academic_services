import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { SubjectsSection } from './components/sections/SubjectsSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FAQSection } from './components/sections/FAQSection';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flex: 1, marginTop: '80px' }}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SubjectsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
