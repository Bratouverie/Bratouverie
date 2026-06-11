import React from 'react';
import { Shield } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-display text-sm font-bold uppercase tracking-wider">Контракт<span className="text-primary">2026</span></span>
          </div>
          <p className="text-xs text-foreground/30 text-center">
            © 2025 Все права защищены. Официальный партнёр Министерства обороны РФ.
          </p>
          <div className="flex gap-4 text-xs text-foreground/30">
            <a href="#" className="hover:text-foreground/50 transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  );
}