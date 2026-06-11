import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle } from 'lucide-react';

const faqs = [
  { q: "Что такое контракт на СВО?", a: "Контракт на СВО — юридическое соглашение между военнослужащим и Министерством обороны РФ. Отличия: увеличенные выплаты (от 210 000 руб./мес), дополнительные боевые надбавки, статус ветерана БД, расширенные социальные гарантии." },
  { q: "На какой срок заключается контракт?", a: "Минимальный срок — 6 месяцев, стандартно от 1 года. Можно заключить на 3 или 5 лет. В условиях мобилизации контракт продлевается до окончания СВО." },
  { q: "Кто может заключить контракт?", a: "Граждане РФ от 18 до 60 лет (рядовые/сержанты), до 65 лет для офицеров, иностранные граждане от 18 до 30 лет, женщины до 45 лет." },
  { q: "Какая зарплата у контрактника?", a: "Минимальная — от 210 000 руб./мес. Включает оклад 60-100 тыс., надбавку за участие 100 тыс., региональный коэффициент до 30%, боевые надбавки до 200 тыс., суточные 4 240 руб./день." },
  { q: "Какие единовременные выплаты?", a: "Федеральная выплата — 400 000 руб., региональные — от 100 000 до 2 500 000 руб. Для операторов БПЛА — до 500 000 руб. дополнительно. Итого: от 500 000 до 5 500 000 руб." },
  { q: "Какие специальности востребованы?", a: "Операторы БПЛА, артиллеристы, связисты, медики, механики, водители, разведчики, сапёры. Для операторов БПЛА и связистов — повышенные выплаты." },
  { q: "Какая подготовка предоставляется?", a: "Все контрактники проходят обучение по специальности (2-4 недели), тактическую и медицинскую подготовку, работу с современным оружием." },
  { q: "Какие документы нужны?", a: "Паспорт РФ, военный билет (при наличии), документ об образовании, СНИЛС, ИНН, свидетельство о браке, медицинские справки, фото 3x4." },
  { q: "Как проходит медкомиссия?", a: "Осмотр терапевта, хирурга, невролога, офтальмолога, ЛОР, ЭКГ, флюорография, анализы крови и мочи, справки от психиатра и нарколога." },
  { q: "Какой отпуск положен?", a: "Основной ежегодный 30-45 суток, в период СВО — не реже 1 раза в 6 месяцев (14+ суток), отпуск по личным обстоятельствам до 10 суток." },
  { q: "Какие льготы для семьи?", a: "Пособие на детей 21 903 руб./мес, бесплатные детсады и питание в школах, внеочередное зачисление в вузы, льготы по ЖКУ 50%, путёвки в лагеря." },
  { q: "Что такое статус ветерана БД?", a: "Пожизненные льготы: бесплатный проезд, увеличенная пенсия, льготы на лекарства, санаторно-курортное лечение, приоритет при получении жилья." },
  { q: "Какое страхование предусмотрено?", a: "Обязательное госстрахование через СОГАЗ. Выплаты при ранении — от 1 до 3 млн руб., при гибели — от 3 до 5 млн руб." },
  { q: "Можно ли заключить контракт из другого региона?", a: "Да, контракт можно заключить в любом пункте отбора РФ независимо от регистрации. Региональные выплаты соответствуют региону заключения." },
  { q: "Сколько времени занимает оформление?", a: "От 2 недель до 1 месяца: рассмотрение заявки (1-3 дня), медкомиссия (3-5 дней), проверка документов (до 10 дней), заключение контракта (1 день)." },
];

export default function FAQSection() {
  const [search, setSearch] = useState('');
  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="w-6 h-6 text-primary" />
            <span className="text-sm font-display uppercase tracking-widest text-primary">FAQ</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase mb-8">
            Частые <span className="text-primary">вопросы</span>
          </h2>
        </motion.div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
          <Input
            placeholder="Поиск по вопросам..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-12 bg-card border-white/10 h-12 text-base"
          />
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {filtered.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-white/5 rounded-xl px-6 overflow-hidden">
              <AccordionTrigger className="text-left font-medium text-sm sm:text-base py-5 hover:no-underline hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/60 text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}