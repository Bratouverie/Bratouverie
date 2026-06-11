import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, Clock, AlertCircle, RefreshCw, Target, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const PRIORITY_CONFIG = {
  high: { label: 'Высокий', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  medium: { label: 'Средний', color: 'bg-primary/10 text-primary border-primary/20' },
  low: { label: 'Низкий', color: 'bg-white/5 text-foreground/50 border-white/10' },
};
const STATUS_CONFIG = {
  pending: { icon: Clock, color: 'text-foreground/40', label: 'Ожидает' },
  in_progress: { icon: RefreshCw, color: 'text-primary', label: 'В работе' },
  done: { icon: CheckCircle, color: 'text-green-400', label: 'Готово' },
  skipped: { icon: AlertCircle, color: 'text-foreground/20', label: 'Пропущено' },
};
const CAT_LABELS = { technical: 'Технический', content: 'Контент', links: 'Ссылки', analytics: 'Аналитика', social: 'Соцсети' };

export default function AdminSeo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const loadTasks = async () => {
    setLoading(true);
    const all = await base44.entities.SeoTask.filter({ date: today }, '-created_date', 20);
    setTasks(all);
    setLoading(false);
  };

  useEffect(() => { loadTasks(); }, []);

  const generatePlan = async () => {
    setGenerating(true);
    await base44.functions.invoke('generateSeoPlan', {});
    await loadTasks();
    setGenerating(false);
  };

  const updateStatus = async (id, status) => {
    await base44.entities.SeoTask.update(id, { status });
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const done = tasks.filter(t => t.status === 'done').length;
  const total = tasks.length;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-display uppercase tracking-widest text-primary">SEO Dashboard</span>
            </div>
            <h1 className="font-display text-3xl font-bold uppercase">
              План на сегодня
            </h1>
            <p className="text-foreground/40 text-sm mt-1">{new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/"><Button variant="outline" size="sm" className="border-white/10">← Сайт</Button></Link>
            <Button onClick={generatePlan} disabled={generating} className="bg-primary text-primary-foreground">
              {generating ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Target className="w-4 h-4 mr-2" />}
              {generating ? 'Генерация...' : 'Сгенерировать план'}
            </Button>
          </div>
        </div>

        {/* Progress */}
        {total > 0 && (
          <div className="bg-card border border-white/5 rounded-xl p-5 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground/60">Прогресс дня</span>
              <span className="font-medium text-primary">{done}/{total} задач</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${total ? (done/total)*100 : 0}%` }} />
            </div>
          </div>
        )}

        {loading && <div className="text-center py-12 text-foreground/40">Загрузка...</div>}

        {!loading && tasks.length === 0 && (
          <div className="text-center py-16 bg-card border border-white/5 rounded-xl">
            <BarChart3 className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
            <p className="text-foreground/40 mb-4">Нет задач на сегодня</p>
            <Button onClick={generatePlan} disabled={generating} className="bg-primary text-primary-foreground">
              Сгенерировать SEO-план на сегодня
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {tasks.map((task, i) => {
            const st = STATUS_CONFIG[task.status] || STATUS_CONFIG.pending;
            const StIcon = st.icon;
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-card border rounded-xl p-5 transition-all ${task.status === 'done' ? 'border-green-400/10 opacity-60' : 'border-white/5 hover:border-primary/20'}`}
              >
                <div className="flex items-start gap-4">
                  <StIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${st.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className={`font-medium ${task.status === 'done' ? 'line-through text-foreground/40' : ''}`}>{task.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded border ${PRIORITY_CONFIG[task.priority]?.color}`}>
                        {PRIORITY_CONFIG[task.priority]?.label}
                      </span>
                      <span className="text-xs text-foreground/30 bg-white/5 px-2 py-0.5 rounded">
                        {CAT_LABELS[task.category]}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/50 mb-2">{task.description}</p>
                    {task.impact && <p className="text-xs text-primary/60">↑ {task.impact}</p>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {task.status !== 'done' && (
                      <Button size="sm" variant="ghost" onClick={() => updateStatus(task.id, task.status === 'in_progress' ? 'done' : 'in_progress')}
                        className="text-xs h-7 px-2 hover:text-primary">
                        {task.status === 'in_progress' ? '✓ Готово' : '▶ Начать'}
                      </Button>
                    )}
                    {task.status === 'done' && <span className="text-xs text-green-400 py-1">✓</span>}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}