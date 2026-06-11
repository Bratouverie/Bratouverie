import React from 'react';
import { Shield, Phone, MessageCircle, Send, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const BROTHERHOOD_IMG = 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/3bbdf5968_Podval.png';

export default function FooterSection() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img src={BROTHERHOOD_IMG} alt="" className="w-full h-full object-cover object-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Brotherhood image */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-primary/10">
            <img
              src={BROTHERHOOD_IMG}
              alt="Военное братство — служба по контракту 2026"
              className="w-full h-48 sm:h-64 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="font-display text-xl sm:text-2xl font-bold uppercase text-white tracking-wider">
                Вместе — <span className="text-primary">непобедимы</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-display text-lg font-bold uppercase tracking-wider">Контракт<span className="text-primary">2026</span></span>
            </div>
            <p className="text-xs text-foreground/40 leading-relaxed">
              Официальный партнёр Министерства обороны РФ. Помогаем оформить контракт на военную службу с 2022 года.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-foreground/40 mb-4">Навигация</h4>
            <div className="space-y-2">
              {[
                { href: '#calculator', label: 'Калькулятор выплат' },
                { href: '#benefits', label: 'Льготы семье' },
                { href: '#specialties', label: 'Специальности' },
                { href: '#faq', label: 'Частые вопросы' },
              ].map(l => (
                <a key={l.href} href={l.href} className="block text-sm text-foreground/40 hover:text-primary transition-colors">{l.label}</a>
              ))}
              <Link to="/blog" className="block text-sm text-foreground/40 hover:text-primary transition-colors">Блог</Link>
              <Link to="/consultants" className="block text-sm text-foreground/40 hover:text-primary transition-colors">Консультанты</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-foreground/40 mb-4">Контакты</h4>
            <div className="space-y-3">
              <a href="tel:79898605192" className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                +7 (989) 860-51-92
              </a>
              <a href="https://wa.me/79604164217" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/60 hover:text-green-400 transition-colors">
                <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                WhatsApp
              </a>
              <a href="https://t.me/79898605192" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/60 hover:text-blue-400 transition-colors">
                <Send className="w-4 h-4 text-blue-400 flex-shrink-0" />
                Telegram
              </a>
              <a href="https://max.ru/u/f9LHodD0cOKw7QhrzGWwfeQZKQV-qoZ4vpIXGyIaRHM9KIgnC2jZ9zoxd30" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors">
                <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
                MAX
              </a>
              <p className="text-xs text-foreground/30 pl-6">Круглосуточно 24/7</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/30 text-center sm:text-left">
            © 2026 Все права защищены. Официальный партнёр Министерства обороны РФ.
          </p>
          <a href="#" className="text-xs text-foreground/30 hover:text-foreground/50 transition-colors">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}