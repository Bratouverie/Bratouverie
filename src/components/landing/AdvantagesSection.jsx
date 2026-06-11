import React from 'react';
import { DollarSign, Users, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const advantages = [
  { icon: DollarSign, title: "ДОХОД", subtitle: "от 210 000 ₽/мес", desc: "+ выплаты до 5.5 млн ₽", color: "text-primary" },
  { icon: Users, title: "СЕМЬЕ", subtitle: "Земля 10 соток", desc: "+ льготы для всей семьи", color: "text-primary" },
  { icon: Award, title: "СТАТУС", subtitle: "Ветеран БД", desc: "Пожизненные льготы", color: "text-primary" },
  { icon: ShieldCheck, title: "ЗАЩИТА", subtitle: "Страхование", desc: "До 3 000 000 ₽", color: "text-primary" },
];

export default function AdvantagesSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card/50 border border-white/5 rounded-xl p-6 hover:border-primary/30 transition-all duration-500 hover:bg-card"
            >
              <adv.icon className={`w-8 h-8 ${adv.color} mb-4 group-hover:scale-110 transition-transform`} />
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground/50 mb-1">{adv.title}</h3>
              <p className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">{adv.subtitle}</p>
              <p className="text-sm text-foreground/40">{adv.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}