import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Radio, Heart, Wrench, Truck, Eye, Bomb, Plane } from 'lucide-react';

const IMG = {
  bpla1: 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/e2358557e_BPLA.png',
  bpla2: 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/5f7f53dc7_Bpla2.png',
  medic: 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/40b046b1b_Medik.png',
  mechanic: 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/30da4da0d_Mehanik.jpg',
  sviazist: 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/cf702f6ce_Sviazist.png',
  group: 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/cb6020711_D1uJcgVO.jpg',
  podval: 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/3bbdf5968_Podval.png',
  index: 'https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/62be7c8c3_index.png',
};

const specialties = [
  { icon: Plane, name: "Оператор БПЛА", salary: "от 250 000 ₽", hot: true, img: IMG.bpla2 },
  { icon: Crosshair, name: "Артиллерист", salary: "от 210 000 ₽", hot: false, img: IMG.group },
  { icon: Radio, name: "Связист", salary: "от 220 000 ₽", hot: true, img: IMG.sviazist },
  { icon: Heart, name: "Медик", salary: "от 230 000 ₽", hot: true, img: IMG.medic },
  { icon: Wrench, name: "Механик", salary: "от 210 000 ₽", hot: false, img: IMG.mechanic },
  { icon: Truck, name: "Водитель", salary: "от 210 000 ₽", hot: false, img: IMG.index },
  { icon: Eye, name: "Разведчик", salary: "от 240 000 ₽", hot: false, img: IMG.podval },
  { icon: Bomb, name: "Сапёр", salary: "от 230 000 ₽", hot: false, img: IMG.bpla1 },
];

export default function SpecialtiesSection() {
  return (
    <section id="specialties" className="py-20 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block pointer-events-none">
        <img
          src={IMG.index}
          alt=""
          className="w-full h-full object-cover object-left opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/20" />
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
              className="relative bg-card border border-white/5 rounded-xl overflow-hidden hover:border-primary/30 transition-all group cursor-pointer"
            >
              {/* Image visible always, subtle */}
              <div className="absolute inset-0">
                <img src={s.img} alt="" className="w-full h-full object-cover object-top opacity-10 group-hover:opacity-25 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/50" />
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