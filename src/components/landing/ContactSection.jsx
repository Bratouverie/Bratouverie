import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Send, MapPin, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section id="contacts" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
            <span className="text-sm font-display uppercase tracking-widest text-primary">Связаться с нами</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase mt-2">
              Контакты
            </h2>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-white/5 rounded-xl p-6 text-center hover:border-primary/20 transition-all">
            <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-display font-bold uppercase mb-2">Горячая линия</h3>
            <p className="text-primary font-medium">8-800-123-45-67</p>
            <p className="text-xs text-foreground/40 mt-1">Звонок бесплатный</p>
          </div>
          <div className="bg-card border border-white/5 rounded-xl p-6 text-center hover:border-primary/20 transition-all">
            <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-display font-bold uppercase mb-2">WhatsApp</h3>
            <p className="text-foreground/60 text-sm">Напишите нам в мессенджере</p>
            <Button variant="outline" size="sm" className="mt-3 border-primary/30 text-primary hover:bg-primary/10">Написать</Button>
          </div>
          <div className="bg-card border border-white/5 rounded-xl p-6 text-center hover:border-primary/20 transition-all">
            <Send className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-display font-bold uppercase mb-2">Telegram</h3>
            <p className="text-foreground/60 text-sm">Канал с актуальной информацией</p>
            <Button variant="outline" size="sm" className="mt-3 border-primary/30 text-primary hover:bg-primary/10">Перейти</Button>
          </div>
          <div className="bg-card border border-white/5 rounded-xl p-6 text-center hover:border-primary/20 transition-all">
            <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-display font-bold uppercase mb-2">График</h3>
            <p className="text-foreground/60 text-sm">Пн-Пт: 8:00 — 20:00</p>
            <p className="text-foreground/60 text-sm">Сб-Вс: 9:00 — 18:00</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a href="#hero">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold uppercase tracking-wider text-lg h-16 px-12">
              Оставить заявку сейчас
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}