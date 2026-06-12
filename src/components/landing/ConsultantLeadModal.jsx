import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from '@/api/base44Client';
import { toast } from "sonner";
import { CheckCircle, Phone, Send, MessageCircle } from 'lucide-react';

export default function ConsultantLeadModal({ open, onClose, consultantName }) {
  const [formData, setFormData] = useState({ full_name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.phone) return;
    setLoading(true);
    const lead = await base44.entities.Lead.create({
      ...formData,
      source: 'hero_form',
      status: 'new',
      notes: consultantName ? `Запрос к консультанту: ${consultantName}` : '',
    });
    base44.functions.invoke('sendLeadNotification', { lead }).catch(() => {});
    setLoading(false);
    setDone(true);
    toast.success("Заявка отправлена! Свяжемся в течение 30 минут.");
  };

  const handleClose = () => {
    setDone(false);
    setFormData({ full_name: '', phone: '' });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border border-white/10 text-foreground max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold uppercase tracking-wide">
            {consultantName ? `Записаться к ${consultantName}` : 'Оставить заявку'}
          </DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-primary mx-auto" />
            <p className="font-display text-lg font-bold uppercase">Заявка принята!</p>
            <p className="text-foreground/60 text-sm">Мы свяжемся с вами в течение 30 минут</p>
            <div className="flex justify-center gap-4 pt-2">
              <a href="https://wa.me/79604164217" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-green-400 hover:text-green-300 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href="https://t.me/79898605192" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                <Send className="w-4 h-4" /> Telegram
              </a>
            </div>
            <Button onClick={handleClose} variant="outline" className="border-white/10 mt-2">Закрыть</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <p className="text-sm text-foreground/50">Оставьте контакты — специалист свяжется с вами в течение 30 минут</p>
            <Input
              placeholder="Ваше имя"
              value={formData.full_name}
              onChange={e => setFormData({ ...formData, full_name: e.target.value })}
              className="bg-white/5 border-white/10 h-12 placeholder:text-foreground/30"
              required
            />
            <Input
              placeholder="Номер телефона"
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white/5 border-white/10 h-12 placeholder:text-foreground/30"
              required
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 font-display font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? "Отправка..." : "Оставить заявку"}
            </Button>
            <div className="flex justify-center gap-4">
              <a href="tel:79898605192" className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-primary transition-colors">
                <Phone className="w-3 h-3" /> +7 989 860-51-92
              </a>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}