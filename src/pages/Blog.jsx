import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Clock, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import FooterSection from '../components/landing/FooterSection';

const CATEGORY_LABELS = {
  documents: 'Документы', medical: 'Медкомиссия', family: 'Семье',
  payments: 'Выплаты', insurance: 'Страхование', vacation: 'Отпуск/Ротация',
  regions: 'Регионы', legal: 'Правовые вопросы', consultation: 'Консультация', sources: 'Источники',
};

const CATEGORY_COLORS = {
  documents: 'text-blue-400 bg-blue-400/10',
  medical: 'text-green-400 bg-green-400/10',
  family: 'text-pink-400 bg-pink-400/10',
  payments: 'text-primary bg-primary/10',
  insurance: 'text-orange-400 bg-orange-400/10',
  vacation: 'text-purple-400 bg-purple-400/10',
  regions: 'text-cyan-400 bg-cyan-400/10',
  legal: 'text-red-400 bg-red-400/10',
  consultation: 'text-yellow-400 bg-yellow-400/10',
  sources: 'text-slate-400 bg-slate-400/10',
};

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    base44.entities.Article.filter({ published: true }, '-views', 20).then(setArticles);
  }, []);

  const filtered = filter === 'all' ? articles : articles.filter(a => a.category === filter);
  const categories = [...new Set(articles.map(a => a.category))];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-16">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <span className="text-sm font-display uppercase tracking-widest text-primary">Информация</span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase mt-2 mb-4">
                Полезные <span className="text-primary">статьи</span>
              </h1>
              <p className="text-foreground/50 max-w-xl">Справочные материалы для подготовки к оформлению контракта</p>
            </motion.div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-white/5 text-foreground/50 hover:bg-white/10'}`}
              >
                Все
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-primary text-primary-foreground' : 'bg-white/5 text-foreground/50 hover:bg-white/10'}`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-white/5 rounded-xl p-6 hover:border-primary/20 transition-all group"
                >
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${CATEGORY_COLORS[article.category]}`}>
                    <BookOpen className="w-3 h-3" />
                    {CATEGORY_LABELS[article.category]}
                  </div>
                  <h2 className="font-display font-bold text-lg leading-tight mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-foreground/50 leading-relaxed mb-5 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-foreground/30">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.reading_time} мин</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.views}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link to="/"><Button variant="outline" className="border-white/10 hover:border-primary/30">← На главную</Button></Link>
            </div>
          </div>
        </section>
      </div>
      <FooterSection />
    </div>
  );
}