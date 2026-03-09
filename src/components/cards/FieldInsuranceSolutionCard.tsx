interface GapItem {
  type: string;
  amount: string;
  icon: string;
  color: string;
}

interface SolutionBenefit {
  icon: string;
  text: string;
}

interface InsuranceSolutionData {
  customerName?: string;
  age?: number;
  customerGroup?: string;
  riskWarnings?: string[];
  gaps?: GapItem[];
  productName?: string;
  subProduct?: string;
  annualPremium?: string;
  paymentYears?: string;
  benefits?: SolutionBenefit[];
  agentIncome?: string;
  highlight?: string;
}

interface FieldInsuranceSolutionCardProps {
  data: Record<string, unknown>;
}

export function FieldInsuranceSolutionCard({ data }: FieldInsuranceSolutionCardProps) {
  const d = (data as unknown as InsuranceSolutionData) || {};
  const gaps = d.gaps || [
    { type: '财富缺口', amount: '160万', icon: '💼', color: '#F59E0B' },
    { type: '养老缺口', amount: '180万', icon: '🏠', color: '#7C3AED' },
  ];
  const benefits = d.benefits || [
    { icon: '📈', text: '现金持续增值' },
    { icon: '💰', text: '享受分红收益' },
    { icon: '🏡', text: '居家养老服务' },
  ];

  return (
    <div className="rounded-[20px] overflow-hidden shadow-sm border border-gray-100">
      {/* Header */}
      <div
        className="px-4 py-3"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #D97706 100%)' }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-white/80 text-[9px] font-medium mb-0.5">司庆季专属方案</div>
            <div className="text-white font-bold text-[14px]">{d.productName || '平安盛盈·居家养老'}</div>
            <div className="text-white/70 text-[10px]">{d.subProduct || '金尊分红 · 司庆版'}</div>
          </div>
          <div className="text-right">
            <div className="text-[#FCD34D] font-black text-[11px]">👤 {d.customerName || '陈先生'}</div>
            <div className="text-white/60 text-[9px]">{d.age || 45}岁 · {d.customerGroup || '社会中坚客群'}</div>
          </div>
        </div>
      </div>

      {/* Risk warnings */}
      {d.riskWarnings && d.riskWarnings.length > 0 && (
        <div className="px-3 pt-2.5 flex flex-wrap gap-1">
          {d.riskWarnings.map((w, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-full text-[9px] font-medium"
              style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}
            >
              ⚠️ {w}
            </span>
          ))}
        </div>
      )}

      {/* Gap cards */}
      <div className="px-3 pt-2 pb-1 grid grid-cols-2 gap-2">
        {gaps.map((gap, i) => (
          <div
            key={i}
            className="rounded-[14px] px-3 py-2.5 text-center"
            style={{ background: gap.color + '10', border: `1px solid ${gap.color}30` }}
          >
            <div className="text-[18px] mb-1">{gap.icon}</div>
            <div className="text-[9px] text-[#666] mb-0.5">{gap.type}</div>
            <div className="font-black text-[18px]" style={{ color: gap.color }}>
              {gap.amount}
            </div>
          </div>
        ))}
      </div>

      {/* Solution */}
      <div className="px-3 pb-3">
        <div
          className="rounded-[16px] overflow-hidden border"
          style={{ borderColor: '#DDD6FE' }}
        >
          {/* Solution header */}
          <div
            className="px-3 py-2 flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)' }}
          >
            <span className="text-[14px]">⭐</span>
            <span className="text-[11px] font-bold text-[#6D28D9]">优先推荐方案</span>
            <span
              className="ml-auto px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}
            >
              主推
            </span>
          </div>

          {/* Premium info */}
          <div className="px-3 py-2.5 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-[9px] text-[#999]">年交保费</div>
                <div className="text-[20px] font-black text-[#7C3AED]">
                  {d.annualPremium || '20万'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[9px] text-[#999]">缴费年限</div>
                <div className="text-[16px] font-black text-[#1a1a1a]">{d.paymentYears || '6年'}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-[#999]">代理人收入</div>
                <div className="text-[16px] font-black text-[#059669]">
                  {d.agentIncome || '16,880元'}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-1.5">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center py-1.5 px-1 rounded-[10px] text-center"
                  style={{ background: '#F5F3FF' }}
                >
                  <span className="text-[14px] mb-0.5">{b.icon}</span>
                  <span className="text-[8px] text-[#6D28D9] font-medium leading-[1.3]">{b.text}</span>
                </div>
              ))}
            </div>

            {/* Highlight */}
            {d.highlight && (
              <div
                className="mt-2 px-2.5 py-1.5 rounded-[10px] text-[9px] text-[#5B21B6] leading-[1.5]"
                style={{ background: '#EDE9FE' }}
              >
                💡 {d.highlight}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
