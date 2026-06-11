import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const plan = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `Ты — SEO-специалист для сайта привлечения на военную службу по контракту в РФ (2026).
Сегодня: ${today}.

Сайт продвигается по кластерам: документы, медкомиссия, льготы, семья, выплаты, страхование, специальности, регионы.

Сформируй КОНКРЕТНЫЙ план SEO-продвижения на СЕГОДНЯ (3-5 задач). Для каждой задачи укажи:
- title (краткое название)
- description (что конкретно сделать, 1-2 предложения)
- category (technical/content/links/analytics/social)
- priority (high/medium/low)
- impact (ожидаемый эффект)

Сделай задачи практичными и реализуемыми за один день. Чередуй технические и контентные задачи.
Ответь строго в JSON формате: {"tasks": [...]}`,
      response_json_schema: {
        type: 'object',
        properties: {
          tasks: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                category: { type: 'string' },
                priority: { type: 'string' },
                impact: { type: 'string' },
              },
            },
          },
        },
      },
    });

    const today_date = new Date().toISOString().split('T')[0];

    // Save tasks to DB
    const existing = await base44.asServiceRole.entities.SeoTask.filter({ date: today_date });
    if (existing.length === 0) {
      for (const task of plan.tasks) {
        await base44.asServiceRole.entities.SeoTask.create({
          ...task,
          date: today_date,
          status: 'pending',
        });
      }
    }

    return Response.json({ tasks: plan.tasks, date: today_date });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});