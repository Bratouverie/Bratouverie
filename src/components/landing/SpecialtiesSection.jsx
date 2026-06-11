import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Radio, Heart, Wrench, Truck, Eye, Bomb, Plane } from 'lucide-react';

const specialties = [
  { icon: Plane, name: "Оператор БПЛА", salary: "от 250 000 ₽", hot: true },
  { icon: Crosshair, name: "Артиллерист", salary: "от 210 000 ₽", hot: false },
  { icon: Radio, name: "Связист", salary: "от 220 000 ₽", hot: true },
  { icon: Heart, name: "Медик", salary: "от 230 000 ₽", hot: true },
  { icon: Wrench, name: "Механик", salary: "от 210 000 ₽", hot: false },
  { icon: Truck, name: "Водитель", salary: "от 210 000 ₽", hot: false },
  { icon: Eye, name: "Разведчик", salary: "от 240 000 ₽", hot: false },
  { icon: Bomb, name: "Сапёр", salary: "от 230 000 ₽", hot: false },
];

export default function SpecialtiesSection() {
  return (
    <section id="specialties" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-sm font-display uppercase tracking-widest text-primary">Вакансии</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase mt-2 mb-12">
            Востребованные<br /><span className="text-primary">специальности</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {specialties.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-white/5 rounded-xl p-5 hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden"
            >
              {s.hot && (
                <span className="absolute top-3 right-3 text-[10px] font-display font-bold uppercase tracking-widest bg-primary text-primary-foreground px-2 py-0.5 rounded">
                  Срочно
                </span>
              )}
              <s.icon className="w-7 h-7 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-sm sm:text-base font-bold uppercase mb-1">{s.name}</h3>
              <p className="text-sm text-primary font-medium">{s.salary}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}