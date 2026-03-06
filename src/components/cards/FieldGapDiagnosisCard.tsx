interface FieldGapDiagnosisCardProps {
  data: Record<string, unknown>;
}

interface CoverageItem {
  name: string;
  status: 'covered' | 'warning' | 'danger';
  current: string;
  required?: string;
  gap?: string;
  note?: string;
}

interface GapData {
  customerName?: string;
  coverageItems: CoverageItem[];
  riskWarnings?: string[];
}

export function FieldGapDiagnosisCard({ data }: FieldGapDiagnosisCardProps) {
  const d = (data as unknown as GapData) || { coverageItems: [], riskWarnings: [] };

  const statusConfig = {
    covered: { label: '已覆盖', color: '#059669', bg: '#DCFCE7', icon: '✅' },
    warning: { label: '严重不足', color: '#D97706', bg: '#FEF3C7', icon: '⚠️' },
    danger: { label: '未覆盖', color: '#DC2626', bg: '#FEE2E2', icon: '❌' },
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#4338CA] to-[#3B82F6] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🛡️ {d.customerName ? `${d.customerName}保障缺口诊断` : '保障缺口诊断'}</h3>
      </div>
      <div className="p-3 space-y-2 max-h-[450px] overflow-y-auto">
        {d.coverageItems.map((item, i) => {
          const sc = statusConfig[item.status] || statusConfig.danger;
          return (
            <div key={i} className="rounded-[10px] px-2.5 py-2 bg-gray-50">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px]">{sc.icon}</span>
                <span className="text-[10px] font-semibold text-[#333] flex-1">{item.name}</span>
                <span
                  className="px-1.5 py-0.5 rounded-full text-[8px] font-medium"
                  style={{ color: sc.color, background: sc.bg }}
                >
                  {sc.label}
                </span>
              </div>
              <div className="text-[9px] text-[#666] leading-[1.5]">
                <span>现状：{item.current}</span>
                {item.required && <span className="ml-2">需要：{item.required}</span>}
                {item.gap && <span className="ml-2 font-semibold" style={{ color: sc.color }}>缺口：{item.gap}</span>}
              </div>
              {item.note && (
                <div className="text-[9px] text-[#999] mt-1 leading-[1.4]">{item.note}</div>
              )}
            </div>
          );
        })}

        {d.riskWarnings && d.riskWarnings.length > 0 && (
          <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FEE2E2] rounded-[14px] p-2.5">
            <div className="text-[10px] font-semibold text-[#DC2626] mb-1.5">⚠️ 风险提示</div>
            {d.riskWarnings.map((w, i) => (
              <div key={i} className="flex items-start gap-1.5 mb-1">
                <span className="text-[10px]">•</span>
                <span className="text-[9px] text-[#DC2626] leading-[1.5]">{w}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
