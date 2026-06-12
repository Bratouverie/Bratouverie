import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import FooterSection from '../components/landing/FooterSection';
import ConsultantLeadModal from '../components/landing/ConsultantLeadModal';

const STAGE_LABELS = {
  application: 'Подача заявки',
  documents: 'Документы',
  medical: 'Медкомиссия',
  contract: 'Контракт',
  all: 'Все этапы',
};

export default function Consultants() {
  const [consultants, setConsultants] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);

  useEffect(() => {
    base44.entities.Consultant.filter({ is_active: true }).then(setConsultants);
  }, []);

  const openModal = (consultant) => {
    setSelectedConsultant(consultant);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-sm font-display uppercase tracking-widest text-primary">Команда</span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase mt-2 mb-4">
                Наши <span className="text-primary">консультанты</span>
              </h1>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-8">
                Каждый специалист сопровождает вас на определённом этапе оформления контракта — от первого звонка до подписания.
              </p>
              <Button
                onClick={() => openModal(null)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold uppercase tracking-wider h-12 px-8"
              >
                Оставить заявку
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Process steps */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              {Object.entries(STAGE_LABELS).filter(([k]) => k !== 'all').map(([, label], i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground/50">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{i+1}</div>
                  <span>{label}</span>
                  {i < 3 && <div className="hidden sm:block w-8 h-px bg-white/10" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultants grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-white/5 rounded-2xl p-6 hover:border-primary/20 transition-all"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-2xl font-bold text-primary">
                        {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-lg">{c.name}</h3>
                      <p className="text-primary text-sm font-medium">{c.position}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                        <span className="text-sm font-medium">{c.rating}</span>
                        <span className="text-xs text-foreground/40">· {c.experience_years} лет</span>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium mb-4">
                    <CheckCircle className="w-3 h-3" />
                    {STAGE_LABELS[c.stage]}
                  </div>

                  <p className="text-sm text-foreground/60 leading-relaxed mb-5">{c.bio}</p>

                  <p className="text-xs text-foreground/40 mb-4">
                    <span className="text-foreground/60 font-medium">Специализация: </span>
                    {c.specialization}
                  </p>

                  <div className="flex gap-4 py-4 border-t border-white/5 mb-5">
                    <div className="text-center flex-1">
                      <p className="font-display text-xl font-bold text-primary">{c.contracts_helped}+</p>
                      <p className="text-xs text-foreground/40">контрактов</p>
                    </div>
                    <div className="text-center flex-1 border-l border-white/5">
                      <p className="font-display text-xl font-bold text-primary">{c.rating}</p>
                      <p className="text-xs text-foreground/40">рейтинг</p>
                    </div>
                    <div className="text-center flex-1 border-l border-white/5">
                      <p className="font-display text-xl font-bold text-primary">{c.experience_years}</p>
                      <p className="text-xs text-foreground/40">лет опыта</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => openModal(c)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold uppercase text-sm tracking-wider"
                  >
                    Записаться к специалисту
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 text-center">
          <Link to="/">
            <Button variant="outline" className="border-white/10 hover:border-primary/30">← На главную</Button>
          </Link>
        </div>
      </div>
      <FooterSection />

      <ConsultantLeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        consultantName={selectedConsultant?.name}
      />
    </div>
  );
}