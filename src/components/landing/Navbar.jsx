import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from 'lucide-react';

const navLinks = [
  { href: "#calculator", label: "Выплаты" },
  { href: "#benefits", label: "Льготы" },
  { href: "#steps", label: "Как поступить" },
  { href: "#specialties", label: "Специальности" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-display text-lg font-bold uppercase tracking-wider">Контракт<span className="text-primary">2026</span></span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-foreground/60 hover:text-primary transition-colors font-medium">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#hero">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold uppercase text-xs tracking-wider">
              Оставить заявку
            </Button>
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0B]/98 backdrop-blur-xl border-b border-white/5 px-4 pb-6 pt-2">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-3 text-foreground/70 hover:text-primary font-medium border-b border-white/5">
              {l.label}
            </a>
          ))}
          <a href="#hero" onClick={() => setMobileOpen(false)}>
            <Button className="w-full mt-4 bg-primary text-primary-foreground font-display font-bold uppercase tracking-wider">
              Оставить заявку
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
}