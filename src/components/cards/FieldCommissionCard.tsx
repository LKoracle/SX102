interface FieldCommissionCardProps {
  data: Record<string, unknown>;
}

interface CommissionRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface CommissionPlan {
  name: string;
  rows: CommissionRow[];
}

interface CommissionData {
  plans: CommissionPlan[];
  comparisonNote?: string;
}

export function FieldCommissionCard({ data }: FieldCommissionCardProps) {
  const d = (data as unknown as CommissionData) || { plans: [], comparisonNote: '' };

  const planAccents = ['#D97706', '#7C3AED'];
  const planBgs = ['#FFFBEB', '#F5F3FF'];
  const planBorders = ['#FDE68A', '#DDD6FE'];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">💰 收益分析测算</h3>
      </div>
      <div className="p-3 space-y-2.5 max-h-[450px] overflow-y-auto">
        {d.plans.map((plan, i) => {
          const accent = planAccents[i % planAccents.length];
          const bg = planBgs[i % planBgs.length];
          const border = planBorders[i % planBorders.length];
          return (
            <div key={i} className="rounded-[14px] border overflow-hidden" style={{ borderColor: border }}>
              <div className="px-2.5 py-2" style={{ background: bg }}>
                <span className="text-[11px] font-bold" style={{ color: accent }}>
                  {i === 0 ? '📊' : '💎'} {plan.name}
                </span>
              </div>
              <div className="px-2.5 py-1.5">
                {plan.rows.map((row, j) => (
                  <div key={j} className="flex items-center py-1 border-b border-gray-50 last:border-b-0">
                    <span className="text-[9px] text-[#999] min-w-[80px]">{row.label}</span>
                    <span
                      className="text-[10px] flex-1"
                      style={{
                        color: row.highlight ? accent : '#333',
                        fontWeight: row.highlight ? 700 : 400,
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {d.comparisonNote && (
          <div className="bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] rounded-[14px] p-2.5">
            <div className="text-[10px] font-semibold text-[#D97706] mb-1">📊 对比说明</div>
            <p className="text-[9px] text-[#92400E] leading-[1.6]">{d.comparisonNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
