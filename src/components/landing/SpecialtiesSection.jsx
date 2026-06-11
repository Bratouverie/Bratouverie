import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Radio, Heart, Wrench, Truck, Eye, Bomb, Plane } from 'lucide-react';

const SOLDIER_IMG = 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/f4fbc632f_generated_image.png';
const DRONE_IMG = 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/bb7579f96_generated_image.png';
const MEDIC_IMG = 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/e584d5717_generated_image.png';
const ARTILLERY_IMG = 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/737c9c908_generated_image.png';
const SAPPER_IMG = 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/8d15f1d7c_generated_image.png';

const specialties = [
  { icon: Plane, name: "Оператор БПЛА", salary: "от 250 000 ₽", hot: true, img: DRONE_IMG },
  { icon: Crosshair, name: "Артиллерист", salary: "от 210 000 ₽", hot: false, img: ARTILLERY_IMG },
  { icon: Radio, name: "Связист", salary: "от 220 000 ₽", hot: true, img: SOLDIER_IMG },
  { icon: Heart, name: "Медик", salary: "от 230 000 ₽", hot: true, img: MEDIC_IMG },
  { icon: Wrench, name: "Механик", salary: "от 210 000 ₽", hot: false, img: SOLDIER_IMG },
  { icon: Truck, name: "Водитель", salary: "от 210 000 ₽", hot: false, img: SOLDIER_IMG },
  { icon: Eye, name: "Разведчик", salary: "от 240 000 ₽", hot: false, img: SOLDIER_IMG },
  { icon: Bomb, name: "Сапёр", salary: "от 230 000 ₽", hot: false, img: SAPPER_IMG },
];

export default function SpecialtiesSection() {
  return (
    <section id="specialties" className="py-20 relative overflow-hidden">
      {/* Background soldier image */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block pointer-events-none">
        <img
          src={SOLDIER_IMG}
          alt=""
          className="w-full h-full object-cover object-left opacity-10"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
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
              className="bg-card border border-white/5 rounded-xl overflow-hidden hover:border-primary/30 transition-all group cursor-pointer relative"
            >
              {/* Soldier image background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500">
                <img src={s.img} alt="" className="w-full h-full object-cover object-top" />
              </div>
              <div className="relative p-5">
                {s.hot && (
                  <span className="absolute top-3 right-3 text-[10px] font-display font-bold uppercase tracking-widest bg-primary text-primary-foreground px-2 py-0.5 rounded">
                    Срочно
                  </span>
                )}
                <s.icon className="w-7 h-7 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-sm sm:text-base font-bold uppercase mb-1">{s.name}</h3>
                <p className="text-sm text-primary font-medium">{s.salary}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}