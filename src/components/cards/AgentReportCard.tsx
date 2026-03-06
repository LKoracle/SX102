interface Suggestion {
  icon: string;
  title: string;
  detail: string;
  color: string;
  bg: string;
}

interface AgentReportCardProps {
  data: Record<string, unknown>;
}

export function AgentReportCard({ data }: AgentReportCardProps) {
  const agentName = (data.agentName as string) || '李平安';
  const role = (data.role as string) || '资深代理人';
  const tenure = (data.tenure as string) || '5年';

  const monthlyData = (data.monthlyData as number[]) || [85, 67, 58, 52, 45, 38];
  const months = (data.months as string[]) || ['9月', '10月', '11月', '12月', '1月', '2月'];
  const maxVal = Math.max(...monthlyData);

  const suggestions = (data.suggestions as Suggestion[]) || [
    {
      icon: '📉',
      title: '活动量持续下滑',
      detail: '日均外呼从45通降至18通，建议设定每日最低外呼标准30通',
      color: '#DC2626',
      bg: '#FEF2F2',
    },
    {
      icon: '🔄',
      title: '客户转化率偏低',
      detail: '近3月平均转化率仅12%，团队均值25%，建议加强面谈技巧培训',
      color: '#D97706',
      bg: '#FFFBEB',
    },
    {
      icon: '📚',
      title: '培训参与不足',
      detail: '近2月仅参加1次培训，建议安排异议处理专项课程',
      color: '#2563EB',
      bg: '#EFF6FF',
    },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📋 代理人详细报告</h3>
      </div>

      <div className="p-3 space-y-3 max-h-[450px] overflow-y-auto">
        {/* Agent Info */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] rounded-[14px] p-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center text-white font-bold text-[14px]">
            {agentName.charAt(0)}
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#1E3A8A]">{agentName}</p>
            <p className="text-[10px] text-[#64748B]">{role} · 从业{tenure}</p>
          </div>
          <div className="ml-auto">
            <span className="px-2 py-0.5 bg-[#FEE2E2] text-[#DC2626] rounded text-[10px] font-medium">需关注</span>
          </div>
        </div>

        {/* 6-Month Trend Chart */}
        <div className="space-y-1.5">
          <p className="text-[12px] font-medium text-[#333]">📈 近6个月FYC达成率趋势</p>
          <div className="border border-gray-100 rounded-[12px] p-2.5">
            <div className="flex items-end gap-1.5 h-[80px]">
              {monthlyData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <span className="text-[9px] font-medium" style={{ color: val < 50 ? '#DC2626' : '#059669' }}>
                    {val}%
                  </span>
                  <div
                    className="w-full rounded-t-[4px] transition-all"
                    style={{
                      height: `${(val / maxVal) * 60}px`,
                      background: val < 50
                        ? 'linear-gradient(180deg, #FCA5A5, #DC2626)'
                        : val < 70
                          ? 'linear-gradient(180deg, #FCD34D, #D97706)'
                          : 'linear-gradient(180deg, #6EE7B7, #059669)',
                    }}
                  />
                  <span className="text-[9px] text-[#999]">{months[i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex items-center gap-1">
              <span className="text-[9px] text-[#DC2626]">⚠️</span>
              <span className="text-[9px] text-[#DC2626]">连续6个月下降趋势，需要立即干预</span>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-1.5">
          <p className="text-[12px] font-medium text-[#333]">💡 优化建议</p>
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="rounded-[10px] p-2.5 border"
              style={{ background: s.bg, borderColor: `${s.color}20` }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[12px]">{s.icon}</span>
                <span className="text-[11px] font-semibold" style={{ color: s.color }}>
                  {s.title}
                </span>
              </div>
              <p className="text-[10px] text-[#555] leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
