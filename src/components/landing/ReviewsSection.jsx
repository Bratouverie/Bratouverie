import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    base44.entities.Review.list('-created_date', 20).then(setReviews);
  }, []);

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : '4.9';

  return (
    <section id="reviews" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-display uppercase tracking-widest text-primary">Отзывы</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase mt-2">
                Истории <span className="text-primary">успеха</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-xl px-5 py-3">
              <div>
                <p className="font-display text-3xl font-bold text-primary">{avgRating}</p>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-primary fill-primary" />)}
                </div>
              </div>
              <div className="border-l border-primary/20 pl-3">
                <p className="text-sm font-medium">{reviews.length}+ отзывов</p>
                <p className="text-xs text-foreground/40">реальных кандидатов</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-card border border-white/5 rounded-xl p-6 hover:border-primary/20 transition-all relative"
            >
              <Quote className="w-6 h-6 text-primary/20 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= r.rating ? 'text-primary fill-primary' : 'text-foreground/20'}`} />
                ))}
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-display font-bold text-primary">{r.avatar_initials}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{r.author_name}</p>
                  <p className="text-xs text-foreground/40">{r.specialty} · {r.author_city} · {r.contract_year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}