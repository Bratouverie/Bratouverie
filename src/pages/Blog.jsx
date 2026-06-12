import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Clock, Eye, ArrowRight, BookOpen, X, ArrowLeft, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import FooterSection from '../components/landing/FooterSection';
import ReactMarkdown from 'react-markdown';

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
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    base44.entities.Article.filter({ published: true }, '-views', 20).then(setArticles);
  }, []);

  const filtered = filter === 'all' ? articles : articles.filter(a => a.category === filter);
  const categories = [...new Set(articles.map(a => a.category))];

  const openArticle = async (article) => {
    // Increment views
    base44.entities.Article.update(article.id, { views: (article.views || 0) + 1 }).catch(() => {});
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Article detail view
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-16">
          {/* Top bar */}
          <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-white/5 px-4 py-3">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
              <button
                onClick={closeArticle}
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Назад к статьям
              </button>
              <div className="flex items-center gap-3">
                <Link to="/">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold uppercase text-xs tracking-wider">
                    Подать заявку
                  </Button>
                </Link>
                <button onClick={closeArticle} className="text-foreground/40 hover:text-foreground/70 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-6 ${CATEGORY_COLORS[selectedArticle.category]}`}>
              <BookOpen className="w-3 h-3" />
              {CATEGORY_LABELS[selectedArticle.category]}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold uppercase leading-tight mb-6">
              {selectedArticle.title}
            </h1>

            {/* Hero info block */}
            {selectedArticle.excerpt && (
              <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-5 mb-8 text-base text-foreground/80 leading-relaxed italic">
                {selectedArticle.excerpt}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-foreground/40 mb-10 pb-8 border-b border-white/5">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedArticle.reading_time} мин чтения</span>
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {selectedArticle.views} просмотров</span>
            </div>

            {/* Article content */}
            <div className="prose prose-invert prose-primary max-w-none text-foreground/80 leading-relaxed text-base sm:text-lg
              [&_h2]:font-display [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-primary [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:leading-8 [&_p]:mb-4
              [&_ul]:space-y-2 [&_li]:leading-7
              [&_strong]:text-foreground [&_strong]:font-bold">
              <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
            </div>

            {/* Tags */}
            {selectedArticle.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/5">
                {selectedArticle.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-foreground/40">#{tag}</span>
                ))}
              </div>
            )}

            {/* CTA at bottom of article */}
            <div className="mt-12 p-8 bg-primary/5 border border-primary/20 rounded-2xl text-center">
              <p className="font-display text-2xl font-bold uppercase mb-2">Готовы служить по контракту?</p>
              <p className="text-foreground/50 text-sm mb-6">Оставьте заявку — мы свяжемся в течение 30 минут</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold uppercase tracking-wider h-12 px-8">
                    Оставить заявку
                  </Button>
                </Link>
                <a href="https://wa.me/79604164217" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-green-400/30 text-green-400 hover:bg-green-400/10 h-12 px-6">
                    WhatsApp
                  </Button>
                </a>
                <a href="https://t.me/79898605192" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 h-12 px-6">
                    Telegram
                  </Button>
                </a>
              </div>
            </div>
          </article>
        </div>
        <FooterSection />
      </div>
    );
  }

  // Article list view
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-16">
        {/* Exit button top bar */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-white/5 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-sm text-foreground/40 font-display uppercase tracking-wider">Блог / Статьи</span>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold uppercase text-xs tracking-wider">
                  Подать заявку
                </Button>
              </Link>
              <Link to="/">
                <Button size="sm" variant="outline" className="border-white/10 hover:border-primary/30 gap-1.5">
                  <Home className="w-4 h-4" /> На главную
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <section className="py-16">
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
                  className="bg-card border border-white/5 rounded-xl p-6 hover:border-primary/20 transition-all group cursor-pointer"
                  onClick={() => openArticle(article)}
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
                    <span className="flex items-center gap-1 text-primary/70 group-hover:text-primary transition-colors text-xs font-medium">
                      Читать <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <FooterSection />
    </div>
  );
}