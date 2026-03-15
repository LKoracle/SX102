interface FieldAIAnalysisCardProps {
  data: Record<string, unknown>;
}

interface AnalysisItem {
  label: string;
  value: string;
  color?: string;
}

interface ProfileTag {
  icon: string;
  label: string;
}

interface AnalysisData {
  incomingMessage: string;
  sender: string;
  time?: string;
  profile?: ProfileTag[];
  analysis: AnalysisItem[];
}

export function FieldAIAnalysisCard({ data }: FieldAIAnalysisCardProps) {
  const d = (data as unknown as AnalysisData) || {
    incomingMessage: '',
    sender: '王哥',
    analysis: [],
  };

  const labelColors: Record<string, { color: string; bg: string; icon: string }> = {
    '问题类型': { color: '#3B82F6', bg: '#EFF6FF', icon: '📋' },
    '客户情绪': { color: '#D97706', bg: '#FEF3C7', icon: '😐' },
    '意向阶段': { color: '#7C3AED', bg: '#F5F3FF', icon: '📊' },
    '应对建议': { color: '#059669', bg: '#DCFCE7', icon: '💡' },
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#F97316] to-[#EF4444] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🔍 AI智能分析</h3>
      </div>
      <div className="p-3 space-y-2.5 max-h-[450px] overflow-y-auto">
        {/* Incoming message */}
        <div className="bg-gray-50 rounded-[14px] p-2.5 border-l-[3px] border-gray-300">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[9px] text-[#999]">📩 {d.sender} 的消息</span>
            {d.time && <span className="text-[8px] text-[#bbb]">· {d.time}</span>}
          </div>
          <p className="text-[11px] text-[#333] leading-[1.6]">{d.incomingMessage}</p>
        </div>

        {/* Customer profile tags */}
        {d.profile && d.profile.length > 0 && (
          <div className="rounded-[12px] px-2.5 py-2" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
            <div className="flex items-center gap-1 mb-1.5">
              <span className="text-[9px] font-semibold" style={{ color: '#C2410C' }}>👤 客户画像</span>
              <span className="text-[8px]" style={{ color: '#9A3412' }}>· AI综合画像与对话记录生成分析</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {d.profile.map((tag, i) => (
                <span
                  key={i}
                  className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{ background: '#FFEDD5', color: '#9A3412' }}
                >
                  {tag.icon} {tag.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Analysis items */}
        <div className="space-y-1.5">
          {d.analysis.map((item, i) => {
            const lc = labelColors[item.label] || { color: '#6B7280', bg: '#F3F4F6', icon: '📌' };
            return (
              <div key={i} className="flex items-center gap-2 rounded-[10px] px-2.5 py-2" style={{ background: lc.bg }}>
                <span className="text-[12px]">{lc.icon}</span>
                <span className="text-[10px] font-semibold min-w-[52px]" style={{ color: lc.color }}>{item.label}</span>
                <span className="text-[10px] text-[#333] flex-1" style={item.color ? { color: item.color, fontWeight: 600 } : undefined}>{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
