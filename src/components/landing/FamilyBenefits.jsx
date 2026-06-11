import React from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, GraduationCap, Users } from 'lucide-react';

const benefits = [
  {
    icon: Home, title: "Для вас",
    items: ["Военная ипотека (НИС) — ставка 5-6%", "Статус ветерана БД — пожизненно", "Кредитные каникулы до 10 млн ₽", "Освобождение от НДФЛ", "Земельный участок 10 соток"]
  },
  {
    icon: Heart, title: "Для супруги",
    items: ["Пособие 21 903 ₽/мес на детей", "Приоритетное трудоустройство", "Компенсация проезда", "Отпуск одновременно с мужем", "Пенсионные льготы"]
  },
  {
    icon: GraduationCap, title: "Для детей",
    items: ["Бесплатные детские сады", "Питание в школах 1-11 классы", "Внеочередное зачисление в вузы", "Бесплатные путёвки в лагеря", "Бюджетные места в вузах"]
  },
  {
    icon: Users, title: "Для родителей",
    items: ["Социальное обслуживание на дому", "Бесплатная медицинская помощь", "Компенсация проезда", "Приоритет в пансионатах"]
  },
];

export default function FamilyBenefits() {
  return (
    <section id="benefits" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-sm font-display uppercase tracking-widest text-primary">Социальные гарантии</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase mt-2 mb-12">
            Льготы для <span className="text-primary">всей семьи</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-white/5 rounded-xl p-6 hover:border-primary/20 transition-all"
            >
              <b.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-lg font-bold uppercase mb-4">{b.title}</h3>
              <ul className="space-y-2.5">
                {b.items.map((item, j) => (
                  <li key={j} className="text-sm text-foreground/60 flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}