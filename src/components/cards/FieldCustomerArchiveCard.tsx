interface ArchiveData {
  customerName?: string;
  age?: string;
  job?: string;
  family?: string;
  source?: string;
  activityFeedback?: string;
  interests?: string[];
  keyInsights?: string[];
  nextActions?: string[];
  archiveTime?: string;
}

interface FieldCustomerArchiveCardProps {
  data: Record<string, unknown>;
}

export function FieldCustomerArchiveCard({ data }: FieldCustomerArchiveCardProps) {
  const d = (data as unknown as ArchiveData) || {};
  const interests = d.interests || ['资产配置', '养老规划', '高端理财'];
  const keyInsights = d.keyInsights || ['有明确的财富增值需求', '对居家养老服务感兴趣', '决策型人格，倾向主动咨询'];
  const nextActions = d.nextActions || ['尽快约定需求分析面谈', '准备定制化方案', '发送资产配置参考资料'];

  return (
    <div className="rounded-[20px] overflow-hidden shadow-sm border border-gray-100" style={{ background: '#fff' }}>
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-[20px] bg-white/20">
          👤
        </div>
        <div className="flex-1">
          <div className="text-white font-bold text-[15px]">{d.customerName || '陈先生'}</div>
          <div className="text-white/70 text-[10px]">{d.job || '企业中高层'} · {d.age || '45岁'}</div>
        </div>
        <div className="text-right">
          <div className="px-2 py-0.5 rounded-full text-[9px] font-bold text-[#059669] bg-white">
            ✅ 档案已生成
          </div>
          {d.archiveTime && <div className="text-white/60 text-[9px] mt-1">{d.archiveTime}</div>}
        </div>
      </div>

      {/* Basic info */}
      <div className="px-3 py-2.5">
        <div className="grid grid-cols-2 gap-1.5 mb-2.5">
          {[
            { icon: '👨‍👩‍👧', label: '家庭', value: d.family || '家有老小（父母+子女）' },
            { icon: '📍', label: '来源', value: d.source || '财富管理讲座活动' },
          ].map((item, i) => (
            <div key={i} className="rounded-[10px] px-2.5 py-2" style={{ background: '#F8FAFF' }}>
              <div className="text-[9px] text-[#999] mb-0.5">{item.icon} {item.label}</div>
              <div className="text-[11px] text-[#1a1a1a] font-medium">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Activity feedback */}
        {d.activityFeedback && (
          <div
            className="rounded-[10px] px-3 py-2 mb-2.5 text-[10px] text-[#555] leading-[1.5] italic"
            style={{ background: '#FFFBEB', borderLeft: '2px solid #F59E0B' }}
          >
            <span className="text-[9px] text-[#999] not-italic block mb-1">📝 活动中的反馈</span>
            "{d.activityFeedback}"
          </div>
        )}

        {/* Interest tags */}
        <div className="mb-2.5">
          <div className="text-[9px] text-[#999] font-medium mb-1.5">⭐ 关注方向</div>
          <div className="flex flex-wrap gap-1">
            {interests.map((tag, i) => {
              const colors = ['#1D4ED8', '#7C3AED', '#059669', '#D97706', '#DC2626'];
              const c = colors[i % colors.length];
              return (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[9px] font-medium"
                  style={{ background: c + '15', color: c, border: `1px solid ${c}30` }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Key insights */}
        <div className="mb-2.5">
          <div className="text-[9px] text-[#999] font-medium mb-1.5">🔍 AI洞察</div>
          <div className="space-y-1">
            {keyInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[10px] text-[#333]">
                <span className="text-[#10B981] mt-0.5 flex-shrink-0">•</span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next actions */}
        <div
          className="rounded-[12px] px-3 py-2.5"
          style={{ background: 'linear-gradient(135deg, #ECFDF5, #F0FDF4)' }}
        >
          <div className="text-[10px] font-semibold text-[#059669] mb-1.5">🎯 建议下一步行动</div>
          {nextActions.map((action, i) => (
            <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                style={{ background: '#059669' }}
              >
                {i + 1}
              </div>
              <span className="text-[10px] text-[#065F46]">{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
