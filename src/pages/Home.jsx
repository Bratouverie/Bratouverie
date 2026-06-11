import React, { useState, useEffect } from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import AdvantagesSection from '../components/landing/AdvantagesSection';
import PaymentCalculator from '../components/landing/PaymentCalculator';
import FamilyBenefits from '../components/landing/FamilyBenefits';
import StepsSection from '../components/landing/StepsSection';
import SpecialtiesSection from '../components/landing/SpecialtiesSection';
import FAQSection from '../components/landing/FAQSection';
import ContactSection from '../components/landing/ContactSection';
import FooterSection from '../components/landing/FooterSection';
import StickyBar from '../components/landing/StickyBar';
import ExitPopup from '../components/landing/ExitPopup';
import ChatWidget from '../components/landing/ChatWidget';
import ReviewsSection from '../components/landing/ReviewsSection';
import StatsSection from '../components/landing/StatsSection';

const HERO_IMAGE = "https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/e2358557e_BPLA.png";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !popupShown) {
        setShowPopup(true);
        setPopupShown(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [popupShown]);

  const scrollToHero = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection heroImage={HERO_IMAGE} />
      <AdvantagesSection />
      <PaymentCalculator />
      <FamilyBenefits />
      <StatsSection />
      <StepsSection />
      <SpecialtiesSection />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
      <StickyBar onOpenForm={scrollToHero} />
      <ExitPopup open={showPopup} onClose={() => setShowPopup(false)} />
      <ChatWidget />
    </div>
  );
}