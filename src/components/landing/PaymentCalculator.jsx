import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';

const REGIONS_DATA = {
  "Москва": 1_000_000, "Санкт-Петербург": 800_000, "Краснодар": 600_000,
  "Новосибирск": 500_000, "Екатеринбург": 700_000, "Казань": 600_000,
  "Другой регион": 300_000,
};

const RANKS = {
  "Рядовой": 0, "Ефрейтор": 5000, "Мл. сержант": 10000,
  "Сержант": 15000, "Ст. сержант": 20000, "Старшина": 25000,
  "Прапорщик": 30000,
};

export default function PaymentCalculator() {
  const [region, setRegion] = useState("Другой регион");
  const [rank, setRank] = useState("Рядовой");
  const [term, setTerm] = useState("1");

  const calc = useMemo(() => {
    const base = 210000;
    const rankBonus = RANKS[rank] || 0;
    const monthly = base + rankBonus;
    const federal = 400000;
    const regional = REGIONS_DATA[region] || 300000;
    // Единовременная выплата при заключении контракта: 2.5–4.5 млн (среднее ~3.5 млн)
    const oneTime = 3500000;
    const yearlyMonths = monthly * 12;
    const total = yearlyMonths + oneTime + federal + regional;
    return { monthly, federal, regional, oneTime, total, yearlyMonths };
  }, [region, rank, term]);

  return (
    <section id="calculator" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-3">
            <Calculator className="w-6 h-6 text-primary" />
            <span className="text-sm font-display uppercase tracking-widest text-primary">Калькулятор</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase mb-12">
            Рассчитайте<br /><span className="text-primary">ваши выплаты</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card border border-white/5 rounded-xl p-6 space-y-5">
              <div>
                <label className="text-sm text-foreground/50 uppercase tracking-wider font-medium mb-2 block">Регион</label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="bg-white/5 border-white/10 h-12"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(REGIONS_DATA).map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-foreground/50 uppercase tracking-wider font-medium mb-2 block">Звание</label>
                <Select value={rank} onValueChange={setRank}>
                  <SelectTrigger className="bg-white/5 border-white/10 h-12"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(RANKS).map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-white/5 rounded-xl p-5">
                <p className="text-xs text-foreground/40 uppercase tracking-wider mb-1">Ежемесячно</p>
                <p className="font-display text-2xl font-bold text-primary">{calc.monthly.toLocaleString('ru')} ₽</p>
              </div>
              <div className="bg-card border border-white/5 rounded-xl p-5">
                <p className="text-xs text-foreground/40 uppercase tracking-wider mb-1">Единовременно</p>
                <p className="font-display text-xl font-bold text-foreground">2,5 — 4,5 млн ₽</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-display uppercase tracking-widest text-primary">Итого за первый год</span>
            </div>
            <p className="font-display text-5xl sm:text-6xl font-bold text-primary mb-4">
              {calc.total.toLocaleString('ru')} ₽
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-foreground/60">
                <span>Денежное довольствие (12 мес)</span>
                <span className="text-foreground">{calc.yearlyMonths.toLocaleString('ru')} ₽</span>
              </div>
              <div className="flex justify-between text-foreground/60">
                <span>Единовременная выплата (среднее)</span>
                <span className="text-foreground">{calc.oneTime.toLocaleString('ru')} ₽</span>
              </div>
              <div className="flex justify-between text-foreground/60">
                <span>Федеральная выплата</span>
                <span className="text-foreground">{calc.federal.toLocaleString('ru')} ₽</span>
              </div>
              <div className="flex justify-between text-foreground/60">
                <span>Региональная выплата ({region})</span>
                <span className="text-foreground">{calc.regional.toLocaleString('ru')} ₽</span>
              </div>
              <div className="border-t border-primary/20 pt-3 flex justify-between font-bold text-foreground">
                <span>Итого</span>
                <span className="text-primary">{calc.total.toLocaleString('ru')} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}