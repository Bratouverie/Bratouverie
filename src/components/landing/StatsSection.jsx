import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

const stats = [
  { icon: Users, value: "5 247+", label: "Контрактов оформлено", sub: "с 2022 года" },
  { icon: Award, value: "98.3%", label: "Успешных заявок", sub: "из числа обратившихся" },
  { icon: Clock, value: "14 дней", label: "Среднее время оформления", sub: "от заявки до контракта" },
  { icon: TrendingUp, value: "5.5 млн ₽", label: "Максимальные выплаты", sub: "за первый год службы" },
];

export default function StatsSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        {/* Background medic */}
        <img
          src="https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/e584d5717_generated_image.png"
          alt=""
          className="absolute right-0 top-0 h-full w-1/3 object-cover object-center opacity-5 pointer-events-none hidden lg:block"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-display uppercase tracking-widest text-primary">Наши достижения</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase mt-2">
            Цифры, которым <span className="text-primary">доверяют</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-card/50 border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1">{s.value}</p>
              <p className="font-medium text-sm mb-1">{s.label}</p>
              <p className="text-xs text-foreground/40">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Progress bars infographic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-card border border-white/5 rounded-xl p-6 sm:p-8"
        >
          <h3 className="font-display text-lg font-bold uppercase mb-6 text-center">Распределение по специальностям</h3>
          <div className="space-y-4">
            {[
              { name: "Оператор БПЛА", pct: 32, color: "bg-primary" },
              { name: "Связист", pct: 24, color: "bg-primary/80" },
              { name: "Медик", pct: 18, color: "bg-primary/60" },
              { name: "Механик / Водитель", pct: 15, color: "bg-primary/40" },
              { name: "Другие специальности", pct: 11, color: "bg-primary/25" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground/70">{item.name}</span>
                  <span className="font-medium text-primary">{item.pct}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}