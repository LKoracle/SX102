interface FieldProductPlansCardProps {
  data: Record<string, unknown>;
}

interface PlanItem {
  product: string;
  detail: string;
}

interface Plan {
  name: string;
  badge: string | null;
  highlight: string;
  items: PlanItem[];
}

interface PlansData {
  customerName?: string;
  plans: Plan[];
  aiNote?: string;
}

export function FieldProductPlansCard({ data }: FieldProductPlansCardProps) {
  const d = (data as unknown as PlansData) || { plans: [], aiNote: '' };

  const planColors = [
    { accent: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
    { accent: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📦 产品精准匹配</h3>
      </div>
      <div className="p-3 space-y-2.5 max-h-[450px] overflow-y-auto">
        {d.plans.map((plan, i) => {
          const pc = planColors[i % planColors.length];
          return (
            <div key={i} className="rounded-[14px] border overflow-hidden" style={{ borderColor: pc.border }}>
              <div className="flex items-center gap-2 px-2.5 py-2" style={{ background: pc.bg }}>
                <span className="text-[11px] font-bold" style={{ color: pc.accent }}>
                  {i === 0 ? '⭐' : '💎'} {plan.name}
                </span>
                {plan.badge && (
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[8px] font-medium text-white"
                    style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}
                  >
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className="px-2.5 py-1.5">
                {plan.items.map((item, j) => (
                  <div key={j} className="flex items-start py-1 border-b border-gray-50 last:border-b-0">
                    <span className="text-[9px] text-[#999] min-w-[56px] flex-shrink-0">{item.product}</span>
                    <span className="text-[10px] text-[#333] flex-1">{item.detail}</span>
                  </div>
                ))}
              </div>
              <div className="px-2.5 pb-2">
                <div className="text-[9px] text-[#666] italic">💡 {plan.highlight}</div>
              </div>
            </div>
          );
        })}

        {d.aiNote && (
          <div className="bg-gradient-to-r from-[#F5F3FF] to-[#EDE9FE] rounded-[14px] p-2.5">
            <div className="text-[10px] font-semibold text-[#7C3AED] mb-1">🤖 AI备注</div>
            <p className="text-[9px] text-[#6D28D9] leading-[1.6]">{d.aiNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
