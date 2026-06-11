import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const ADMIN_EMAIL = 'admin@contract2026.ru'; // Замените на реальный email администратора

function encodeBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function buildEmailRaw(to, subject, body) {
  const lines = [
    `To: ${to}`,
    `Subject: =?UTF-8?B?${encodeBase64(subject)}?=`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    encodeBase64(body),
  ];
  return lines.join('\r\n');
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();
    const { lead } = payload;

    if (!lead) {
      return Response.json({ error: 'No lead data provided' }, { status: 400 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    const specialtyMap = {
      operator_bpla: 'Оператор БПЛА',
      artillerist: 'Артиллерист',
      svyazist: 'Связист',
      medic: 'Медик',
      mechanic: 'Механик',
      driver: 'Водитель',
      razvedchik: 'Разведчик',
      saper: 'Сапёр',
      other: 'Другое',
    };

    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #0A0A0B; border: 1px solid #FFB800; border-radius: 12px; overflow: hidden;">
    <div style="background: #FFB800; padding: 20px 24px;">
      <h1 style="margin: 0; color: #0A0A0B; font-size: 20px; font-weight: bold;">🛡️ НОВАЯ ЗАЯВКА — Контракт2026</h1>
    </div>
    <div style="padding: 24px; color: #F2F2F2;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #999; width: 40%;">Имя:</td><td style="padding: 8px 0; font-weight: bold;">${lead.full_name || '—'}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Телефон:</td><td style="padding: 8px 0; font-weight: bold; color: #FFB800;">${lead.phone || '—'}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Email:</td><td style="padding: 8px 0;">${lead.email || '—'}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Регион:</td><td style="padding: 8px 0;">${lead.region || '—'}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Возраст:</td><td style="padding: 8px 0;">${lead.age || '—'}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Специальность:</td><td style="padding: 8px 0;">${specialtyMap[lead.preferred_specialty] || '—'}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Источник:</td><td style="padding: 8px 0;">${lead.source || '—'}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Мотивация:</td><td style="padding: 8px 0;">${lead.motivation || '—'}</td></tr>
        <tr><td style="padding: 8px 0; color: #999;">Дата:</td><td style="padding: 8px 0;">${new Date().toLocaleString('ru-RU')}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #FFB800; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #0A0A0B; font-weight: bold; font-size: 16px;">Свяжитесь с кандидатом в течение 30 минут!</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    const raw = buildEmailRaw(
      ADMIN_EMAIL,
      `Новая заявка: ${lead.full_name} — ${lead.phone}`,
      htmlBody
    );

    const encoded = btoa(raw).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: encoded }),
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: err }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});