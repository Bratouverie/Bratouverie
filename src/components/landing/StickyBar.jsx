import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Phone, X } from 'lucide-react';

export default function StickyBar({ onOpenForm }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-xl border-t border-primary/20 py-3 px-4 animate-in slide-in-from-bottom">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="font-display text-sm font-bold uppercase tracking-wider">Военная служба по контракту</p>
          <p className="text-xs text-foreground/50">от 210 000 ₽/мес + единовременные выплаты</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a href="tel:88001234567" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
            <Phone className="w-4 h-4" /> 8-800-123-45-67
          </a>
          <Button onClick={onOpenForm} className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold uppercase tracking-wider text-sm flex-1 sm:flex-none">
            Оставить заявку
          </Button>
          <button onClick={() => setDismissed(true)} className="text-foreground/30 hover:text-foreground/60">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}