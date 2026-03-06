interface RootCause {
  id: number;
  title: string;
  icon: string;
  evidence: string;
  color: string;
  bg: string;
}

interface RootCauseCardProps {
  data: Record<string, unknown>;
}

export function RootCauseCard({ data }: RootCauseCardProps) {
  const causes = (data.causes as RootCause[]) || [
    {
      id: 1,
      title: '技能不足',
      icon: '📉',
      evidence: '"近3个月培训参与仅1次，异议处理通过率低于60%，面谈转化率从25%降至12%"',
      color: '#DC2626',
      bg: '#FEF2F2',
    },
    {
      id: 2,
      title: '信心下降',
      icon: '😔',
      evidence: '"连续3个月未达标，客户拒绝率升高后主动外呼量从45通/日降至18通/日"',
      color: '#D97706',
      bg: '#FFFBEB',
    },
    {
      id: 3,
      title: '行为退缩',
      icon: '🔻',
      evidence: '"出勤天数减少至18天/月，早会缺勤3次，拜访计划完成率仅40%"',
      color: '#7C3AED',
      bg: '#F5F3FF',
    },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🔗 根因链分析</h3>
      </div>

      <div className="p-3 space-y-1 max-h-[450px] overflow-y-auto">
        {/* Overview */}
        <div className="bg-gradient-to-r from-[#F5F3FF] to-[#EDE9FE] rounded-[12px] p-2.5 mb-2">
          <p className="text-[11px] text-[#6D28D9] font-medium">根因推导路径：技能不足 → 信心下降 → 行为退缩</p>
          <p className="text-[10px] text-[#7C3AED] mt-0.5">三者形成恶性循环，需要从根源（技能）切入打破</p>
        </div>

        {/* Cause Chain */}
        {causes.map((cause, i) => (
          <div key={cause.id}>
            {/* Cause Card */}
            <div
              className="rounded-[12px] border p-3"
              style={{ background: cause.bg, borderColor: `${cause.color}20` }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: cause.color }}
                >
                  {cause.id}
                </div>
                <span className="text-[12px]">{cause.icon}</span>
                <span className="text-[12px] font-bold" style={{ color: cause.color }}>
                  {cause.title}
                </span>
              </div>
              <div className="ml-8 bg-white/60 rounded-[8px] p-2 border border-gray-100">
                <p className="text-[10px] text-[#555] leading-relaxed italic">{cause.evidence}</p>
              </div>
            </div>

            {/* Arrow Connector */}
            {i < causes.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-2 bg-[#7C3AED]/30" />
                  <span className="text-[#7C3AED] text-[10px]">▼</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Recommendation */}
        <div className="bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] rounded-[12px] p-2.5 mt-2">
          <p className="text-[11px] font-bold text-[#1D4ED8] mb-1">🎯 干预建议</p>
          <ul className="text-[10px] text-[#2563EB] space-y-0.5">
            <li>• 优先安排异议处理专项培训，提升面谈信心</li>
            <li>• 设定每日最低活动量标准，主管日常跟踪</li>
            <li>• 安排1对1面谈，了解心理状态并给予支持</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
