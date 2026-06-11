import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileDown, Shield } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function ExitPopup({ open, onClose }) {
  const [data, setData] = useState({ full_name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.full_name || !data.phone) return;
    setLoading(true);
    await base44.entities.Lead.create({ ...data, source: 'popup', status: 'new' });
    setLoading(false);
    toast.success("Заявка отправлена! PDF-гид будет отправлен на вашу почту.");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0A0A0B] border border-primary/20 max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FileDown className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center font-display text-2xl font-bold uppercase">
            Подождите!
          </DialogTitle>
          <p className="text-center text-foreground/50 text-sm mt-2">
            Получите PDF-гид<br />
            <span className="text-primary font-semibold">«10 шагов к контракту»</span><br />
            бесплатно!
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="Ваше имя"
            value={data.full_name}
            onChange={e => setData({ ...data, full_name: e.target.value })}
            className="bg-white/5 border-white/10 h-12"
            required
          />
          <Input
            placeholder="Email"
            type="email"
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
            className="bg-white/5 border-white/10 h-12"
          />
          <Input
            placeholder="Телефон"
            type="tel"
            value={data.phone}
            onChange={e => setData({ ...data, phone: e.target.value })}
            className="bg-white/5 border-white/10 h-12"
            required
          />
          <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-display font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground">
            {loading ? "Отправка..." : "Скачать гид"}
          </Button>
          <div className="flex items-center justify-center gap-2 text-xs text-foreground/30">
            <Shield className="w-3 h-3" />
            Ваши данные защищены
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}