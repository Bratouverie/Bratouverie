import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, CheckCircle, Phone, MessageCircle, Send } from "lucide-react";
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { toast } from "sonner";

const REGIONS = [
  "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
  "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону",
  "Уфа", "Красноярск", "Воронеж", "Пермь", "Волгоград",
  "Краснодар", "Тюмень", "Саратов", "Тольятти", "Ижевск",
  "Барнаул", "Иркутск", "Хабаровск", "Ярославль", "Владивосток",
  "Махачкала", "Томск", "Оренбург", "Кемерово", "Другой"
];

export default function HeroSection({ heroImage }) {
  const [formData, setFormData] = useState({ full_name: '', phone: '', region: '', age: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.phone) return;
    setLoading(true);
    const lead = await base44.entities.Lead.create({
      ...formData,
      age: formData.age ? Number(formData.age) : undefined,
      source: 'hero_form',
      status: 'new'
    });
    // Send Gmail notification to admin
    base44.functions.invoke('sendLeadNotification', { lead }).catch(() => {});
    setLoading(false);
    toast.success("Заявка отправлена! Мы свяжемся с вами в течение 30 минут.");
    setFormData({ full_name: '', phone: '', region: '', age: '' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Военная служба по контракту" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/95 via-[#0A0A0B]/85 to-[#0A0A0B]/60" />
      </div>
      {/* Recruiter soldier right side */}
      <div className="absolute right-0 bottom-0 top-0 w-2/5 hidden xl:block pointer-events-none z-0">
        <img
          src="https://media.base44.com/images/public/6a2ae86ed2da315a8abab314/f4fbc632f_generated_image.png"
          alt=""
          className="w-full h-full object-cover object-left-top opacity-30"
          style={{ maskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium tracking-wider uppercase">Набор 2026</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[1.05] mb-6 tracking-tight">
              Военная служба<br />
              <span className="text-primary">по контракту</span>
            </h1>

            <p className="text-lg sm:text-xl text-foreground/70 mb-4 max-w-lg leading-relaxed">
              Узнайте вашу персональную сумму выплат
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3">
                <p className="text-2xl sm:text-3xl font-display font-bold text-primary">до 5.5 млн ₽</p>
                <p className="text-xs text-foreground/50 uppercase tracking-wider">единовременно</p>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3">
                <p className="text-2xl sm:text-3xl font-display font-bold text-primary">от 210 000 ₽</p>
                <p className="text-xs text-foreground/50 uppercase tracking-wider">ежемесячно</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-foreground/60">
              {["Более 5,000 контрактников", "Официальный партнёр", "Все регионы РФ"].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bg-[#0A0A0B]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="text-center mb-2">
                <h2 className="font-display text-xl font-bold uppercase tracking-wide">Получить консультацию</h2>
                <p className="text-sm text-foreground/50 mt-1">Ответим в течение 30 минут</p>
              </div>

              <Input
                placeholder="Ваше имя"
                value={formData.full_name}
                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                className="bg-white/5 border-white/10 h-12 text-base placeholder:text-foreground/30"
                required
              />
              <Input
                placeholder="Телефон"
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white/5 border-white/10 h-12 text-base placeholder:text-foreground/30"
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Select value={formData.region} onValueChange={v => setFormData({ ...formData, region: v })}>
                  <SelectTrigger className="bg-white/5 border-white/10 h-12">
                    <SelectValue placeholder="Регион" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Возраст"
                  type="number"
                  min={18} max={65}
                  value={formData.age}
                  onChange={e => setFormData({ ...formData, age: e.target.value })}
                  className="bg-white/5 border-white/10 h-12 placeholder:text-foreground/30"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-display font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground">
                {loading ? "Отправка..." : "Оставить заявку"}
              </Button>

              <div className="flex items-center justify-center gap-4 pt-2">
                <a href="https://wa.me/79604164217" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-green-400 transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href="https://t.me/79898605192" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-blue-400 transition-colors">
                  <Send className="w-4 h-4" /> Telegram
                </a>
                <a href="tel:79898605192" className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" /> +7 989 860-51-92
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}