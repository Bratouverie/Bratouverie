import React from 'react';
import { motion } from 'framer-motion';
import { FileText, UserCheck, Stethoscope, PenLine } from 'lucide-react';

const steps = [
  { icon: FileText, step: "01", title: "Подача заявки", desc: "Онлайн или по телефону. Заполните форму — мы перезвоним в течение 30 минут." },
  { icon: UserCheck, step: "02", title: "Собеседование", desc: "Профессиональный отбор. Подберём оптимальную специальность под ваш опыт." },
  { icon: Stethoscope, step: "03", title: "Медкомиссия", desc: "Полный медицинский осмотр. Помогаем с подготовкой документов." },
  { icon: PenLine, step: "04", title: "Контракт", desc: "Подписание официального контракта с Министерством обороны РФ." },
];

export default function StepsSection() {
  return (
    <section id="steps" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-sm font-display uppercase tracking-widest text-primary">Процесс</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase mt-2 mb-12">
            Как <span className="text-primary">поступить</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              {i < 3 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}
              <div className="bg-card border border-white/5 rounded-xl p-6 relative z-10 hover:border-primary/20 transition-all h-full">
                <span className="font-display text-5xl font-bold text-primary/10 absolute top-4 right-4">{s.step}</span>
                <s.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-lg font-bold uppercase mb-2">{s.title}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}