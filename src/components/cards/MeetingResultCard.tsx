interface Problem {
  title: string;
  quote: string;
  actions: string[];
}

interface MeetingResultCardProps {
  data: Record<string, unknown>;
}

export function MeetingResultCard({ data }: MeetingResultCardProps) {
  const duration = (data.duration as string) || '35分钟';
  const agentName = (data.agentName as string) || '李平安';

  const problems = (data.problems as Problem[]) || [
    {
      title: '异议处理能力不足',
      quote: '"最近有些客户比较难沟通，被拒绝多了就有点不想打了"',
      actions: [
        '安排异议处理专项培训',
        '配对老员工进行话术演练',
        '每周提交3个异议处理案例复盘',
      ],
    },
    {
      title: '行动力和信心下降',
      quote: '"确实是的...最近业绩不太好"',
      actions: [
        '设定每日最低30通外呼标准',
        '建立每日简报机制追踪执行',
        '每周1对1鼓励面谈',
      ],
    },
  ];

  const keyInsights = (data.insights as string[]) || [
    '李平安对业绩下滑有自我认知，态度端正',
    '核心问题是异议处理技能薄弱导致信心下降',
    '对调整改善持开放态度，愿意配合培训计划',
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#059669] to-[#10B981] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📋 面谈结果摘要</h3>
      </div>

      <div className="p-3 space-y-2.5 max-h-[450px] overflow-y-auto">
        {/* Meta Info */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#DCFCE7] to-[#F0FDF4] rounded-[12px] p-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#065F46]">👤 {agentName}</span>
            <span className="text-[11px] text-[#059669]">·</span>
            <span className="text-[11px] text-[#065F46]">⏱ {duration}</span>
          </div>
          <span className="ml-auto px-2 py-0.5 bg-[#059669] text-white rounded text-[9px] font-medium">
            已完成
          </span>
        </div>

        {/* Key Insights */}
        <div className="space-y-1">
          <p className="text-[11px] font-medium text-[#333]">🔑 关键发现</p>
          <div className="bg-[#F8FAFC] rounded-[10px] p-2.5 space-y-1">
            {keyInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="w-1 h-1 bg-[#059669] rounded-full mt-1.5 flex-shrink-0" />
                <span className="text-[10px] text-[#555]">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Problems Identified */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-[#333]">⚠️ 识别问题 ({problems.length}项)</p>
          {problems.map((problem, i) => (
            <div key={i} className="border border-gray-100 rounded-[12px] overflow-hidden">
              <div className="px-2.5 py-2 bg-[#FEF2F2]">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#DC2626] text-white text-[9px] flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <span className="text-[11px] font-bold text-[#DC2626]">{problem.title}</span>
                </div>
                <p className="text-[10px] text-[#999] italic mt-1 ml-5.5">{problem.quote}</p>
              </div>
              <div className="px-2.5 py-2 bg-white">
                <p className="text-[10px] text-[#64748B] mb-1">改善行动：</p>
                {problem.actions.map((action, j) => (
                  <div key={j} className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] text-[#059669]">✓</span>
                    <span className="text-[10px] text-[#555]">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
